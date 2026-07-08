import Image from "next/image";

export default function About() {
  const stats = [
    { value: "5+", label: "DevOps & IaC Tools" },
    { value: "3", label: "Core Projects" },
    { value: "2", label: "Academic Paths" },
    { value: "2023", label: "Started BSc Eng" },
  ];

  return (
    <section id="about" className="py-24 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2 mb-6">
              Bridging the gap between software development and automated
              infrastructure.
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                I am a Computer Engineering undergraduate at the University of
                Ruhuna, deeply focused on DevOps practices and automated cloud
                deployments. I believe that writing great code is only half the
                battle—ensuring it is compiled, tested, containerized, and
                deployed reliably is what delivers true value.
              </p>
              <p>
                My technical toolkit includes provisioning infrastructure as
                code (IaC) with Terraform and Ansible, building CI/CD pipelines
                in Jenkins and GitHub Actions, and containerizing software with
                Docker. I also build full-stack solutions with React, Next.js,
                and Node.js.
              </p>
              <p>
                Currently, I am expanding my boundaries into **MLOps (Machine
                Learning Operations)**. I am passionate about automating the
                integration of machine learning models into production—building
                robust pipelines to handle model training, deployment, tracking,
                and continuous monitoring.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-background p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
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

          {/* Profile Photo Detail */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl bg-background-secondary">
              <Image
                src="/profile.JPEG"
                alt="Vanuja Karunaratne"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
