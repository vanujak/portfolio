export default function About() {
  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Completed' },
    { value: '99%', label: 'Client Satisfaction' },
    { value: '10+', label: 'Tools Mastered' },
  ];

  return (
    <section id="about" className="py-24 bg-zinc-50 dark:bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2 mb-6">
              Passionate about building software that solves real-world problems.
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                I am a full-stack software engineer with a strong foundation in modern Javascript frameworks, 
                serverless architectures, and responsive design patterns. I love turning complex problems 
                into simple, beautiful, and intuitive designs.
              </p>
              <p>
                My journey began with design and quickly moved to frontend development, where I fell in love with 
                making components interactive and fast. Today, I build full-stack solutions, specializing in 
                React, Next.js, Node.js, and modern CSS solutions like Tailwind.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Card Detail */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl p-8 shadow-xl flex flex-col justify-between text-white overflow-hidden group">
              {/* Overlay grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,#000_60%,transparent_100%)]" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-xl mb-6">
                  {"</>"}
                </div>
                <h3 className="text-2xl font-bold leading-snug">
                  Always learning,<br />always building.
                </h3>
              </div>

              <div className="relative z-10 mt-auto">
                <span className="text-xs font-semibold tracking-wider uppercase text-indigo-100">
                  Current Focus
                </span>
                <p className="text-sm font-medium mt-1">
                  AI Integration & Performance Optimization
                </p>
              </div>

              {/* Decorative light effect */}
              <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
