import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import CodingStats from "@/components/CodingStats";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
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
        <Projects />
        <Certificates />
        <CodingStats />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
