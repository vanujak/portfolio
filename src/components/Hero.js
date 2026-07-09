export default function Hero() {
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-radial from-indigo-50/50 via-transparent to-transparent dark:from-indigo-950/20">
      {/* Background grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 mb-6 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
          <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            Available for new opportunities
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 leading-tight">
          Building Reliable<br />
          <span className="sm:whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
            Cloud & DevOps Solutions
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Hi, I'm Vanuja Karunaratne, a Computer Engineering undergraduate at the University of Ruhuna. 
          I am passionate about DevOps, automated cloud infrastructure, and MLOps, alongside full-stack development, 
          focusing on streamlining software delivery and automated model lifecycles.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md hover:shadow-indigo-500/20 transition-all duration-200"
          >
            Explore Projects
          </a>
          <a
            href={`${basePath}/Vanuja_Karunaratne_CV.pdf`}
            download="Vanuja_Karunaratne_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-900/50 hover:bg-indigo-100/50 dark:hover:bg-indigo-950/40 shadow-sm transition-all duration-200 cursor-pointer"
          >
            Download CV
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-sm transition-all duration-200"
          >
            Let's Talk
          </a>
        </div>
      </div>

      {/* Elegant visual detail at the bottom (hidden on mobile to prevent overlapping) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600 animate-bounce">
        <span className="text-xs uppercase tracking-widest font-bold">
          Scroll Down
        </span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
