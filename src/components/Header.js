'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [theme, setTheme] = useState('light');
  const lastScrollY = useRef(0);
  const scrollIdleTimer = useRef(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY || document.documentElement.scrollTop || 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0;
          const delta = currentScrollY - lastScrollY.current;

          if (currentScrollY <= 20) {
            setIsShrunk(false);
            lastScrollY.current = currentScrollY;
          } else if (delta > 3) {
            setIsShrunk(true);
            lastScrollY.current = currentScrollY;
          } else if (delta < -10) {
            setIsShrunk(false);
            lastScrollY.current = currentScrollY;
          }

          ticking = false;
        });
        ticking = true;
      }

      if (scrollIdleTimer.current) {
        clearTimeout(scrollIdleTimer.current);
      }
      // Wait a short moment after scrolling completely stops before smoothly expanding back
      scrollIdleTimer.current = setTimeout(() => {
        setIsShrunk(false);
      }, 550);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollIdleTimer.current) {
        clearTimeout(scrollIdleTimer.current);
      }
    };
  }, []);

  // Initialize theme on mount (saved preference or OS default)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme class dynamically
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const navLinks = [
    {
      name: 'About',
      href: '#about',
      icon: (
        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      name: 'Experience',
      href: '#experience',
      icon: (
        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      ),
    },
    {
      name: 'Projects',
      href: '#projects',
      icon: (
        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
    },
    {
      name: 'Certifications',
      href: '#certificates',
      icon: (
        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
    },
    {
      name: 'Activity',
      href: '#coding-stats',
      icon: (
        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      name: 'Skills',
      href: '#skills',
      icon: (
        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
        </svg>
      ),
    },
  ];

  const shrinkActive = isShrunk && !isOpen;

  return (
    <>
      {/* Subtle tap-outside backdrop when mobile bento menu is open */}
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-zinc-950/20 dark:bg-zinc-950/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 md:pt-4 pointer-events-none">
        {/* Top Floating Pill (Mobile + Desktop) */}
        <div
          className={`pointer-events-auto max-w-md md:w-fit md:max-w-fit mx-auto flex justify-between items-center rounded-full border backdrop-blur-2xl backdrop-saturate-150 origin-top will-change-transform transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            shrinkActive
              ? 'px-4 py-1.5 md:px-4.5 md:py-1.5 md:gap-5 scale-[0.93] md:scale-[0.92] -translate-y-1 md:-translate-y-1.5 bg-white/85 dark:bg-zinc-900/85 border-zinc-200/90 dark:border-zinc-800/90 shadow-[0_4px_20px_rgb(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.45)]'
              : 'px-4.5 py-2 md:px-6 md:py-2.5 md:gap-10 scale-100 translate-y-0 bg-white/75 dark:bg-zinc-900/75 border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)]'
          }`}
        >
          {/* Logo */}
          <Link
            href="#"
            onClick={() => setIsOpen(false)}
            className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:opacity-80 transition-opacity pl-1 md:pl-0"
          >
            Portfolio<span className="text-indigo-600 dark:text-indigo-400">.</span>
          </Link>

          {/* Right Actions (Nav + Theme Toggle + Mobile Menu) */}
          <div
            className={`flex items-center gap-2 transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              shrinkActive ? 'md:gap-1.5' : 'md:gap-2.5'
            }`}
          >
            {/* Desktop Navigation */}
            <nav
              className={`hidden md:flex items-center transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                shrinkActive ? 'md:gap-4 md:mr-0.5' : 'md:gap-6 md:mr-1'
              }`}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className={`text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 rounded-full whitespace-nowrap transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xs ${
                  shrinkActive ? 'px-3.5 py-1.5' : 'px-4 py-2'
                }`}
              >
                Get in Touch
              </a>
            </nav>

            {/* Single-Click Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/70 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-700/60 transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xs cursor-pointer flex items-center justify-center ${
                shrinkActive ? 'p-1.5' : 'p-2'
              }`}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4 md:w-4.5 md:h-4.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m10.607 10.607l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 md:w-4.5 md:h-4.5 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Trigger Button (Circular inside Pill) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden rounded-full border transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer flex items-center justify-center ${
                isOpen
                  ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-50 p-2'
                  : `border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/70 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200/70 dark:hover:bg-zinc-700/60 ${
                      shrinkActive ? 'p-1.5' : 'p-2'
                    }`
              }`}
              aria-label="Toggle menu"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Floating Bento Glass Card */}
        <div
          className={`md:hidden max-w-md mx-auto mt-2.5 rounded-3xl bg-white/85 dark:bg-zinc-900/85 backdrop-blur-2xl backdrop-saturate-150 border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_20px_50px_rgb(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgb(0,0,0,0.6)] p-3.5 origin-top transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto visible'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none invisible'
          }`}
        >
          {/* 2x3 Bento Grid for Sections */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-zinc-100/75 dark:bg-zinc-800/50 hover:bg-indigo-50/90 dark:hover:bg-indigo-950/40 border border-zinc-200/60 dark:border-zinc-800/70 hover:border-indigo-300/60 dark:hover:border-indigo-700/50 transition-all active:scale-[0.98]"
              >
                <span className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-700/60 flex items-center justify-center shrink-0 shadow-2xs">
                  {link.icon}
                </span>
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          {/* Bottom Full-Width CTA Pill inside Bento Card */}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-2.5 w-full py-2.5 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
          >
            <span>Get in Touch</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </header>
    </>
  );
}
