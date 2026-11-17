'use client';

import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const inputRef = useRef(null);
  const logsRef = useRef(null);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { text: "Welcome to Vanuja's interactive terminal v1.0.0!", type: "info" },
    { text: "System connection established: secure SSH shell.", type: "info" },
    { text: "Type 'help' to see all available commands.", type: "info" }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Auto-scroll ONLY the terminal log container (prevents hijacking/disabling main page scroll)
  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let reply = "";

    if (cleanCmd === "help") {
      reply = "Available commands:\n  [about]    - Brief introduction\n  [skills]   - Technical stack\n  [projects] - Recent software projects\n  [contact]  - Secure contact details\n  [clear]    - Clear output screen\n  [secret]   - Fun trivia!";
    } else if (cleanCmd === "about") {
      reply = "Vanuja Karunaratne\nComputer Engineering undergraduate at University of Ruhuna, Galle.\nPassionate about cloud orchestration, infrastructure automation, CI/CD, and MLOps pipelines.";
    } else if (cleanCmd === "skills") {
      reply = "DevOps/IaC:  Docker, Jenkins, Terraform, Ansible, AWS, MLOps\nBackend:     Node.js, ExpressJS, NestJS, MongoDB, PostgreSQL, MySQL\nLanguages:   Java, C++, Python, JavaScript, Tailwind CSS";
    } else if (cleanCmd === "projects") {
      reply = "1. EasyCase - Case Management Portal (MERN, Docker, Jenkins)\n2. ScaleLab - Distributed simulator (Next.js, NestJS, WebSockets)\n3. SayIDo   - Mobile Directory (React Native, GraphQL)";
    } else if (cleanCmd === "contact") {
      reply = "Email:    vanujakofficial@gmail.com\nTelegram: t.me/vanujak (@vanujak)\nDiscord:  vanujak";
    } else if (cleanCmd === "secret") {
      reply = "Law & Code: Did you know? Vanuja is also studying Law! He is on hold at Sri Lanka Law College, balancing software architectures with legal frameworks.";
    } else if (cleanCmd === "clear") {
      setHistory([]);
      setInput("");
      setHistoryIndex(-1);
      return;
    } else if (cleanCmd === "") {
      reply = "";
    } else {
      reply = `Command not found: '${cmd}'. Type 'help' for the list of available commands.`;
    }

    setHistory((prev) => [
      ...prev,
      { text: `vanuja@devops-node:~$ ${cmd}`, type: "command" },
      ...(reply ? [{ text: reply, type: "output" }] : [])
    ]);

    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd]);
    }
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
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
    inputRef.current?.focus();
  };

  return (
    <section className="relative flex items-center justify-center pt-22 pb-10 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-20 overflow-hidden isolate">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3 sm:mb-4 leading-tight">
              Building Reliable<br />
              <span className="text-indigo-600 dark:text-indigo-400">
                Cloud & DevOps Solutions
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mb-5 sm:mb-6 leading-relaxed">
              Hi, I'm Vanuja Karunaratne, a Computer Engineering undergraduate at the University of Ruhuna. 
              I am passionate about DevOps, automated cloud infrastructure, and MLOps, focusing on streamlining software delivery.
            </p>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="col-span-2 sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xs transition-colors duration-200"
              >
                Explore Projects
              </a>
              <a
                href="/Vanuja_Karunaratne_CV.pdf"
                download="Vanuja_Karunaratne_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-xl text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/60 hover:bg-indigo-100/60 dark:hover:bg-indigo-950/50 transition-colors duration-200 cursor-pointer"
              >
                Download CV
                <svg
                  className="w-4 h-4 shrink-0"
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
                className="col-span-1 sm:w-auto inline-flex items-center justify-center px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-xl text-sm sm:text-base font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors duration-200"
              >
                Let's Talk
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Widget */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto">
            <div 
              onClick={focusInput}
              className="w-full h-64 sm:h-80 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-lg flex flex-col overflow-hidden text-left font-mono text-xs sm:text-sm text-zinc-300 select-none cursor-text relative group"
            >
              {/* Terminal Window Header Bar */}
              <div className="h-9 w-full bg-zinc-900 border-b border-zinc-800 px-4 flex items-center justify-between flex-shrink-0">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-zinc-400 select-none">
                  vanuja@devops-node: ~
                </span>
                <span className="w-12" /> {/* Symmetrical spacer */}
              </div>

              {/* Terminal Logs Scrollable Area */}
              <div 
                ref={logsRef}
                className="flex-grow p-3.5 sm:p-4 overflow-y-auto space-y-2 select-text custom-scrollbar"
              >
                {history.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={`whitespace-pre-wrap leading-relaxed ${
                      log.type === "info" ? "text-indigo-400 dark:text-indigo-300 font-semibold" : 
                      log.type === "command" ? "text-emerald-500 font-bold" : "text-zinc-200"
                    }`}
                  >
                    {log.text}
                  </div>
                ))}
              </div>

              {/* Terminal Prompt Input Line */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleCommand(input); }}
                className="h-10 w-full bg-zinc-950 border-t border-zinc-800/80 px-3.5 sm:px-4 flex items-center gap-1.5 flex-shrink-0"
              >
                <span className="text-emerald-500 font-bold flex-shrink-0 select-none">
                  vanuja@devops-node:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type 'help'..."
                  className="flex-grow bg-transparent text-zinc-50 placeholder:text-zinc-600 focus:outline-none border-none caret-indigo-500 selection:bg-indigo-500/30"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
