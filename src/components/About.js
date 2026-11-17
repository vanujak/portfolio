'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

export default function About() {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);
  
  const stats = [
    { id: 'experience', value: "1", label: "Work Internship" },
    { id: 'devops', value: "5+", label: "DevOps & IaC Tools" },
    { id: 'projects', value: "3", label: "Core Projects" },
    { id: 'education', value: "2", label: "Academic Paths" },
    { id: 'journey', value: "2023", label: "Started BSc Eng" },
  ];

  const modalContent = {
    experience: {
      title: "Professional Work Experience",
      icon: (
        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      ),
      items: [
        { name: "DevOps Intern — SLT-MOBITEL (Telecom)", desc: "June 2026 to December 2026 (6 Months Internship). Tasked with automated deployment workflow configurations, cloud systems operations, container orchestration, and telemetry setups for critical telecommunications services." }
      ]
    },
    devops: {
      title: "DevOps & Cloud Automation Stack",
      icon: (
        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
        </svg>
      ),
      items: [
        { name: "Docker", desc: "Containerizing MERN applications and distributed system topologies for isolated environments." },
        { name: "Jenkins & GitHub Actions", desc: "Creating automated CI/CD build and test pipelines triggered automatically by Git commits and webhooks." },
        { name: "Terraform & Ansible", desc: "Provisioning and managing cloud infrastructure using Infrastructure as Code (IaC) with automated configuration management." },
        { name: "AWS Cloud Platform", desc: "Setting up hosting environments, network route configurations, and cloud services." },
        { name: "MLOps", desc: "Applying DevOps principles to automate machine learning pipelines from model training and registration to live production deployment." }
      ]
    },
    projects: {
      title: "Core Engineering Projects",
      icon: (
        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      items: [
        { name: "EasyCase (Case Management System)", desc: "A full-stack MERN portal. Containerized with Docker and deployed using a Jenkins CI/CD pipeline and Ansible/Terraform infrastructure." },
        { name: "ScaleLab (Simulation Platform)", desc: "A distributed system topology designer. Built with Next.js, NestJS, and TypeScript, utilizing real-time WebSockets to render traffic and performance metrics." },
        { name: "SayIDo (Mobile Directory)", desc: "A React Native and Expo app for wedding vendors. Incorporates secure JWT/GraphQL authentication and real-time subscription-based messaging." }
      ]
    },
    education: {
      title: "Academic & Legal Studies",
      icon: (
        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      items: [
        { name: "BSc Eng (Hons) in Computer Engineering (Undergraduate)", desc: "Faculty of Engineering, University of Ruhuna (Galle, Sri Lanka) — 2023 to Present. Focusing on computer networks, system engineering, and automated deployments." },
        { name: "Attorney at Law (Reading - On Hold)", desc: "Sri Lanka Law College (Colombo, Sri Lanka) — 2025 to Present. Developing logical framework skills and legal compliance insights." }
      ]
    },
    journey: {
      title: "Computer Engineering Journey",
      icon: (
        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      items: [
        { name: "Faculty of Engineering", desc: "Enrolled in 2023 at the University of Ruhuna. Developed deep capabilities in system programming, cloud engineering, and operations." },
        { name: "Extracurricular Contributions", desc: "Public Relations team member for the ReXtro-2025 exhibition; active volunteering at Sasnaka Sansada." }
      ]
    }
  };

  return (
    <section id="about" className="py-10 sm:py-14 lg:py-16 bg-background-secondary/30 border-y border-zinc-200/20 dark:border-zinc-800/20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
              About Me
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1.5 mb-3 sm:mb-4">
              Bridging the gap between software development and automated
              infrastructure.
            </h2>
            <div className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
                Currently, I am expanding my boundaries into <strong className="font-semibold text-zinc-900 dark:text-zinc-200">MLOps (Machine Learning Operations)</strong>. I am passionate about automating the
                integration of machine learning models into production—building
                robust pipelines to handle model training, deployment, tracking,
                and continuous monitoring.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3 mt-5 sm:mt-6">
              {stats.map((stat, index) => (
                <button
                  key={index}
                  onClick={() => setActiveModal(stat.id)}
                  className="bg-background p-3 sm:p-3.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 text-left hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-colors duration-200 cursor-pointer w-full group focus:outline-none col-span-1 last:col-span-2 md:last:col-span-1"
                >
                  <div className="text-xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 mt-0.5 sm:mt-1 flex items-center justify-between">
                    <span>{stat.label}</span>
                    <span className="text-[10px] text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-1">More →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Photo Detail */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-48 h-48 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md bg-background-secondary">
              <Image
                src="/profile.png"
                alt="Vanuja Karunaratne"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          {/* Close on backdrop click */}
          <div className="absolute inset-0" onClick={() => setActiveModal(null)} />
          
          {/* Modal Card */}
          <div className="relative z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center shrink-0">
                  {modalContent[activeModal].icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {modalContent[activeModal].title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* List Content */}
            <div className="space-y-6 overflow-y-auto pr-1 flex-grow">
              {modalContent[activeModal].items.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {item.name}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-3.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full bg-zinc-950 text-zinc-50 hover:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 text-sm font-semibold transition-colors cursor-pointer shadow-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
