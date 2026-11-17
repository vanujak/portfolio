'use client';

import { useState, useEffect, useRef } from "react";

const INITIAL_HISTORY = [
  { text: "vanuja@devops-node:~$ whoami", type: "command" },
  { type: "banner" },
  {
    text: "Type 'help' or click a command below to explore.",
    type: "info",
  },
];

const QUICK_COMMANDS = [
  "help",
  "whoami",
  "about",
  "skills",
  "projects",
  "contact",
  "secret",
  "clear",
];

export default function Hero() {
  const inputRef = useRef(null);
  const logsRef = useRef(null);
  const isInitialMount = useRef(true);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [commandHistory, setCommandHistory] = useState(["whoami"]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Auto-focus terminal input on desktop load without scrolling the page
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, []);

  // Auto-scroll ONLY the terminal log container when new commands are added
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let reply = "";
    let customEntry = null;

    if (cleanCmd === "help") {
      reply =
        "Available commands:\n" +
        "  [whoami]   - Display profile & system summary banner\n" +
        "  [about]    - Detailed background & academic journey\n" +
        "  [skills]   - DevOps, Cloud, and Backend tech stack\n" +
        "  [projects] - Featured engineering projects\n" +
        "  [contact]  - Direct communication channels\n" +
        "  [secret]   - Fun trivia!\n" +
        "  [clear]    - Clear terminal screen";
    } else if (cleanCmd === "whoami" || cleanCmd === "whoami --summary" || cleanCmd === "banner") {
      customEntry = { type: "banner" };
    } else if (cleanCmd === "about") {
      reply =
        "Vanuja Karunaratne\n" +
        "Computer Engineering undergraduate at the University of Ruhuna, Galle.\n" +
        "Passionate about DevOps, automated cloud infrastructure, CI/CD, and MLOps pipelines—focusing on streamlining software delivery from commit to production.";
    } else if (cleanCmd === "skills") {
      reply =
        "DevOps & IaC : Docker, Jenkins, GitHub Actions, Terraform, Ansible, AWS, MLOps\n" +
        "Backend      : Node.js, ExpressJS, NestJS, MongoDB, PostgreSQL, MySQL\n" +
        "Languages    : Java, C++, Python, JavaScript, TypeScript, Tailwind CSS";
    } else if (cleanCmd === "projects") {
      reply =
        "1. EasyCase - Case Management Portal (MERN, Docker, Jenkins, Terraform/Ansible)\n" +
        "2. ScaleLab - Distributed System Simulator (Next.js, NestJS, WebSockets)\n" +
        "3. SayIDo   - Mobile Vendor Directory (React Native, Expo, GraphQL)";
    } else if (cleanCmd === "contact") {
      reply =
        "Email    : vanujakofficial@gmail.com\n" +
        "Telegram : t.me/vanujak (@vanujak)\n" +
        "Discord  : vanujak";
    } else if (cleanCmd === "secret") {
      reply =
        "Law & Code: Did you know? Vanuja is also studying Law! He is on hold at Sri Lanka Law College, balancing software architectures with legal frameworks.";
    } else if (cleanCmd === "clear") {
      setHistory([]);
      setInput("");
      setHistoryIndex(-1);
      return;
    } else if (cleanCmd === "") {
      reply = "";
    } else {
      reply = `Command not found: '${cmd}'. Type 'help' or click a command chip below.`;
    }

    setHistory((prev) => [
      ...prev,
      { text: `vanuja@devops-node:~$ ${cmd}`, type: "command" },
      ...(customEntry ? [customEntry] : []),
      ...(reply ? [{ text: reply, type: "output" }] : []),
    ]);

    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd]);
    }
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <section className="relative flex items-center justify-center pt-22 pb-10 sm:pt-28 sm:pb-14 lg:pt-28 lg:pb-16 overflow-hidden isolate">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* =========================================================
            MOBILE & TABLET VIEW (< 1024px): Clean Typographic Hero
           ========================================================= */}
        <div className="flex lg:hidden flex-col items-center text-center">
          {/* Role / Status Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Cloud, DevOps &amp; MLOps Engineering
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3.5 sm:mb-4 leading-tight text-balance">
            Building Reliable
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              Cloud &amp; DevOps Solutions
            </span>
          </h1>

          {/* Subtitle / Bio */}
          <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mb-4 sm:mb-5 leading-relaxed text-pretty">
            Hi, I&apos;m Vanuja Karunaratne, a Computer Engineering undergraduate at
            the University of Ruhuna. I am passionate about DevOps, automated
            cloud infrastructure, and MLOps, focusing on streamlining software
            delivery.
          </p>

          {/* Compact Terminal-Styled Tech Stack Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] sm:text-xs text-zinc-300 max-w-full overflow-x-auto shadow-xs">
            <span className="text-emerald-400 font-bold shrink-0">$</span>
            <span className="truncate">
              Docker • Terraform • Jenkins • Ansible • AWS • MLOps
            </span>
          </div>
        </div>

        {/* =========================================================
            DESKTOP VIEW (>= 1024px): Centered Command-Center Terminal
           ========================================================= */}
        <div className="hidden lg:flex flex-col items-center w-full">
          <div className="w-full relative">
            {/* Subtle Ambient Glow Behind Terminal */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-zinc-500/5 to-emerald-500/10 blur-xl -z-10 pointer-events-none" />

            {/* Terminal Window */}
            <div
              onClick={focusInput}
              className="w-full h-[530px] rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-2xl flex flex-col overflow-hidden text-left font-mono text-sm text-zinc-300 select-none cursor-text relative"
            >
              {/* Terminal Window Header Bar */}
              <div className="h-10 w-full bg-zinc-900/95 border-b border-zinc-800 px-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs text-zinc-400 font-medium">
                    bash — vanuja@devops-node: ~
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SSH Connected
                </div>
              </div>

              {/* Terminal Logs Scrollable Area */}
              <div
                ref={logsRef}
                className="flex-grow p-6 overflow-y-auto space-y-3 select-text custom-scrollbar"
              >
                {history.map((log, idx) => {
                  if (log.type === "banner") {
                    return (
                      <div
                        key={idx}
                        className="py-1 pl-3 border-l-2 border-emerald-500/60 space-y-2 max-w-3xl"
                      >
                        <div className="text-lg sm:text-xl font-bold text-zinc-50 tracking-tight">
                          Building Reliable{" "}
                          <span className="text-emerald-400">
                            Cloud &amp; DevOps Solutions
                          </span>
                        </div>

                        <p className="text-sm text-zinc-300 leading-relaxed">
                          Hi, I&apos;m Vanuja Karunaratne, a Computer Engineering
                          undergraduate at the University of Ruhuna. I am
                          passionate about DevOps, automated cloud
                          infrastructure, and MLOps, focusing on streamlining
                          software delivery.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className={`whitespace-pre-wrap leading-relaxed ${
                        log.type === "info"
                          ? "text-zinc-400 font-medium text-xs"
                          : log.type === "command"
                          ? "text-emerald-400 font-bold"
                          : "text-zinc-100"
                      }`}
                    >
                      {log.text}
                    </div>
                  );
                })}
              </div>

              {/* Interactive Quick-Command Chips Bar */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center gap-1.5 flex-wrap flex-shrink-0"
              >
                <span className="text-[11px] text-zinc-500 mr-1 select-none">
                  Quick run:
                </span>
                {QUICK_COMMANDS.map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => {
                      handleCommand(cmd);
                      focusInput();
                    }}
                    className="px-2 py-0.5 rounded-md text-xs font-mono bg-zinc-900 hover:bg-emerald-950/60 text-zinc-200 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/40 transition-colors cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Terminal Prompt Input Line */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand(input);
                }}
                className="h-11 w-full bg-zinc-950 border-t border-zinc-800/80 px-4 flex items-center gap-2 flex-shrink-0"
              >
                <span className="text-emerald-400 font-bold flex-shrink-0 select-none">
                  vanuja@devops-node:~$
                </span>
                <div className="relative flex-grow flex items-center">
                  {input.length === 0 && (
                    <span
                      className="w-2 h-4 bg-emerald-400 animate-pulse mr-2 flex-shrink-0 pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="type a command (e.g. 'help', 'projects', 'skills')..."
                    className={`w-full bg-transparent text-zinc-50 placeholder:text-zinc-600 focus:outline-none border-none selection:bg-emerald-500/30 ${
                      input.length === 0 ? "caret-transparent" : "caret-emerald-400"
                    }`}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
