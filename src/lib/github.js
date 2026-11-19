const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "vanujak";
const REVALIDATE_SECONDS = 3600; // 1 hour
const REQUEST_TIMEOUT_MS = 8000;

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  HCL: "#844fba",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
};

const GRAPHQL_LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export const GITHUB_FALLBACK_DATA = {
  isLive: false,
  source: "fallback",
  fetchedAt: null,
  username: GITHUB_USERNAME,
  name: "Vanuja Karunaratne",
  bio: "Computer Engineering Student | DevOps & Cloud Enthusiast",
  location: "Ratnapura, Sri Lanka",
  avatarUrl: `https://github.com/${GITHUB_USERNAME}.png`,
  profileUrl: `https://github.com/${GITHUB_USERNAME}`,
  publicRepos: 21,
  followers: 0,
  stars: 0,
  totalContributions: 0,
  currentStreak: 0,
  longestStreak: 0,
  languages: ["Java", "JavaScript", "Python"],
  languageBreakdown: [
    { name: "Java", percentage: 40, color: LANGUAGE_COLORS.Java },
    { name: "JavaScript", percentage: 35, color: LANGUAGE_COLORS.JavaScript },
    { name: "Python", percentage: 25, color: LANGUAGE_COLORS.Python },
  ],
  recentRepos: [],
  contributions: [],
};

/**
 * Computes total contributions, current streak, and longest streak from daily contribution records.
 * Filters out future dates so currentStreak does not falsely reset to 0.
 * If today has 0 contributions so far, checks from yesterday so an active streak remains intact.
 */
