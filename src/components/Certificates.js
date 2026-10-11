"use client";

import { useState } from "react";
import Image from "next/image";

export default function Certificates() {
  const [activeType, setActiveType] = useState("certificate");
  const basePath =
    process.env.NEXT_PUBLIC_IS_STATIC_EXPORT === "true" ? "/portfolio" : "";
  const certificates = [
    {
      type: "certificate",
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
      type: "course",
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
      type: "course",
      title: "Namaste Node.js",
      issuer: "Namaste Dev",
      date: "2026",
      credentialId: "E8963B37961D36B32D76697DA6B",
      verifyLink: `${basePath}/certificates/namasteNode.webp`,
      logoImage: `${basePath}/certificates/namastedev-logo.png`,
      category: "Backend Development",
    },
    {
      type: "course",
      title: "Namaste JavaScript",
      issuer: "Namaste Dev",
      date: "2026",
      credentialId: "E8963B37961D36B32D76697D84B",
      verifyLink: `${basePath}/certificates/namasteJavaScript.webp`,
      logoImage: `${basePath}/certificates/namastedev-logo.png`,
      category: "Programming",
    },
  ];
  const certificateTypes = [
    { id: "certificate", label: "Certificates" },
    { id: "course", label: "Courses" },
  ];
  const filteredCertificates = certificates.filter(
    (cert) => cert.type === activeType,
  );

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

        <div className="flex justify-center mb-8">
          <div className="inline-flex w-full max-w-xs sm:w-auto rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-background-secondary/35 p-1">
            {certificateTypes.map((type) => {
              const isActive = activeType === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setActiveType(type.id)}
                  aria-pressed={isActive}
                  className={`flex-1 sm:flex-none rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm dark:bg-indigo-500"
                      : "text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, index) => (
            <div
              key={cert.credentialId}
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

                <div className="flex items-start gap-3 sm:gap-4">
                  {cert.logoImage && (
                    <Image
                      src={cert.logoImage}
                      alt={`${cert.issuer} logo`}
                      width={64}
                      height={64}
                      className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 object-contain"
                    />
                  )}

                  <div className="min-w-0">
                    {/* Title */}
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 leading-snug mb-2 group-hover:text-indigo-500 transition-colors">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-sm font-medium text-zinc-650 dark:text-zinc-400">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </div>

              {/* ID & Link Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-200/30 dark:border-zinc-800/30 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 break-all sm:break-normal">
                  ID: {cert.credentialId}
                </span>
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer self-start sm:self-auto"
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
