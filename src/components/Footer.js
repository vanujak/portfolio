import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary/30 backdrop-blur-[2px] border-t border-zinc-200/20 dark:border-zinc-800/20 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Portfolio<span className="text-indigo-600 dark:text-indigo-400">.</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center md:text-left">
          &copy; {currentYear} Portfolio. All rights reserved. Built with Next.js and Tailwind CSS.
        </p>

        {/* Extra Navigation or Links */}
        <div className="flex gap-6">
          <Link
            href="#"
            className="text-xs text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-xs text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
