export default function Certificates() {
  const basePath = process.env.NEXT_PUBLIC_IS_STATIC_EXPORT === 'true' ? '/portfolio' : '';
  const certificates = [
    {
      title: "Credly Digital Badge Credentials",
      issuer: "Credly Verified Badges",
      date: "2026",
      credentialId: "CREDLY-PROFILE",
      verifyLink: "https://www.credly.com/users/vanujak",
      category: "Cloud & DevOps",
      isCredly: true,
    },
    {
      title: "Low Level System Design, Design Patterns & SOLID Principles",
      issuer: "Udemy",
      date: "2026",
      credentialId: "UC-108eaebf-7829-4316-ae35-0f2320ec9b3b",
      verifyLink:
        "https://www.udemy.com/certificate/UC-108eaebf-7829-4316-ae35-0f2320ec9b3b/",
      category: "Software Engineering",
    },
    {
      title: "Namaste Node.js",
      issuer: "Namaste Dev",
      date: "2026",
      credentialId: "E8963B37961D36B32D76697DA6B",
      verifyLink: `${basePath}/certificates/namasteNode.webp`,
      category: "Backend Development",
    },
    {
      title: "Namaste JavaScript",
      issuer: "Namaste Dev",
      date: "2026",
      credentialId: "E8963B37961D36B32D76697D84B",
      verifyLink: `${basePath}/certificates/namasteJavaScript.webp`,
      category: "Programming",
    },
  ];

  return (
    <section id="certificates" className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
            Certifications & Licenses
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4">
            A verified collection of professional cloud, DevOps, and software engineering credentials I have earned.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="https://www.credly.com/users/vanujak"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 dark:border-amber-400/30 hover:bg-amber-500/20 dark:hover:bg-amber-400/20 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.85 8.08L21.5 8.64L16.42 13.01L17.96 19.52L12 16.05L6.04 19.52L7.58 13.01L2.5 8.64L9.15 8.08L12 2Z" />
              </svg>
              View Verified Badges on Credly
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="group bg-background-secondary/35 border border-zinc-200/40 dark:border-zinc-800/30 rounded-2xl p-6 shadow-xs hover:scale-[1.02] hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Tag / Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30">
                    {cert.category}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 leading-snug mb-2 group-hover:text-indigo-500 transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-sm font-medium text-zinc-650 dark:text-zinc-400">
                  {cert.issuer}
                </p>
              </div>

              {/* ID & Link Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-200/30 dark:border-zinc-800/30 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                  ID: {cert.credentialId}
                </span>
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
                >
                  Verify
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
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
