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
import { getGithubStats } from "@/lib/github";
import { getLeetcodeStats } from "@/lib/leetcode";

export const revalidate = 3600;

async function getStatsData() {
  const [githubBuildData, leetcodeBuildData] = await Promise.all([
    getGithubStats(),
    getLeetcodeStats(),
  ]);

  return { githubBuildData, leetcodeBuildData };
}

export default async function Home() {
  const { githubBuildData, leetcodeBuildData } = await getStatsData();

  return (
    <div className="flex flex-col min-h-screen text-foreground selection:bg-indigo-500 selection:text-white relative overflow-hidden isolate">
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
        <CodingStats
          githubBuildData={githubBuildData}
          leetcodeBuildData={leetcodeBuildData}
        />
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
