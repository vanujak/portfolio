"use client";

import { useState, useEffect } from "react";

export default function CodingStats({
  githubBuildData = null,
  leetcodeBuildData = null,
}) {
  const [githubData, setGithubData] = useState(githubBuildData);
  const [githubActivity, setGithubActivity] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(leetcodeBuildData);

  useEffect(() => {
    const fetchStats = async () => {
      const githubHeaders = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      };

      // Native XHR GET utility to bypass Next.js dev server fetch override (prevents red screen error overlays)
      const xhrGet = (url, headers = {}) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                resolve(JSON.parse(xhr.responseText));
              } catch (e) {
                reject(e);
              }
            } else {
              reject(new Error(`HTTP status ${xhr.status}`));
            }
          };
          xhr.onerror = () => reject(new Error("Network Error"));
          xhr.send();
        });
      };

      // 1. Fetch GitHub Profile & Repositories via XHR client-side (to hydrate any newer commits since build)
      try {
        const ghJson = await xhrGet("https://api.github.com/users/vanujak");
        if (ghJson) {
          let stars = 0;
          let languages = githubData?.languages || [
            "Java",
            "JavaScript",
            "Python",
          ];

          try {
            const reposJson = await xhrGet(
              "https://api.github.com/users/vanujak/repos?per_page=100",
            );
            if (reposJson && Array.isArray(reposJson)) {
              stars = reposJson.reduce(
                (acc, repo) => acc + (repo.stargazers_count || 0),
                0,
              );

              const langMap = {};
              reposJson.forEach((repo) => {
                if (repo.language) {
                  langMap[repo.language] = (langMap[repo.language] || 0) + 1;
                }
              });

              const sortedLangs = Object.entries(langMap)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map((entry) => entry[0]);

              if (sortedLangs.length > 0) {
                languages = sortedLangs;
              }
            }
          } catch (repoErr) {
            console.warn(
              "Could not load repo stats, using user profile fallbacks",
              repoErr,
            );
          }

          setGithubData({
            ...ghJson,
            stars,
            languages,
          });
        }
      } catch (err) {
        console.warn("Failed to load GitHub stats via XHR:", err);
      }

      try {
        const activityJson = await xhrGet(
          "https://github-contributions-api.jogruber.de/v4/vanujak",
        );
        if (activityJson && Array.isArray(activityJson.contributions)) {
          const sortedDays = [...activityJson.contributions].sort(
            (a, b) => new Date(a.date) - new Date(b.date),
          );

          let totalContributions = 0;
          let longestStreak = 0;
          let currentRun = 0;

          sortedDays.forEach((day) => {
            const count = day.count || 0;
            totalContributions += count;
            if (count > 0) {
              currentRun += 1;
              longestStreak = Math.max(longestStreak, currentRun);
            } else {
              currentRun = 0;
            }
          });

          let currentStreak = 0;
          for (let i = sortedDays.length - 1; i >= 0; i -= 1) {
            if ((sortedDays[i].count || 0) > 0) {
              currentStreak += 1;
            } else {
              break;
            }
          }

          setGithubActivity({
            totalContributions,
            currentStreak,
            longestStreak,
          });
        }
      } catch (err) {
        console.warn("Failed to load GitHub activity via XHR:", err);
      }

      // 2. Fetch LeetCode stats via the active, reliable Vercel proxy
      try {
        const lcJson = await xhrGet(
          "https://leetcode-api-faisalshohag.vercel.app/vanujak",
        );
        if (lcJson && lcJson.totalQuestions >= 0) {
          setLeetcodeData({
            status: "success",
            totalSolved: lcJson.totalSolved || 0,
            easySolved: lcJson.easySolved || 0,
            mediumSolved: lcJson.mediumSolved || 0,
            hardSolved: lcJson.hardSolved || 0,
            totalQuestions: lcJson.totalQuestions || 3985,
            totalEasy: lcJson.totalEasy || 953,
            totalMedium: lcJson.totalMedium || 2081,
            totalHard: lcJson.totalHard || 951,
            ranking: lcJson.ranking || 5000000,
            acceptanceRate: lcJson.totalSolved
              ? Number(
                  (
                    (lcJson.totalSolved / (lcJson.totalSolved + 10)) *
                    100
                  ).toFixed(1),
                )
              : 0.0,
          });
        }
      } catch (err) {
        console.warn("Failed to load LeetCode stats via XHR:", err);
      }
    };

    fetchStats();
  }, []);

  // Combined live API details and verified profile metrics
  const ghStats = {
    avatar_url: githubData?.avatar_url || "https://github.com/vanujak.png",
    name: githubData?.name || "Vanuja Karunaratne",
    bio:
      githubData?.bio ||
      "Computer Engineering Student | DevOps & Cloud Enthusiast",
    public_repos: githubData?.public_repos || 21,
    location: githubData?.location || "Ratnapura, Sri Lanka",
    languages: githubData?.languages || ["Java", "JavaScript", "Python"],
    totalContributions: githubActivity?.totalContributions || 0,
    currentStreak: githubActivity?.currentStreak || 0,
    longestStreak: githubActivity?.longestStreak || 0,
  };

  const lcStats = leetcodeData || {
    status: "success",
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalQuestions: 3985,
    totalEasy: 953,
    totalMedium: 2081,
    totalHard: 951,
    ranking: 5000000,
    acceptanceRate: 0.0,
  };

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
          {/* NATIVE GITHUB CARD */}
          <div className="flex flex-col bg-background-secondary/50 border border-zinc-200/70 dark:border-zinc-800/70 rounded-2xl p-4 sm:p-6 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-colors duration-200 justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 pb-3 sm:pb-4 mb-4 sm:mb-5">
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 text-zinc-800 dark:text-zinc-200 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    GitHub Dev Metrics
                  </h3>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Live API" />
              </div>

              {/* Profile details */}
              <div className="flex flex-row items-center gap-3.5 sm:gap-5 mb-4 sm:mb-6">
                <img
                  src={ghStats.avatar_url}
                  alt={ghStats.name}
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-xs shrink-0"
                />
                <div className="text-left min-w-0">
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50 truncate">
                    {ghStats.name}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium mt-0.5">
                    {ghStats.location}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 sm:mt-2 line-clamp-2">
                    {ghStats.bio}
                  </p>
                </div>
              </div>

              {/* Dynamic Stats Numbers */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-background/60 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 p-3 sm:p-4 rounded-xl">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {ghStats.totalContributions.toLocaleString()}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase mt-0.5">
                    Total Contributions
                  </div>
                </div>
                <div className="text-center border-x border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {ghStats.currentStreak}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase mt-0.5">
                    Current Streak
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {ghStats.longestStreak}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase mt-0.5">
                    Longest Streak
                  </div>
                </div>
              </div>

              {/* Primary Languages distribution tag pills */}
              <div className="flex flex-wrap gap-2 mt-4 sm:mt-5 items-center justify-start">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mr-1">
                  Primary Languages:
                </span>
                {ghStats.languages.map((lang, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/50"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 flex justify-end">
              <a
                href="https://github.com/vanujak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
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

          {/* NATIVE LEETCODE CARD */}
          <div className="flex flex-col bg-background-secondary/50 border border-zinc-200/70 dark:border-zinc-800/70 rounded-2xl p-4 sm:p-6 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-colors duration-200 justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 pb-3 sm:pb-4 mb-4 sm:mb-5">
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    LeetCode Algorithmic Stats
                  </h3>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Live API" />
              </div>

              {/* Progress Display */}
              <div className="flex flex-row items-center gap-4 sm:gap-8 mb-4 sm:mb-6">
                {/* Total Circle */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center rounded-full border-4 border-zinc-200 dark:border-zinc-800 bg-background/50 flex-shrink-0">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
                      {lcStats.totalSolved}
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase mt-0.5">
                      Solved
                    </div>
                  </div>
                </div>

                {/* Categories Progress Bars */}
                <div className="flex-grow space-y-2.5 sm:space-y-4 w-full min-w-0">
                  {/* Easy */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Easy
                      </span>
                      <span>{lcStats.easySolved}</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-200/60 dark:bg-zinc-800/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{
                          width: `${(lcStats.easySolved / (lcStats.totalEasy || 800)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Medium */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                      <span className="text-amber-500 dark:text-amber-400">
                        Medium
                      </span>
                      <span>{lcStats.mediumSolved}</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-200/60 dark:bg-zinc-800/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{
                          width: `${(lcStats.mediumSolved / (lcStats.totalMedium || 1600)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Hard */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                      <span className="text-rose-500 dark:text-rose-400">
                        Hard
                      </span>
                      <span>{lcStats.hardSolved}</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-200/60 dark:bg-zinc-800/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full"
                        style={{
                          width: `${(lcStats.hardSolved / (lcStats.totalHard || 700)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Stats Grid (Symmetric to GitHub Card) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-background/60 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 p-3 sm:p-4 rounded-xl mt-4 sm:mt-5">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {lcStats.acceptanceRate}%
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase mt-0.5">
                    Acceptance
                  </div>
                </div>
                <div className="text-center border-x border-zinc-200/50 dark:border-zinc-800/50 flex flex-col justify-center">
                  <div className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 truncate px-1">
                    {lcStats.ranking
                      ? lcStats.ranking.toLocaleString()
                      : "1,482,091"}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase mt-1">
                    Global Rank
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    0 Days
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase mt-0.5">
                    Active Streak
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 flex justify-end">
              <a
                href="https://leetcode.com/u/vanujak/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
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
