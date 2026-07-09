'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState(null); // 'privacy' or 'terms'

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  return (
    <>
      <footer className="bg-background-secondary/30 backdrop-blur-[2px] border-t border-zinc-200/20 dark:border-zinc-800/20 py-12 relative z-30">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Portfolio<span className="text-indigo-600 dark:text-indigo-400">.</span>
          </span>
        </div>

        {/* Copyright & Last Updated */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-xs text-zinc-550 dark:text-zinc-500 text-center md:text-left">
            &copy; {currentYear} Portfolio. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-650 font-medium">
            Last updated: July 9, 2026
          </p>
        </div>

        {/* Privacy & Terms Toggles */}
        <div className="flex gap-6">
          <button
            onClick={() => setActiveModal('privacy')}
            className="text-xs text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors cursor-pointer focus:outline-none"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveModal('terms')}
            className="text-xs text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors cursor-pointer focus:outline-none"
          >
            Terms of Use
          </button>
        </div>
      </div>
    </footer>

    {/* Interactive Modal Overlay */}
    {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          {/* Modal overlay dismiss */}
          <div className="absolute inset-0" onClick={() => setActiveModal(null)} />

          {/* Modal box */}
          <div className="relative z-10 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl flex flex-col h-full max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-900 pb-4 mb-5 flex-shrink-0">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer focus:outline-none"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-1 text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed custom-scrollbar select-text">
              {activeModal === 'privacy' ? (
                <>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Effective Date: July 9, 2026
                  </p>
                  <p>
                    This portfolio website is a static showcase constructed using Next.js, styled with Tailwind CSS, and hosted via GitHub Pages. I am committed to protecting your online privacy.
                  </p>
                  
                  <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mt-4">
                    1. No Collection of Personal Data
                  </h4>
                  <p>
                    This website does not collect, record, track, store, or share any personal identifying information or data of its visitors. There are no cookies, marketing tags, or tracking pixels loaded.
                  </p>

                  <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mt-4">
                    2. Third-Party Integrations
                  </h4>
                  <p>
                    This site communicates client-side with public APIs (specifically GitHub and LeetCode) to retrieve coding and contribution statistics. These requests are anonymous and do not transmit or save personal details.
                  </p>

                  <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mt-4">
                    3. External Link Routing
                  </h4>
                  <p>
                    I provide outbound links to third-party services (such as GitHub, LinkedIn, and Telegram). Please note that once you leave this site, you are bound by the privacy policies and statements of those respective platforms.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Last Updated: July 9, 2026
                  </p>
                  <p>
                    By accessing and exploring this portfolio, you agree to comply with and be bound by the following terms and guidelines.
                  </p>
                  
                  <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mt-4">
                    1. Code & Intellectual Property License
                  </h4>
                  <p>
                    The codebase for this portfolio is open-source under the MIT License. You are permitted to reference the code, clone the repository, or use sections of the layout for building your own personal website.
                  </p>

                  <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mt-4">
                    2. Accuracy of Credentials
                  </h4>
                  <p>
                    All technical skills, academic details, projects, and certifications shown on this site represent my authentic professional accomplishments, projects, and coursework history.
                  </p>

                  <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mt-4">
                    3. Limitation of Liability
                  </h4>
                  <p>
                    This website is provided for informational and showcase purposes on an "as-is" basis, without any warranties or guarantees of uptime or software consistency.
                  </p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-zinc-150 dark:border-zinc-900 pt-4 mt-5 flex justify-end flex-shrink-0">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-sm transition-colors cursor-pointer focus:outline-none"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
