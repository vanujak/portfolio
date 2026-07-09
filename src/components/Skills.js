export default function Skills() {
  const skillCategories = [
    {
      title: 'DevOps, Cloud & MLOps',
      skills: [
        { name: 'Docker', level: 'Advanced' },
        { name: 'Jenkins', level: 'Advanced' },
        { name: 'GitHub Actions', level: 'Advanced' },
        { name: 'Terraform', level: 'Advanced' },
        { name: 'Ansible', level: 'Advanced' },
        { name: 'AWS', level: 'Intermediate' },
        { name: 'MLOps (Pipelines & Monitoring)', level: 'Learning' },
      ],
    },
    {
      title: 'Backend & Databases',
      skills: [
        { name: 'Node.js', level: 'Advanced' },
        { name: 'ExpressJS', level: 'Advanced' },
        { name: 'NestJS', level: 'Intermediate' },
        { name: 'MongoDB', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Intermediate' },
        { name: 'MySQL', level: 'Intermediate' },
      ],
    },
    {
      title: 'Languages & Frontend',
      skills: [
        { name: 'Python', level: 'Advanced' },
        { name: 'JavaScript (ES6+)', level: 'Expert' },
        { name: 'Java & C++', level: 'Intermediate' },
        { name: 'React & Next.js', level: 'Advanced' },
        { name: 'React Native', level: 'Intermediate' },
        { name: 'Tailwind CSS', level: 'Expert' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-background-secondary/30 backdrop-blur-[2px] border-y border-zinc-200/20 dark:border-zinc-800/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
            Technical Skills
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4">
            A comprehensive list of technologies, frameworks, and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-background border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 shadow-sm flex flex-col h-full"
            >
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4 mb-6">
                {category.title}
              </h3>

              {/* Skills List */}
              <div className="space-y-4 flex-grow">
                {category.skills.map((skill, sIndex) => (
                  <div key={sIndex} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {skill.name}
                    </span>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full border border-indigo-100/50 dark:border-indigo-900/30">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