function computeContributionStats(rawDays, officialTotal = null) {
  const todayUtc = new Date().toISOString().slice(0, 10);

  const validDays = rawDays
    .filter((d) => d && typeof d.date === "string" && d.date <= todayUtc)
    .map((d) => ({
      date: d.date,
      count: Number(d.count) || 0,
      level: typeof d.level === "number" ? d.level : 0,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  let computedTotal = 0;
  let longestStreak = 0;
  let runningStreak = 0;

  for (const day of validDays) {
    computedTotal += day.count;
    if (day.count > 0) {
      runningStreak += 1;
      if (runningStreak > longestStreak) {
        longestStreak = runningStreak;
      }
    } else {
      runningStreak = 0;
    }
  }

  let currentStreak = 0;
  let idx = validDays.length - 1;

  // If today has 0 contributions so far, don't break the streak prematurely — start from yesterday
  if (idx >= 0 && validDays[idx].date === todayUtc && validDays[idx].count === 0) {
    idx -= 1;
  }

  for (; idx >= 0; idx -= 1) {
    if (validDays[idx].count > 0) {
      currentStreak += 1;
    } else {
      break;
    }
  }

  return {
    totalContributions:
      typeof officialTotal === "number" ? officialTotal : computedTotal,
    currentStreak,
    longestStreak,
    contributions: validDays,
  };
}

/**
 * Primary path: Official GitHub GraphQL API (requires GITHUB_TOKEN env var).
 * Fetches profile, byte-weighted languages, repos, and official contribution calendar in 1 call.
 */
async function fetchViaGraphQL(username, token) {
  const query = `
    query ($username: String!) {
      user(login: $username) {
        name
        login
        bio
        location
        avatarUrl
        url
        followers {
          totalCount
        }
        repositories(
          first: 100
          ownerAffiliations: OWNER
          isFork: false
          privacy: PUBLIC
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          totalCount
          nodes {
            name
            description
            url
            stargazerCount
            forkCount
            updatedAt
            primaryLanguage {
              name
              color
            }
            languages(first: 6, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "vanujak-portfolio",
    },
    body: JSON.stringify({ query, variables: { username } }),
    cache: "force-cache",
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL HTTP ${res.status}`);
  }

  const json = await res.json();
  if (json.errors?.length || !json.data?.user) {
    throw new Error(json.errors?.[0]?.message || "GitHub GraphQL returned no user");
  }

  const user = json.data.user;
  const repos = user.repositories?.nodes || [];

  const stars = repos.reduce((sum, repo) => sum + (repo.stargazerCount || 0), 0);

  // Byte-weighted language breakdown across non-fork owned repos
  const langBytes = {};
  let totalBytes = 0;

  for (const repo of repos) {
    for (const edge of repo.languages?.edges || []) {
      const name = edge?.node?.name;
      const size = edge?.size || 0;
      if (!name || size <= 0) continue;
      if (!langBytes[name]) {
        langBytes[name] = {
          name,
          bytes: 0,
          color: edge.node.color || LANGUAGE_COLORS[name] || "#6366f1",
        };
      }
      langBytes[name].bytes += size;
      totalBytes += size;
    }
  }

  const languageBreakdown = Object.values(langBytes)
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 5)
    .map((lang) => ({
      name: lang.name,
      percentage:
        totalBytes > 0 ? Number(((lang.bytes / totalBytes) * 100).toFixed(1)) : 0,
      color: lang.color,
    }));

  const calendar = user.contributionsCollection?.contributionCalendar;
  const rawDays = (calendar?.weeks || []).flatMap((week) =>
    (week.contributionDays || []).map((day) => ({
      date: day.date,
      count: day.contributionCount || 0,
      level: GRAPHQL_LEVEL_MAP[day.contributionLevel] ?? 0,
    })),
  );

  const activity = computeContributionStats(
    rawDays,
    typeof calendar?.totalContributions === "number"
      ? calendar.totalContributions
      : null,
  );

  const recentRepos = repos.slice(0, 4).map((repo) => ({
    name: repo.name,
    description: repo.description || "",
    url: repo.url,
    stars: repo.stargazerCount || 0,
    language: repo.primaryLanguage?.name || null,
    languageColor:
      repo.primaryLanguage?.color ||
      LANGUAGE_COLORS[repo.primaryLanguage?.name] ||
      "#6366f1",
    updatedAt: repo.updatedAt,
  }));

  return {
    isLive: true,
    source: "graphql",
    fetchedAt: new Date().toISOString(),
    username: user.login || username,
    name: user.name || GITHUB_FALLBACK_DATA.name,
    bio: user.bio || GITHUB_FALLBACK_DATA.bio,
    location: user.location || GITHUB_FALLBACK_DATA.location,
    avatarUrl: user.avatarUrl || GITHUB_FALLBACK_DATA.avatarUrl,
    profileUrl: user.url || `https://github.com/${username}`,
    publicRepos: user.repositories?.totalCount ?? repos.length,
    followers: user.followers?.totalCount ?? 0,
    stars,
    totalContributions: activity.totalContributions,
    currentStreak: activity.currentStreak,
    longestStreak: activity.longestStreak,
    languages:
      languageBreakdown.length > 0
        ? languageBreakdown.slice(0, 3).map((l) => l.name)
        : GITHUB_FALLBACK_DATA.languages,
    languageBreakdown:
      languageBreakdown.length > 0
        ? languageBreakdown
        : GITHUB_FALLBACK_DATA.languageBreakdown,
    recentRepos,
    contributions: activity.contributions,
  };
}

/**
 * Fallback path (no token required): Server-side GitHub REST API + rolling last-year contributions API.
 * Runs exclusively on the Next.js server with 1-hour ISR caching so visitors never hit GitHub rate limits.
 */
