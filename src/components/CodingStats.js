"use client";

import { useState, useEffect, useMemo } from "react";

const HEATMAP_WEEKS = 36;
const HEATMAP_MOBILE_WEEKS = 24;

const HEATMAP_LEVEL_CLASSES = [
  "bg-zinc-200/80 dark:bg-zinc-800/80",
  "bg-emerald-200 dark:bg-emerald-900/90",
  "bg-emerald-400 dark:bg-emerald-700",
  "bg-emerald-500 dark:bg-emerald-500",
  "bg-emerald-600 dark:bg-emerald-400",
];

function buildHeatmapWeeks(contributions) {
  if (!Array.isArray(contributions) || contributions.length === 0) {
    return Array.from({ length: HEATMAP_WEEKS }, () =>
      Array.from({ length: 7 }, () => ({ date: null, count: 0, level: 0 })),
    );
  }

  const weeks = [];
  let currentWeek = Array(7).fill(null);

  for (const day of contributions) {
    if (!day?.date) continue;
    const dow = new Date(`${day.date}T00:00:00Z`).getUTCDay();
    if (dow === 0 && currentWeek.some(Boolean)) {
      weeks.push(currentWeek);
      currentWeek = Array(7).fill(null);
    }
    currentWeek[dow] = {
      date: day.date,
      count: day.count || 0,
      level: Math.min(4, Math.max(0, day.level ?? 0)),
    };
  }

  if (currentWeek.some(Boolean)) {
    weeks.push(currentWeek);
  }

  return weeks.slice(-HEATMAP_WEEKS);
}

