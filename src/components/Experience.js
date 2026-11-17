'use client';

import { useState } from 'react';
import Image from "next/image";

// Sub-component to handle image loading state and fallback robustly
function CompanyLogo({ src, alt, fallbackText }) {
  const [hasError, setHasError] = useState(false);

  if (src && !hasError) {
    return (
      <Image
        src={src}
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
        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
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
    <section id="experience" className="py-10 sm:py-14 lg:py-16 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
            Professional Journey
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-1.5">
            Work Experience
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base">
            My career timeline in systems automation and software engineering.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative sm:border-l border-zinc-200/50 dark:border-zinc-800/60 sm:ml-8 sm:pl-12 space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              
              {/* Timeline dot marker node (visible on sm+ so mobile gets full card width) */}
              <span className="hidden sm:flex absolute -left-[69px] top-3 items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xs group-hover:border-indigo-500/50 dark:group-hover:border-indigo-400/50 transition-colors duration-200">
                {exp.logo}
              </span>

              {/* Card content */}
              <div className="bg-background-secondary/50 border border-zinc-200/70 dark:border-zinc-800/70 rounded-2xl p-4 sm:p-6 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-colors duration-200">
                
                {/* Card Header with Company Logo */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-3.5 sm:pb-4 mb-3.5 sm:mb-4">
                  <div className="flex items-center gap-4">
                    {/* Logo Wrapper Container */}
                    <div className="w-12 h-12 rounded-xl bg-background dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-center relative overflow-hidden flex-shrink-0 shadow-xs">
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
                      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {exp.company}
                      </div>
                    </div>
                  </div>
                  
                  {/* Period tag */}
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 self-start md:self-center">
                    {exp.period}
                  </span>
                </div>

                {/* Job responsibilities list */}
                <ul className="space-y-2.5 sm:space-y-3">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
