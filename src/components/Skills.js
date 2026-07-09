export default function Skills() {
  const skillCategories = [
    {
      title: 'DevOps, Cloud & MLOps',
      skills: [
        { name: 'Docker' },
        { name: 'Jenkins' },
        { name: 'GitHub Actions' },
        { name: 'Terraform' },
        { name: 'Ansible' },
        { name: 'AWS' },
        { name: 'MLOps' },
      ],
    },
    {
      title: 'Backend & Databases',
      skills: [
        { name: 'Node.js' },
        { name: 'ExpressJS' },
        { name: 'NestJS' },
        { name: 'MongoDB' },
        { name: 'PostgreSQL' },
        { name: 'MySQL' },
      ],
    },
    {
      title: 'Languages & Frontend',
      skills: [
        { name: 'Python' },
        { name: 'JavaScript' },
        { name: 'Java' },
        { name: 'C++' },
        { name: 'React' },
        { name: 'Next.js' },
        { name: 'React Native' },
        { name: 'Tailwind CSS' },
      ],
    },
  ];

  // Compact, modern, custom SVGs (w-6 h-6 / 24px) representing each technology
  const skillIcons = {
    Docker: (
      <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="6" width="5" height="5" rx="1" />
        <rect x="9" y="6" width="5" height="5" rx="1" />
        <rect x="15" y="6" width="5" height="5" rx="1" />
        <rect x="9" y="12" width="5" height="5" rx="1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 18h18c0-2-1.5-3.5-3.5-3.5h-11C4.5 14.5 3 16 3 18z" />
      </svg>
    ),
    Jenkins: (
      <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M12 12l5 5M12 12l-5-5" />
        <circle cx="12" cy="12" r="3.5" className="fill-current text-orange-500" />
      </svg>
    ),
    'GitHub Actions': (
      <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18h2a2 2 0 002-2v-3a2 2 0 00-2-2h-2m-12 7h12M6 6H4a2 2 0 00-2 2v3a2 2 0 002 2h2m3 0V6a2 2 0 012-2h2a2 2 0 012 2v7" />
        <circle cx="6" cy="18" r="2.5" className="fill-current text-indigo-500" />
        <circle cx="18" cy="6" r="2.5" className="fill-current text-indigo-500" />
      </svg>
    ),
    Terraform: (
      <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4v10l8 4 8-4V7zM12 3v18M4 7l8 4 8-4M4 17l8-4 8 4" />
      </svg>
    ),
    Ansible: (
      <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6l-4 10m4-10l4 10m-6-3h4" />
      </svg>
    ),
    AWS: (
      <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        <rect x="9" y="13" width="6" height="3" rx="0.5" />
      </svg>
    ),
    MLOps: (
      <svg className="w-6 h-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    'Node.js': (
      <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L4 7.5v9L12 21l8-4.5v-9L12 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l4 2.5v3L12 16l-4-2.5v-3L12 8z" />
      </svg>
    ),
    ExpressJS: (
      <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h5m-5 4h8" />
      </svg>
    ),
    NestJS: (
      <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6m-6 4h4" />
      </svg>
    ),
    MongoDB: (
      <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c0 0-5 4-5 8.5S9.5 19 12 22c2.5-3 5-7 5-11.5S12 2 12 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10" />
      </svg>
    ),
    PostgreSQL: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <ellipse cx="12" cy="13" rx="5" ry="7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-3 0-5 2-5 5s2 4 5 4m0-8c3 0 5 1.5 5 4s-2 3.5-5 4" />
      </svg>
    ),
    MySQL: (
      <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <ellipse cx="12" cy="7" rx="6" ry="3" />
        <path d="M6 7v6c0 1.66 2.7 3 6 3s6-1.34 6-3V7" />
        <path d="M6 13v6c0 1.66 2.7 3 6 3s6-1.34 6-3v-6" />
      </svg>
    ),
    Python: (
      <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.5 2 6 3 6 5.5v2h6v1h-8C2.5 8.5 2 9 2 11.5v3c0 2.5 1.5 3.5 4 3.5h1.5v-2c0-1.5 1-2.5 2.5-2.5h4c1.5 0 2.5-1 2.5-2.5V8c0-2.5-1-6-6.5-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.5 0 6-1 6-3.5v-2h-6v-1h8c1.5 0 2-.5 2-3v-3c0-2.5-1.5-3.5-4-3.5h-1.5v2c0 1.5-1 2.5-2.5 2.5h-4c-1.5 0-2.5 1-2.5 2.5v3.5c0 2.5 1 6 6.5 6z" />
      </svg>
    ),
    JavaScript: (
      <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 15c.5.5 1.5.5 2 0s.5-1.5 0-2-1.5-.5-2-1 .5-1.5 1-2 1.5 0 2 .5m-8 3.5h2v-4.5m-2 0h4" />
      </svg>
    ),
    Java: (
      <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18c0 1.5 2.5 2.5 6 2.5s6-1 6-2.5M4 14.5c0 1.5 3 2.5 8 2.5s8-1 8-2.5m-15-4c0 1.5 3.5 2 7.5 2s7.5-.5 7.5-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c0 2-2 3-2 5s3 3 2 5m4-10c0 2-2 3-2 5s3 3 2 5" />
      </svg>
    ),
    'C++': (
      <svg className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h4m-2-2v4m5-2h4m-2-2v4" />
      </svg>
    ),
    React: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.5" className="fill-current text-cyan-400" />
      </svg>
    ),
    'Next.js': (
      <svg className="w-6 h-6 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 16V8l7 8V8" />
      </svg>
    ),
    'React Native': (
      <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M9 6h6" />
        <ellipse cx="12" cy="11" rx="4" ry="1.5" transform="rotate(30 12 11)" />
        <ellipse cx="12" cy="11" rx="4" ry="1.5" transform="rotate(150 12 11)" />
      </svg>
    ),
    'Tailwind CSS': (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-3.333 0-5.333 1.667-6 5 1.333-2 2.667-2.333 4-1 1 1 2 2.333 4 3 2.667.667 4.667-.667 6-4-1.333 2-2.667 2.333-4 1zm-6 7c-3.333 0-5.333 1.667-6 5 1.333-2 2.667-2.333 4-1 1 1 2 2.333 4 3 2.667.667 4.667-.667 6-4-1.333 2-2.667 2.333-4 1z" />
      </svg>
    ),
  };

  return (
    <section id="skills" className="py-24 bg-background-secondary/30 border-y border-zinc-200/20 dark:border-zinc-800/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
            Technical Skills
          </h2>
          <p className="text-zinc-650 dark:text-zinc-400 mt-4 text-sm sm:text-base animate-fade-in">
            A verified directory of technologies, libraries, and automated tooling I work with.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-background/80 dark:bg-zinc-950/40 border border-zinc-200/30 dark:border-zinc-900/30 rounded-3xl p-6 sm:p-8 flex flex-col h-full shadow-xs"
            >
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-200/30 dark:border-zinc-900/30 pb-4 mb-6 uppercase tracking-wider text-xs">
                {category.title}
              </h3>

              {/* Skills Grid - 2 columns inside each category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.skills.map((skill, sIndex) => (
                  <div
                    key={sIndex}
                    className="flex items-center gap-3 bg-background/50 dark:bg-zinc-900/10 border border-zinc-200/40 dark:border-zinc-800/40 rounded-2xl p-3.5 hover:scale-[1.02] hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:shadow-xs transition-all duration-300 group"
                  >
                    {/* SVG Icon on Left */}
                    <div className="flex-shrink-0 text-zinc-500 dark:text-zinc-450 group-hover:scale-110 transition-transform duration-300">
                      {skillIcons[skill.name] || <span className="text-xl">🛠️</span>}
                    </div>
                    {/* Skill Name on Right */}
                    <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate select-none">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
