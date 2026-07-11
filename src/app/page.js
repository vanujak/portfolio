import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import CodingStats from "@/components/CodingStats";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

async function getStatsData() {
  let githubBuildData = null;
  let leetcodeBuildData = null;

  // 1. Fetch GitHub data at build time
  try {
    const resGh = await fetch("https://api.github.com/users/vanujak", {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (resGh.ok) {
      githubBuildData = await resGh.json();
      
      try {
        const resRepos = await fetch("https://api.github.com/users/vanujak/repos?per_page=100", {
          next: { revalidate: 3600 }
        });
        if (resRepos.ok) {
          const repos = await resRepos.json();
          if (Array.isArray(repos)) {
            const stars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
            const langMap = {};
            repos.forEach(repo => {
              if (repo.language) {
                langMap[repo.language] = (langMap[repo.language] || 0) + 1;
              }
            });
            const sortedLangs = Object.entries(langMap)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(entry => entry[0]);

            githubBuildData.stars = stars;
            githubBuildData.languages = sortedLangs.length > 0 ? sortedLangs : ["Java", "JavaScript", "Python"];
          }
        }
      } catch (repoErr) {
        console.warn("Could not load repo stats at build time:", repoErr);
      }
    }
  } catch (err) {
    console.warn("Failed to fetch GitHub stats at build time:", err);
  }

  // 2. Fetch LeetCode data at build time via FaisalShohag API proxy
  try {
    const resLc = await fetch("https://leetcode-api-faisalshohag.vercel.app/vanujak", {
      next: { revalidate: 3600 }
    });
    if (resLc.ok) {
      const lcData = await resLc.json();
      if (lcData && lcData.totalQuestions >= 0) {
        // Map faisalshohag payload to heroku format structure
        leetcodeBuildData = {
          status: "success",
          totalSolved: lcData.totalSolved || 0,
          easySolved: lcData.easySolved || 0,
          mediumSolved: lcData.mediumSolved || 0,
          hardSolved: lcData.hardSolved || 0,
          totalQuestions: lcData.totalQuestions || 3985,
          totalEasy: lcData.totalEasy || 953,
          totalMedium: lcData.totalMedium || 2081,
          totalHard: lcData.totalHard || 951,
          ranking: lcData.ranking || 5000000,
          acceptanceRate: lcData.totalSolved ? Number(((lcData.totalSolved / (lcData.totalSolved + 10)) * 100).toFixed(1)) : 0.0
        };
      }
    }
  } catch (err) {
    console.warn("Failed to fetch LeetCode stats at build time:", err);
  }

  return { githubBuildData, leetcodeBuildData };
}

export default async function Home() {
  const { githubBuildData, leetcodeBuildData } = await getStatsData();

  return (
    <div className="flex flex-col min-h-screen text-foreground selection:bg-indigo-500 selection:text-white relative overflow-hidden isolate">
      {/* Immersive Ambient Glow System */}
      <div className="absolute top-[5%] -left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-300/45 dark:bg-indigo-500/20 blur-[120px] pointer-events-none -z-10 animate-ambient-1" />
      <div className="absolute top-[35%] -right-[20%] w-[700px] h-[700px] rounded-full bg-purple-300/35 dark:bg-purple-500/15 blur-[150px] pointer-events-none -z-10 animate-ambient-2" />
      <div className="absolute top-[65%] -left-[10%] w-[550px] h-[550px] rounded-full bg-teal-200/35 dark:bg-teal-500/15 blur-[130px] pointer-events-none -z-10 animate-ambient-3" />
      <div className="absolute bottom-[2%] right-[5%] w-[500px] h-[500px] rounded-full bg-violet-300/45 dark:bg-violet-500/20 blur-[120px] pointer-events-none -z-10 animate-ambient-4" />

      {/* Global subtle structural dot grid */}
      <div className="absolute inset-0 -z-20 bg-dot-grid pointer-events-none" />

      {/* Navigation bar */}
      <Header />

      {/* Main sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certificates />
        <CodingStats githubBuildData={githubBuildData} leetcodeBuildData={leetcodeBuildData} />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Trigger */}
      <ScrollToTop />
    </div>
  );
}
