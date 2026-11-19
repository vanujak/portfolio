const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || "vanujak";
const REVALIDATE_SECONDS = 3600; // 1 hour
const REQUEST_TIMEOUT_MS = 8000;

export const LEETCODE_FALLBACK_DATA = {
  isLive: false,
  source: "fallback",
  fetchedAt: null,
  username: LEETCODE_USERNAME,
  profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  totalQuestions: 4115,
  totalEasy: 976,
  totalMedium: 2148,
  totalHard: 991,
  ranking: null,
  acceptanceRate: 0,
  currentStreak: 0,
  longestStreak: 0,
  activeDays: 0,
  latestProblem: null,
};

/**
 * Computes real current streak, longest streak, and total active days
 * from LeetCode's submissionCalendar ({ [unixTimestampSeconds]: count }).
 */
function computeCalendarStats(submissionCalendar) {
  if (!submissionCalendar || typeof submissionCalendar !== "object") {
    return { currentStreak: 0, longestStreak: 0, activeDays: 0 };
  }

  let calendarObj = submissionCalendar;
  if (typeof submissionCalendar === "string") {
    try {
      calendarObj = JSON.parse(submissionCalendar);
    } catch {
      return { currentStreak: 0, longestStreak: 0, activeDays: 0 };
    }
  }

  const todayUtc = new Date().toISOString().slice(0, 10);
  const activeDateSet = new Set();

  for (const [ts, rawCount] of Object.entries(calendarObj)) {
    const count = Number(rawCount) || 0;
    const sec = Number(ts);
    if (count > 0 && Number.isFinite(sec)) {
      const dateStr = new Date(sec * 1000).toISOString().slice(0, 10);
      if (dateStr <= todayUtc) {
        activeDateSet.add(dateStr);
      }
    }
  }

  const sortedDates = Array.from(activeDateSet).sort();
  if (sortedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, activeDays: 0 };
  }

  const dayMs = 86400000;
  const toDayIndex = (dateStr) =>
    Math.floor(Date.parse(`${dateStr}T00:00:00Z`) / dayMs);

  let longestStreak = 1;
  let running = 1;

  for (let i = 1; i < sortedDates.length; i += 1) {
    if (toDayIndex(sortedDates[i]) - toDayIndex(sortedDates[i - 1]) === 1) {
      running += 1;
      if (running > longestStreak) longestStreak = running;
    } else {
      running = 1;
    }
  }

  // Current streak: must include today or yesterday to still be active
  const todayIdx = toDayIndex(todayUtc);
  const lastIdx = toDayIndex(sortedDates[sortedDates.length - 1]);
  let currentStreak = 0;

  if (todayIdx - lastIdx <= 1) {
    currentStreak = 1;
    for (let i = sortedDates.length - 1; i > 0; i -= 1) {
      if (toDayIndex(sortedDates[i]) - toDayIndex(sortedDates[i - 1]) === 1) {
        currentStreak += 1;
      } else {
        break;
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
    activeDays: sortedDates.length,
  };
}

/**
 * Primary path: FaisalShohag LeetCode API (reliable server-side JSON proxy
 * returning solved counts, real submission stats, ranking, calendar & recent submissions).
 */
async function fetchViaFaisalShohag(username) {
  const res = await fetch(
    `https://leetcode-api-faisalshohag.vercel.app/${encodeURIComponent(username)}`,
    {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  );

  if (!res.ok) {
    throw new Error(`FaisalShohag API HTTP ${res.status}`);
  }

  const data = await res.json();
  if (!data || typeof data.totalQuestions !== "number" || data.errors) {
    throw new Error("Invalid LeetCode payload from FaisalShohag API");
  }

  // Real acceptance rate from official accepted/total submission counts
  const acAll = data.matchedUserStats?.acSubmissionNum?.find(
    (s) => s.difficulty === "All",
  );
  const totalAll = data.matchedUserStats?.totalSubmissionNum?.find(
    (s) => s.difficulty === "All",
  );

  const acSubs = Number(acAll?.submissions) || 0;
  const totalSubs = Number(totalAll?.submissions) || 0;
  const acceptanceRate =
    totalSubs > 0 ? Number(((acSubs / totalSubs) * 100).toFixed(1)) : 0;

  const calendarStats = computeCalendarStats(data.submissionCalendar);

  const recentList = Array.isArray(data.recentSubmissions)
    ? data.recentSubmissions
    : [];
  const acceptedRecent =
    recentList.find((item) => item?.statusDisplay === "Accepted") ||
    recentList[0] ||
    null;

  const latestProblem = acceptedRecent?.title
    ? {
        title: acceptedRecent.title,
        titleSlug: acceptedRecent.titleSlug || "",
        url: acceptedRecent.titleSlug
          ? `https://leetcode.com/problems/${acceptedRecent.titleSlug}/`
          : `https://leetcode.com/u/${username}/`,
        timestamp: acceptedRecent.timestamp || null,
      }
    : null;

  return {
    isLive: true,
    source: "faisalshohag",
    fetchedAt: new Date().toISOString(),
    username,
    profileUrl: `https://leetcode.com/u/${username}/`,
    totalSolved: Number(data.totalSolved) || 0,
    easySolved: Number(data.easySolved) || 0,
    mediumSolved: Number(data.mediumSolved) || 0,
    hardSolved: Number(data.hardSolved) || 0,
    totalQuestions: Number(data.totalQuestions) || LEETCODE_FALLBACK_DATA.totalQuestions,
    totalEasy: Number(data.totalEasy) || LEETCODE_FALLBACK_DATA.totalEasy,
    totalMedium: Number(data.totalMedium) || LEETCODE_FALLBACK_DATA.totalMedium,
    totalHard: Number(data.totalHard) || LEETCODE_FALLBACK_DATA.totalHard,
    ranking: typeof data.ranking === "number" && data.ranking > 0 ? data.ranking : null,
    acceptanceRate,
    currentStreak: calendarStats.currentStreak,
    longestStreak: calendarStats.longestStreak,
    activeDays: calendarStats.activeDays,
    latestProblem,
  };
}

/**
 * Secondary fallback: leetcode-stats-api.herokuapp.com
 */
async function fetchViaHerokuFallback(username) {
  const res = await fetch(
    `https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(username)}`,
    {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  );

  if (!res.ok) {
    throw new Error(`Heroku LeetCode API HTTP ${res.status}`);
  }

  const data = await res.json();
  if (!data || data.status !== "success") {
    throw new Error(data?.message || "Invalid payload from Heroku LeetCode API");
  }

  const calendarStats = computeCalendarStats(data.submissionCalendar);

  return {
    isLive: true,
    source: "heroku",
    fetchedAt: new Date().toISOString(),
    username,
    profileUrl: `https://leetcode.com/u/${username}/`,
    totalSolved: Number(data.totalSolved) || 0,
    easySolved: Number(data.easySolved) || 0,
    mediumSolved: Number(data.mediumSolved) || 0,
    hardSolved: Number(data.hardSolved) || 0,
    totalQuestions: Number(data.totalQuestions) || LEETCODE_FALLBACK_DATA.totalQuestions,
    totalEasy: Number(data.totalEasy) || LEETCODE_FALLBACK_DATA.totalEasy,
    totalMedium: Number(data.totalMedium) || LEETCODE_FALLBACK_DATA.totalMedium,
    totalHard: Number(data.totalHard) || LEETCODE_FALLBACK_DATA.totalHard,
    ranking: typeof data.ranking === "number" && data.ranking > 0 ? data.ranking : null,
    acceptanceRate:
      typeof data.acceptanceRate === "number"
        ? Number(data.acceptanceRate.toFixed(1))
        : 0,
    currentStreak: calendarStats.currentStreak,
    longestStreak: calendarStats.longestStreak,
    activeDays: calendarStats.activeDays,
    latestProblem: null,
  };
}

/**
 * Fetches LeetCode metrics server-side inside Next.js (no separate backend needed).
 * Uses 1-hour ISR caching with automatic secondary API fallback.
 */
export async function getLeetcodeStats(username = LEETCODE_USERNAME) {
  try {
    return await fetchViaFaisalShohag(username);
  } catch (primaryErr) {
    console.warn(
      "Primary LeetCode API failed, trying fallback:",
      primaryErr.message,
    );
  }

  try {
    return await fetchViaHerokuFallback(username);
  } catch (fallbackErr) {
    console.warn("Fallback LeetCode API failed:", fallbackErr.message);
    return LEETCODE_FALLBACK_DATA;
  }
}