function formatContributionDate(dateStr) {
  if (!dateStr) return "";
  return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function CodingStats({
  githubBuildData = null,
  leetcodeBuildData = null,
}) {
  const [githubData, setGithubData] = useState(githubBuildData);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(leetcodeBuildData);

  useEffect(() => {
    let isMounted = true;

    // Both GitHub & LeetCode hydrate server-side with 1h ISR.
    // Only retry via same-origin Next.js routes if initial SSR data wasn't live.
    const hydrateIfNeeded = async (initialIsLive, endpoint, setter) => {
      if (initialIsLive) return;
      try {
        const res = await fetch(endpoint);
        if (res.ok) {
          const fresh = await res.json();
          if (isMounted && fresh?.isLive) {
            setter(fresh);
          }
        }
      } catch (err) {
        console.warn(`Failed to hydrate stats from ${endpoint}:`, err);
      }
    };

    hydrateIfNeeded(githubBuildData?.isLive, "/api/github", setGithubData);
    hydrateIfNeeded(leetcodeBuildData?.isLive, "/api/leetcode", setLeetcodeData);

    return () => {
      isMounted = false;
    };
  }, [githubBuildData?.isLive, leetcodeBuildData?.isLive]);

  // Normalized GitHub metrics from server-side /api/github pipeline
  const ghStats = {
    isLive: Boolean(githubData?.isLive),
    source: githubData?.source || "fallback",
    username: githubData?.username || "vanujak",
    avatar_url:
      githubData?.avatarUrl ||
      githubData?.avatar_url ||
      "https://github.com/vanujak.png",
    profileUrl: githubData?.profileUrl || "https://github.com/vanujak",
    name: githubData?.name || "Vanuja Karunaratne",
    public_repos: githubData?.publicRepos ?? githubData?.public_repos ?? 21,
    totalContributions: githubData?.totalContributions ?? 0,
    currentStreak: githubData?.currentStreak ?? 0,
    longestStreak: githubData?.longestStreak ?? 0,
    languageBreakdown:
      Array.isArray(githubData?.languageBreakdown) &&
      githubData.languageBreakdown.length > 0
        ? githubData.languageBreakdown.slice(0, 4)
        : [
            { name: "Java", percentage: 40, color: "#b07219" },
            { name: "JavaScript", percentage: 35, color: "#f1e05a" },
            { name: "Python", percentage: 25, color: "#3572A5" },
          ],
    latestRepo: githubData?.recentRepos?.[0] || null,
    contributions: githubData?.contributions || [],
  };

  const heatmapWeeks = useMemo(
    () => buildHeatmapWeeks(githubData?.contributions),
    [githubData?.contributions],
  );

  const mobileHiddenWeekCount = Math.max(
    0,
    heatmapWeeks.length - HEATMAP_MOBILE_WEEKS,
  );

  const lcStats = {
    isLive: Boolean(leetcodeData?.isLive),
    source: leetcodeData?.source || "fallback",
    username: leetcodeData?.username || "vanujak",
    profileUrl: leetcodeData?.profileUrl || "https://leetcode.com/u/vanujak/",
    totalSolved: leetcodeData?.totalSolved ?? 0,
    easySolved: leetcodeData?.easySolved ?? 0,
    mediumSolved: leetcodeData?.mediumSolved ?? 0,
    hardSolved: leetcodeData?.hardSolved ?? 0,
    totalQuestions: leetcodeData?.totalQuestions ?? 4115,
    totalEasy: leetcodeData?.totalEasy ?? 976,
    totalMedium: leetcodeData?.totalMedium ?? 2148,
    totalHard: leetcodeData?.totalHard ?? 991,
    ranking: leetcodeData?.ranking ?? null,
    acceptanceRate: leetcodeData?.acceptanceRate ?? 0,
    currentStreak: leetcodeData?.currentStreak ?? 0,
    longestStreak: leetcodeData?.longestStreak ?? 0,
    activeDays: leetcodeData?.activeDays ?? 0,
    latestProblem: leetcodeData?.latestProblem ?? null,
  };

  // SVG multi-segment donut geometry for LeetCode ring
  const ringCircumference = 2 * Math.PI * 40;
  const lcSolvedTotal = lcStats.totalSolved;
  const easyArc =
    lcSolvedTotal > 0
      ? (lcStats.easySolved / lcSolvedTotal) * ringCircumference
      : 0;
  const mediumArc =
    lcSolvedTotal > 0
      ? (lcStats.mediumSolved / lcSolvedTotal) * ringCircumference
      : 0;
  const hardArc =
    lcSolvedTotal > 0
      ? (lcStats.hardSolved / lcSolvedTotal) * ringCircumference
      : 0;

  const lcDifficultyRows = [
    {
      label: "Easy",
      solved: lcStats.easySolved,
      total: lcStats.totalEasy || 976,
      pct:
        lcSolvedTotal > 0
          ? Math.round((lcStats.easySolved / lcSolvedTotal) * 100)
          : 0,
      textClass: "text-emerald-600 dark:text-emerald-400",
      barClass: "bg-emerald-500",
      color: "#10b981",
    },
    {
      label: "Medium",
      solved: lcStats.mediumSolved,
      total: lcStats.totalMedium || 2148,
      pct:
        lcSolvedTotal > 0
          ? Math.round((lcStats.mediumSolved / lcSolvedTotal) * 100)
          : 0,
      textClass: "text-amber-500 dark:text-amber-400",
      barClass: "bg-amber-500",
      color: "#f59e0b",
    },
    {
      label: "Hard",
      solved: lcStats.hardSolved,
      total: lcStats.totalHard || 991,
      pct:
        lcSolvedTotal > 0
          ? Math.round((lcStats.hardSolved / lcSolvedTotal) * 100)
          : 0,
      textClass: "text-rose-500 dark:text-rose-400",
      barClass: "bg-rose-500",
      color: "#f43f5e",
    },
  ];

  const formattedRank = !lcStats.ranking
    ? "—"
    : lcStats.ranking >= 5000000
      ? "5M+"
      : lcStats.ranking >= 1000000
        ? `#${(lcStats.ranking / 1000000).toFixed(1)}M`
        : `#${lcStats.ranking.toLocaleString()}`;

  return (
    <section id="coding-stats" className="py-10 sm:py-14 lg:py-16 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
            Metrics
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-1.5">
            Coding Activity & Stats
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base">
            Live developer metrics fetched dynamically from my public GitHub and
            LeetCode profiles.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {/* NATIVE GITHUB CARD (Compact same-height redesign) */}
          <div className="flex flex-col bg-background-secondary/50 border border-zinc-200/70 dark:border-zinc-800/70 rounded-2xl p-4 sm:p-6 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-colors duration-200 justify-between">
            <div>
              {/* Unified Header: Identity + Repo Count */}
              <div className="flex items-center gap-2.5 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-3 mb-3.5 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={ghStats.avatar_url}
                    alt={ghStats.name}
                    className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-700 object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center ring-2 ring-background-secondary">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50 leading-tight truncate">
                    GitHub Activity
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate">
                    @{ghStats.username} · {ghStats.public_repos} repos
                  </p>
                </div>
              </div>

              {/* Compact Interactive Contribution Heatmap (36w desktop / 24w mobile) */}
              <div className="bg-background/60 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl p-2.5 sm:p-3 mb-3.5">
                <div className="flex items-center justify-between gap-2 h-4 mb-2">
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium truncate">
                    {hoveredDay ? (
                      <>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                          {hoveredDay.count}{" "}
                          {hoveredDay.count === 1 ? "contribution" : "contributions"}
                        </span>{" "}
                        · {formatContributionDate(hoveredDay.date)}
                      </>
                    ) : (
                      <>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                          {ghStats.totalContributions.toLocaleString()}
                        </span>{" "}
                        contributions · last 12 months
                      </>
                    )}
                  </span>
                  <div className="hidden sm:flex items-center gap-1 shrink-0 text-[10px] text-zinc-400 dark:text-zinc-500">
                    <span>Less</span>
                    {HEATMAP_LEVEL_CLASSES.map((cls, lvl) => (
                      <span
                        key={lvl}
                        className={`w-2 h-2 rounded-[2px] ${cls}`}
                      />
                    ))}
                    <span>More</span>
                  </div>
                </div>

                <div
                  className="flex justify-between items-center w-full"
                  onMouseLeave={() => setHoveredDay(null)}
                  role="img"
                  aria-label={`GitHub contribution heatmap showing ${ghStats.totalContributions} contributions in the last year`}
                >
                  {heatmapWeeks.map((week, wIdx) => (
                    <div
                      key={wIdx}
                      className={`${
                        wIdx < mobileHiddenWeekCount ? "hidden sm:flex" : "flex"
                      } flex-col gap-[3px]`}
                    >
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return (
                            <span
                              key={dIdx}
                              className="w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] opacity-0 pointer-events-none"
                            />
                          );
                        }
                        const levelCls =
                          HEATMAP_LEVEL_CLASSES[day.level] ||
                          HEATMAP_LEVEL_CLASSES[0];
                        return (
                          <span
                            key={day.date || `${wIdx}-${dIdx}`}
                            onMouseEnter={() => day.date && setHoveredDay(day)}
                            title={
                              day.date
                                ? `${day.count} contributions on ${formatContributionDate(day.date)}`
                                : undefined
                            }
                            className={`w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] rounded-[2px] transition-transform duration-100 hover:scale-125 hover:ring-1 hover:ring-indigo-500/60 ${levelCls}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-Column Metrics Strip (Symmetric to LeetCode Card) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-background/60 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 p-2.5 sm:p-3 rounded-xl mb-3.5">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {ghStats.totalContributions.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wide mt-0.5">
                    Contributions
                  </div>
                </div>
                <div className="text-center border-x border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {ghStats.currentStreak}
                    <span className="text-xs font-bold ml-0.5 text-zinc-500 dark:text-zinc-400">
                      d
                    </span>
                  </div>
                  <div className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wide mt-0.5">
                    Current Streak
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {ghStats.longestStreak}
                    <span className="text-xs font-bold ml-0.5 text-zinc-500 dark:text-zinc-400">
                      d
                    </span>
                  </div>
                  <div className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wide mt-0.5">
                    Longest Streak
                  </div>
                </div>
              </div>

              {/* Proportional Language Bar + Compact Legend */}
              <div>
                <div className="w-full h-1.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80 overflow-hidden flex gap-0.5">
                  {ghStats.languageBreakdown.map((lang) => (
                    <div
                      key={lang.name}
                      style={{
                        width: `${Math.max(lang.percentage, 4)}%`,
                        backgroundColor: lang.color,
                      }}
                      className="h-full first:rounded-l-full last:rounded-r-full"
                      title={`${lang.name} (${lang.percentage}%)`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                  {ghStats.languageBreakdown.map((lang) => (
                    <div
                      key={lang.name}
                      className="inline-flex items-center gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-400"
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {lang.name}
                      </span>
                      <span className="text-zinc-400 dark:text-zinc-500 tabular-nums">
                        {Math.round(lang.percentage)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer: Latest Repo + View GitHub */}
            <div className="mt-3.5 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between gap-3">
              {ghStats.latestRepo ? (
                <a
                  href={ghStats.latestRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors min-w-0"
                  title={`Latest updated repository: ${ghStats.latestRepo.name}`}
                >
                  <svg
                    className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                    />
                  </svg>
                  <span className="truncate font-mono">
                    {ghStats.latestRepo.name}
                  </span>
                </a>
              ) : (
                <span />
              )}

              <a
                href={ghStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer shrink-0"
              >
                View GitHub
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* NATIVE LEETCODE CARD (Symmetric same-height redesign) */}
          <div className="flex flex-col bg-background-secondary/50 border border-zinc-200/70 dark:border-zinc-800/70 rounded-2xl p-4 sm:p-6 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-colors duration-200 justify-between">
            <div>
              {/* Unified Header: Icon Badge + Identity */}
              <div className="flex items-center gap-2.5 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-3 mb-3.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4.5 h-4.5 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50 leading-tight truncate">
                    LeetCode Stats
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate">
                    @{lcStats.username} · {lcStats.totalSolved}/
                    {lcStats.totalQuestions.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Compact Visual Progress Panel (matches GitHub Heatmap height) */}
              <div className="bg-background/60 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl p-2.5 sm:p-3 mb-3.5">
                <div className="flex flex-row items-center gap-4 sm:gap-5">
                  {/* Multi-Segment SVG Donut Ring */}
                  <div className="relative w-24 h-24 sm:w-[104px] sm:h-[104px] shrink-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full -rotate-90"
                      aria-hidden="true"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="7"
                        className="text-zinc-200/80 dark:text-zinc-800/80"
                      />
                      {easyArc > 0 && (
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="7"
                          strokeLinecap="butt"
                          strokeDasharray={`${easyArc} ${ringCircumference}`}
                          strokeDashoffset={0}
                        />
                      )}
                      {mediumArc > 0 && (
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="7"
                          strokeLinecap="butt"
                          strokeDasharray={`${mediumArc} ${ringCircumference}`}
                          strokeDashoffset={-easyArc}
                        />
                      )}
                      {hardArc > 0 && (
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="7"
                          strokeLinecap="butt"
                          strokeDasharray={`${hardArc} ${ringCircumference}`}
                          strokeDashoffset={-(easyArc + mediumArc)}
                        />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 leading-none tabular-nums">
                        {lcStats.totalSolved}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mt-1">
                        Solved
                      </span>
                    </div>
                  </div>

                  {/* Difficulty Progress Bars */}
                  <div className="flex-grow space-y-2.5 w-full min-w-0">
                    {lcDifficultyRows.map((row) => (
                      <div key={row.label}>
                        <div className="flex items-baseline justify-between text-xs mb-1">
                          <span className={`font-bold ${row.textClass}`}>
                            {row.label}
                          </span>
                          <span className="text-[11px] font-mono tabular-nums text-zinc-500 dark:text-zinc-400">
                            <span className="font-bold text-zinc-800 dark:text-zinc-200">
                              {row.solved}
                            </span>
                            /{row.total}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-200/70 dark:bg-zinc-800/80 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${row.barClass} rounded-full transition-all duration-300`}
                            style={{
                              width: `${Math.min(100, (row.solved / row.total) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3-Column Metrics Strip (Symmetric to GitHub Card) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-background/60 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 p-2.5 sm:p-3 rounded-xl mb-3.5">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {lcStats.acceptanceRate > 0
                      ? `${lcStats.acceptanceRate}%`
                      : "—"}
                  </div>
                  <div className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wide mt-0.5">
                    Acceptance
                  </div>
                </div>
                <div
                  className="text-center border-x border-zinc-200/50 dark:border-zinc-800/50"
                  title={
                    lcStats.ranking
                      ? `Global Rank #${lcStats.ranking.toLocaleString()}`
                      : "Unranked"
                  }
                >
                  <div className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums truncate px-1">
                    {formattedRank}
                  </div>
                  <div className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wide mt-0.5">
                    Global Rank
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {lcStats.currentStreak}
                    <span className="text-xs font-bold ml-0.5 text-zinc-500 dark:text-zinc-400">
                      d
                    </span>
                  </div>
                  <div className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wide mt-0.5">
                    Active Streak
                  </div>
                </div>
              </div>

              {/* Difficulty Share Bar + Compact Legend (mirrors GitHub Language Bar) */}
              <div>
                <div className="w-full h-1.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80 overflow-hidden flex gap-0.5">
                  {lcSolvedTotal > 0 &&
                    lcDifficultyRows
                      .filter((r) => r.solved > 0)
                      .map((row) => (
                        <div
                          key={row.label}
                          style={{
                            width: `${Math.max((row.solved / lcSolvedTotal) * 100, 4)}%`,
                            backgroundColor: row.color,
                          }}
                          className="h-full first:rounded-l-full last:rounded-r-full"
                          title={`${row.label}: ${row.solved} (${row.pct}%)`}
                        />
                      ))}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                  {lcDifficultyRows.map((row) => (
                    <div
                      key={row.label}
                      className="inline-flex items-center gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-400"
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: row.color }}
                      />
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {row.label}
                      </span>
                      <span className="text-zinc-400 dark:text-zinc-500 tabular-nums">
                        {row.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer: Latest Solved Problem + View LeetCode */}
            <div className="mt-3.5 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between gap-3">
              {lcStats.latestProblem ? (
                <a
                  href={lcStats.latestProblem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors min-w-0"
                  title={`Latest accepted problem: ${lcStats.latestProblem.title}`}
                >
                  <svg
                    className="w-3.5 h-3.5 shrink-0 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="truncate font-mono">
                    {lcStats.latestProblem.title}
                  </span>
                </a>
              ) : (
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 truncate">
                  {lcStats.activeDays > 0
                    ? `${lcStats.activeDays} active days`
                    : "Algorithms & DSA"}
                </span>
              )}

              <a
                href={lcStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer shrink-0"
              >
                View LeetCode
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
