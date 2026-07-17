'use client';

import { useState } from 'react';
import Image from "next/image";

// Sub-component to handle image loading state and fallback robustly
function CompanyLogo({ src, alt, fallbackText }) {
  const [hasError, setHasError] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_IS_STATIC_EXPORT === 'true' ? '/portfolio' : '';

  if (src && !hasError) {
    return (
      <Image
        src={`${basePath}${src}`}
        alt={alt}
        fill
        className="object-contain p-1.5"
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 select-none">
      {fallbackText}
    </span>
  );
}

export default function Experience() {
  const experiences = [
    {
      role: "DevOps Intern",
      company: "SLT-MOBITEL PLC",
      companyLogo: "/experience/slt.webp", // Lowercase extension matches public folder webp format exactly
      logo: (
        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      ),
      period: "June 2026 – December 2026 (6 Months)",
      bullets: [
        "Automated software deployment pipelines using Jenkins and GitHub Actions webhooks.",
        "Containerized core microservices with Docker to maintain clean, reproducible application environments.",
        "Collaborated on provisioning cloud infrastructure nodes and monitoring routes.",
        "Assisted in monitoring network telemetry and system logs for telecommunications applications to optimize uptime."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
            Professional Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
            Work Experience
          </h2>
          <p className="text-zinc-650 dark:text-zinc-400 mt-4 text-sm sm:text-base">
            My career timeline in systems automation and software engineering.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-zinc-200/50 dark:border-zinc-800/60 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              
              {/* Timeline dot marker node */}
              <span className="absolute -left-[53px] sm:-left-[69px] top-3 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-md group-hover:scale-110 group-hover:border-indigo-500/50 dark:group-hover:border-indigo-400/50 transition-all duration-300">
                {exp.logo}
              </span>

              {/* Card content */}
              <div className="bg-background-secondary/35 border border-zinc-200/40 dark:border-zinc-800/30 rounded-3xl p-6 sm:p-8 hover:scale-[1.01] hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:shadow-xs transition-all duration-300">
                
                {/* Card Header with Company Logo */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200/30 dark:border-zinc-800/30 pb-5 mb-6">
                  <div className="flex items-center gap-4">
                    {/* Logo Wrapper Container */}
                    <div className="w-12 h-12 rounded-xl bg-background dark:bg-zinc-900 border border-zinc-200/45 dark:border-zinc-800/45 flex items-center justify-center relative overflow-hidden flex-shrink-0 shadow-xs">
                      <CompanyLogo 
                        src={exp.companyLogo}
                        alt={`${exp.company} Logo`}
                        fallbackText={exp.company.charAt(0)}
                      />
                    </div>
                    
                    {/* Role & Company info */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-indigo-650 dark:text-indigo-400 mt-0.5">
                        {exp.company}
                      </div>
                    </div>
                  </div>
                  
                  {/* Period tag */}
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800/40 px-3 py-1.5 rounded-full border border-zinc-200/20 dark:border-zinc-800/20 self-start md:self-center">
                    {exp.period}
                  </span>
                </div>

                {/* Job responsibilities list */}
                <ul className="space-y-3">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-3 text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                      <span className="text-indigo-500 dark:text-indigo-400 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
