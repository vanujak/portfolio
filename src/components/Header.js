'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [theme, setTheme] = useState('light');
  const lastScrollY = useRef(0);
  const scrollIdleTimer = useRef(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY.current;

          setScrolled(currentScrollY > 20);

          if (currentScrollY <= 20) {
            setIsShrunk(false);
          } else if (Math.abs(delta) > 2) {
            if (delta > 0) {
              setIsShrunk(true);
            } else if (delta < -12) {
              setIsShrunk(false);
            }
          }

          lastScrollY.current = currentScrollY;
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
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certificates' },
    { name: 'Activity', href: '#coding-stats' },
    { name: 'Skills', href: '#skills' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 md:bg-transparent md:dark:bg-transparent md:border-transparent md:dark:border-transparent md:backdrop-blur-none md:shadow-none md:pointer-events-none md:px-6 md:py-0 md:pt-4 ${
        scrolled || isOpen
          ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-zinc-200/70 dark:border-zinc-800/70 shadow-xs py-4'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex justify-between items-center md:pointer-events-auto md:w-fit md:max-w-fit md:rounded-full md:border md:backdrop-blur-2xl md:backdrop-saturate-150 md:origin-top md:will-change-transform md:transition-all md:duration-[650ms] md:ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isShrunk
            ? 'md:px-4.5 md:py-1.5 md:gap-5 md:scale-[0.92] md:-translate-y-1.5 md:bg-white/85 md:dark:bg-zinc-900/85 md:border-zinc-200/90 md:dark:border-zinc-800/90 md:shadow-[0_4px_20px_rgb(0,0,0,0.08)] md:dark:shadow-[0_4px_20px_rgb(0,0,0,0.45)]'
            : 'md:px-6 md:py-2.5 md:gap-10 md:scale-100 md:translate-y-0 md:bg-white/75 md:dark:bg-zinc-900/75 md:border-zinc-200/80 md:dark:border-zinc-800/80 md:shadow-[0_8px_30px_rgb(0,0,0,0.06)] md:dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)]'
        }`}
      >
        {/* Logo */}
        <Link
          href="#"
          className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:opacity-80 transition-opacity"
        >
          Portfolio<span className="text-indigo-600 dark:text-indigo-400">.</span>
        </Link>

        {/* Right Actions (Nav + Theme Toggle + Mobile Menu) */}
        <div
          className={`flex items-center gap-3 md:transition-all md:duration-[650ms] md:ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isShrunk ? 'md:gap-1.5' : 'md:gap-2.5'
          }`}
        >
          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center md:transition-all md:duration-[650ms] md:ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isShrunk ? 'md:gap-4 md:mr-0.5' : 'md:gap-6 md:mr-1'
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
              className={`text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 px-4 py-2 rounded-xl md:rounded-full whitespace-nowrap transition-colors duration-200 md:transition-all md:duration-[650ms] md:ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xs ${
                isShrunk ? 'md:px-3.5 md:py-1.5' : 'md:px-4 md:py-2'
              }`}
            >
              Get in Touch
            </a>
          </nav>

          {/* Single-Click Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl md:rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors duration-200 md:transition-all md:duration-[650ms] md:ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xs cursor-pointer flex items-center justify-center ${
              isShrunk ? 'md:p-1.5' : 'md:p-2'
            }`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg className="w-4.5 h-4.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m10.607 10.607l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-6 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'opacity-100 translate-y-0 py-6 h-[calc(100vh-64px)] pointer-events-auto visible' 
            : 'opacity-0 -translate-y-2 py-0 h-0 pointer-events-none invisible'
        }`}
      >
        <div className="flex flex-col gap-4 py-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-zinc-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1.5"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 px-4 py-2.5 rounded-xl text-center transition-colors duration-200 shadow-xs mt-2"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  );
}
