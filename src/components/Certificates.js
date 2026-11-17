"use client";

import Image from "next/image";

export default function Certificates() {
  const basePath =
    process.env.NEXT_PUBLIC_IS_STATIC_EXPORT === "true" ? "/portfolio" : "";
  const certificates = [
    {
      type: "Certification",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services Training and Certification",
      date: "2026",
      credentialId: "CLF-C02",
      verifyLink:
        "https://www.credly.com/badges/fbc48134-e058-4abc-808f-d5e0958e9646/public_url",
      logoImage:
        "https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
      category: "Cloud Computing",
    },
    {
      type: "Course",
      title: "Low Level System Design, Design Patterns & SOLID Principles",
      issuer: "Udemy",
      date: "2026",
      credentialId: "UC-108eaebf-7829-4316-ae35-0f2320ec9b3b",
      verifyLink:
        "https://www.udemy.com/certificate/UC-108eaebf-7829-4316-ae35-0f2320ec9b3b/",
      logoImage: `${basePath}/certificates/udemy-logo.webp`,
      category: "Software Engineering",
    },
    {
      type: "Course",
      title: "Namaste Node.js",
      issuer: "Namaste Dev",
      date: "2026",
      credentialId: "E8963B37961D36B32D76697DA6B",
      verifyLink: `${basePath}/certificates/namasteNode.webp`,
      logoImage: `${basePath}/certificates/namastedev-logo.png`,
      category: "Backend Development",
    },
    {
      type: "Course",
      title: "Namaste JavaScript",
      issuer: "Namaste Dev",
      date: "2026",
      credentialId: "E8963B37961D36B32D76697D84B",
      verifyLink: `${basePath}/certificates/namasteJavaScript.webp`,
      logoImage: `${basePath}/certificates/namastedev-logo.png`,
      category: "Programming",
    },
  ];

  return (
    <section id="certificates" className="py-10 sm:py-14 lg:py-16 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
            Certifications
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-1.5">
            Certifications & Courses
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base">
            Verified cloud certifications and specialized software engineering
            courses I have completed.
          </p>
        </div>

        {/* Unified 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
          {certificates.map((cert) => (
            <div
              key={cert.credentialId}
              className="group bg-background-secondary/35 border border-zinc-200/40 dark:border-zinc-800/30 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Tag / Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
                    <span
                      className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border ${
                        cert.type === "Certification"
                          ? "bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-900/50"
                          : "bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-300 border-zinc-200/60 dark:border-zinc-700/50"
                      }`}
                    >
                      {cert.type}
                    </span>
                    <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 truncate">
                      {cert.category}
                    </span>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    {cert.date}
                  </span>
                </div>

                <div className="flex items-center sm:items-start gap-3 sm:gap-4">
                  {cert.logoImage && (
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-background/60 dark:bg-zinc-900/50 border border-zinc-200/40 dark:border-zinc-800/40 p-1.5 shrink-0 flex items-center justify-center">
                      <Image
                        src={cert.logoImage}
                        alt={`${cert.issuer} logo`}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50 leading-snug mb-1 group-hover:text-indigo-500 transition-colors">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 truncate">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </div>

              {/* ID & Link Footer */}
              <div className="mt-3.5 pt-3 border-t border-zinc-200/30 dark:border-zinc-800/30 flex items-center justify-between gap-3">
                <span
                  title={`ID: ${cert.credentialId}`}
                  className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 min-w-0 truncate"
                >
                  ID: {cert.credentialId}
                </span>
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity inline-flex items-center gap-1 py-0.5 cursor-pointer"
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