async function fetchViaRestFallback(username) {
  const restHeaders = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "vanujak-portfolio",
  };

  const fetchOpts = {
    headers: restHeaders,
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  };

  const [profileRes, reposRes, contribRes] = await Promise.allSettled([
    fetch(`https://api.github.com/users/${username}`, fetchOpts),
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
      fetchOpts,
    ),
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    ),
  ]);

  let profile = null;
  if (profileRes.status === "fulfilled" && profileRes.value.ok) {
    profile = await profileRes.value.json();
  }

  let repos = [];
  if (reposRes.status === "fulfilled" && reposRes.value.ok) {
    const rawRepos = await reposRes.value.json();
    if (Array.isArray(rawRepos)) {
      // Exclude forks so languages & stars reflect original work
      repos = rawRepos.filter((r) => !r.fork);
    }
  }

  let activity = {
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    contributions: [],
  };
  let hasActivity = false;

  if (contribRes.status === "fulfilled" && contribRes.value.ok) {
    const contribJson = await contribRes.value.json();
    if (Array.isArray(contribJson?.contributions)) {
      const officialTotal =
        typeof contribJson?.total?.lastYear === "number"
          ? contribJson.total.lastYear
          : null;
      activity = computeContributionStats(
        contribJson.contributions,
        officialTotal,
      );
      hasActivity = true;
    }
  }

  if (!profile && repos.length === 0 && !hasActivity) {
    return GITHUB_FALLBACK_DATA;
  }

  const stars = repos.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0,
  );

  // Repo-count language breakdown (excluding forks)
  const langCount = {};
  let totalLangRepos = 0;
  for (const repo of repos) {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      totalLangRepos += 1;
    }
  }

  const languageBreakdown = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      percentage:
        totalLangRepos > 0
          ? Number(((count / totalLangRepos) * 100).toFixed(1))
          : 0,
      color: LANGUAGE_COLORS[name] || "#6366f1",
    }));

  const recentRepos = repos.slice(0, 4).map((repo) => ({
    name: repo.name,
    description: repo.description || "",
    url: repo.html_url,
    stars: repo.stargazers_count || 0,
    language: repo.language || null,
    languageColor: LANGUAGE_COLORS[repo.language] || "#6366f1",
    updatedAt: repo.updated_at,
  }));

  return {
    isLive: Boolean(profile || hasActivity),
    source: "rest",
    fetchedAt: new Date().toISOString(),
    username: profile?.login || username,
    name: profile?.name || GITHUB_FALLBACK_DATA.name,
    bio: profile?.bio || GITHUB_FALLBACK_DATA.bio,
    location: profile?.location || GITHUB_FALLBACK_DATA.location,
    avatarUrl: profile?.avatar_url || GITHUB_FALLBACK_DATA.avatarUrl,
    profileUrl: profile?.html_url || `https://github.com/${username}`,
    publicRepos: profile?.public_repos ?? repos.length,
    followers: profile?.followers ?? 0,
    stars,
    totalContributions: activity.totalContributions,
    currentStreak: activity.currentStreak,
    longestStreak: activity.longestStreak,
    languages:
      languageBreakdown.length > 0
        ? languageBreakdown.slice(0, 3).map((l) => l.name)
        : GITHUB_FALLBACK_DATA.languages,
    languageBreakdown:
      languageBreakdown.length > 0
        ? languageBreakdown
        : GITHUB_FALLBACK_DATA.languageBreakdown,
    recentRepos,
    contributions: activity.contributions,
  };
}

/**
 * Fetches GitHub metrics server-side inside Next.js (no separate backend needed).
 * Automatically uses official GitHub GraphQL API when GITHUB_TOKEN is configured,
 * and falls back cleanly to tokenless server-side REST + contributions fetching.
 */
export async function getGithubStats(username = GITHUB_USERNAME) {
  const token = process.env.GITHUB_TOKEN?.trim();

  if (token) {
    try {
      return await fetchViaGraphQL(username, token);
    } catch (err) {
      console.warn(
        "GitHub GraphQL fetch failed, falling back to tokenless REST:",
        err.message,
      );
    }
  }

  try {
    return await fetchViaRestFallback(username);
  } catch (err) {
    console.warn("GitHub REST fallback failed:", err.message);
    return GITHUB_FALLBACK_DATA;
  }
}
