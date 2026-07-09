'use client';

import { useState, useEffect } from 'react';

export default function CodingStats() {
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Native XHR GET utility to bypass Next.js dev server fetch override (prevents red screen error overlays)
      const xhrGet = (url) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", url);
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

      // 1. Fetch GitHub Profile & Repositories via XHR
      try {
        const ghJson = await xhrGet("https://api.github.com/users/vanujak");
        if (ghJson) {
          let stars = 0;
          let languages = ["Java", "JavaScript", "Python"];
          
          try {
            const reposJson = await xhrGet("https://api.github.com/users/vanujak/repos?per_page=100");
            if (reposJson && Array.isArray(reposJson)) {
              stars = reposJson.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
              
              const langMap = {};
              reposJson.forEach(repo => {
                if (repo.language) {
                  langMap[repo.language] = (langMap[repo.language] || 0) + 1;
                }
              });
              
              const sortedLangs = Object.entries(langMap)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(entry => entry[0]);
                
              if (sortedLangs.length > 0) {
                languages = sortedLangs;
              }
            }
          } catch (repoErr) {
            console.warn("Could not load repo stats, using user profile fallbacks", repoErr);
          }
          
          setGithubData({
            ...ghJson,
            stars,
            languages
          });
        }
      } catch (err) {
        console.warn("Failed to load GitHub stats via XHR:", err);
      }

      // 2. Fetch LeetCode stats via CORS Proxy (allorigins) inside XHR
      try {
        const targetUrl = "https://leetcode-stats-api.herokuapp.com/vanujak";
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
        
        const lcWrapper = await xhrGet(proxyUrl);
        if (lcWrapper && lcWrapper.contents) {
          const lcJson = JSON.parse(lcWrapper.contents);
          if (lcJson && lcJson.status === "success" && lcJson.totalSolved >= 0) {
            setLeetcodeData(lcJson);
          }
        }
      } catch (err) {
        console.warn("Failed to load LeetCode stats via XHR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Combined live API details and verified profile metrics
  const ghStats = {
    avatar_url: githubData?.avatar_url || "https://github.com/vanujak.png",
    name: githubData?.name || "Vanuja Karunaratne",
    bio: githubData?.bio || "Computer Engineering Student | DevOps & Cloud Enthusiast",
    public_repos: githubData?.public_repos || 18,
    location: githubData?.location || "Ratnapura, Sri Lanka",
    languages: githubData?.languages || ["Java", "JavaScript", "Python"],
    commits: 205, // Actual verified stat
    prs: 13,      // Actual verified stat
    contributedTo: 21 // Actual verified stat
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
    acceptanceRate: 0.0
  };

  return (
    <section id="coding-stats" className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
            Metrics
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
            Coding Activity & Stats
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4">
            Live developer metrics fetched dynamically from my public GitHub and LeetCode profiles.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* NATIVE GITHUB CARD */}
          <div className="flex flex-col bg-background-secondary/35 border border-zinc-200/40 dark:border-zinc-800/30 rounded-3xl p-6 sm:p-8 hover:scale-[1.01] hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all duration-300 shadow-xs justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-zinc-200/30 dark:border-zinc-800/30 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🐙</span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    GitHub Dev Metrics
                  </h3>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Profile details */}
              <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
                <img
                  src={ghStats.avatar_url}
                  alt={ghStats.name}
                  className="w-20 h-20 rounded-full border-2 border-indigo-500/20 shadow-sm"
                />
                <div className="text-center sm:text-left">
                  <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                    {ghStats.name}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium mt-0.5">
                    {ghStats.location}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-450 mt-2 max-w-sm">
                    {ghStats.bio}
                  </p>
                </div>
              </div>

              {/* Dynamic Stats Numbers (Verified metrics requested by user) */}
              <div className="grid grid-cols-3 gap-4 bg-background/50 dark:bg-zinc-900/30 border border-zinc-200/30 dark:border-zinc-800/20 p-4 rounded-2xl">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {ghStats.commits}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">
                    Total Commits
                  </div>
                </div>
                <div className="text-center border-x border-zinc-200/30 dark:border-zinc-800/30">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {ghStats.prs}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">
                    Total PRs
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {ghStats.contributedTo}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">
                    Contributed To
                  </div>
                </div>
              </div>

              {/* Primary Languages distribution tag pills */}
              <div className="flex flex-wrap gap-2 mt-5 items-center justify-center sm:justify-start">
                <span className="text-xs font-bold text-zinc-550 dark:text-zinc-450 mr-1">Primary Languages:</span>
                {ghStats.languages.map((lang, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-350 border border-zinc-200/40 dark:border-zinc-700/30"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-200/30 dark:border-zinc-800/30 flex justify-end">
              <a
                href="https://github.com/vanujak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
              >
                View GitHub
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>

          {/* NATIVE LEETCODE CARD */}
          <div className="flex flex-col bg-background-secondary/35 border border-zinc-200/40 dark:border-zinc-800/30 rounded-3xl p-6 sm:p-8 hover:scale-[1.01] hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all duration-300 shadow-xs justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-zinc-200/30 dark:border-zinc-800/30 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🟨</span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    LeetCode Algorithmic Stats
                  </h3>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Progress Display */}
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-6">
                {/* Total Circle */}
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-zinc-150 dark:border-zinc-800 bg-background/50 flex-shrink-0">
                  <div className="text-center">
                    <div className="text-3xl font-black text-zinc-900 dark:text-zinc-50">
                      {lcStats.totalSolved}
                    </div>
                    <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">
                      Solved
                    </div>
                  </div>
                </div>

                {/* Categories Progress Bars */}
                <div className="flex-grow space-y-4 w-full">
                  {/* Easy */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                      <span className="text-emerald-600 dark:text-emerald-400">Easy</span>
                      <span>{lcStats.easySolved}</span>
                    </div>
                    <div className="w-full h-2.5 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(lcStats.easySolved / (lcStats.totalEasy || 800)) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Medium */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                      <span className="text-amber-500 dark:text-amber-400">Medium</span>
                      <span>{lcStats.mediumSolved}</span>
                    </div>
                    <div className="w-full h-2.5 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(lcStats.mediumSolved / (lcStats.totalMedium || 1600)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Hard */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-555 dark:text-zinc-400 mb-1">
                      <span className="text-rose-500 dark:text-rose-455">Hard</span>
                      <span>{lcStats.hardSolved}</span>
                    </div>
                    <div className="w-full h-2.5 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full"
                        style={{ width: `${(lcStats.hardSolved / (lcStats.totalHard || 700)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Stats Grid (Symmetric to GitHub Card) */}
              <div className="grid grid-cols-3 gap-4 bg-background/50 dark:bg-zinc-900/30 border border-zinc-200/30 dark:border-zinc-800/20 p-4 rounded-2xl mt-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {lcStats.acceptanceRate}%
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">
                    Acceptance
                  </div>
                </div>
                <div className="text-center border-x border-zinc-200/30 dark:border-zinc-800/30 flex flex-col justify-center">
                  <div className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 truncate px-1">
                    {lcStats.ranking ? lcStats.ranking.toLocaleString() : "1,482,091"}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase mt-1">
                    Global Rank
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    0 Days
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">
                    Active Streak
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-200/30 dark:border-zinc-800/30 flex justify-end">
              <a
                href="https://leetcode.com/u/vanujak/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
              >
                View LeetCode
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
