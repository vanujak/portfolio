export default function Projects() {
  const projects = [
    {
      title: 'EasyCase',
      description: 'A full-stack case management system featuring legal workflows and client data management. Fully containerized with Docker, automated via a Jenkins CI/CD pipeline, and provisioned with Terraform & Ansible.',
      tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Docker', 'Terraform', 'Ansible', 'Jenkins'],
      link: '#',
      github: 'https://github.com/vanujak',
    },
    {
      title: 'ScaleLab',
      description: 'A distributed systems simulation platform for designing custom system topologies, executing traffic simulations, and rendering WebSocket-based real-time system monitoring metrics.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'NestJS', 'WebSockets', 'JWT/OAuth'],
      link: '#',
      github: 'https://github.com/vanujak',
    },
    {
      title: 'SayIDo',
      description: 'A mobile wedding directory application enabling vendors to manage profiles, bookings, and reservations. Features robust JWT/GraphQL authentication and a real-time chat interface.',
      tags: ['React Native', 'Expo', 'TypeScript', 'GraphQL', 'WebSockets'],
      link: '#',
      github: 'https://github.com/vanujak',
    },
  ];

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
            My Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
            Featured Projects
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4">
            A selection of my recent works. Each project represents different engineering challenges and how they were solved.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col h-full bg-background-secondary border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card visual header */}
              <div className="h-44 w-full bg-background dark:bg-zinc-900/50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                {/* Decorative coding icon */}
                <svg
                  className="w-12 h-12 text-indigo-500/60 dark:text-indigo-400/40 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {/* Visual glow on hover */}
                <div className="absolute inset-0 bg-indigo-500/5 dark:bg-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/80 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-zinc-200/50 dark:border-zinc-800/50 pt-4 mt-auto">
                <a
                  href={project.link}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:opacity-85 transition-opacity"
                >
                  Live Demo
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <a
                  href={project.github}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  GitHub
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
