'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

export default function About() {
  const [activeModal, setActiveModal] = useState(null);
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

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
    { id: 'devops', value: "5+", label: "DevOps & IaC Tools" },
    { id: 'projects', value: "3", label: "Core Projects" },
    { id: 'education', value: "2", label: "Academic Paths" },
    { id: 'journey', value: "2023", label: "Started BSc Eng" },
  ];

  const modalContent = {
    devops: {
      title: "DevOps & Cloud Automation Stack",
      icon: "🛠️",
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
      icon: "💻",
      items: [
        { name: "EasyCase (Case Management System)", desc: "A full-stack MERN portal. Containerized with Docker and deployed using a Jenkins CI/CD pipeline and Ansible/Terraform infrastructure." },
        { name: "ScaleLab (Simulation Platform)", desc: "A distributed system topology designer. Built with Next.js, NestJS, and TypeScript, utilizing real-time WebSockets to render traffic and performance metrics." },
        { name: "SayIDo (Mobile Directory)", desc: "A React Native and Expo app for wedding vendors. Incorporates secure JWT/GraphQL authentication and real-time subscription-based messaging." }
      ]
    },
    education: {
      title: "Academic & Legal Studies",
      icon: "🎓",
      items: [
        { name: "BSc Eng (Hons) in Computer Engineering (Undergraduate)", desc: "Faculty of Engineering, University of Ruhuna (Galle, Sri Lanka) — 2023 to Present. Focusing on computer networks, system engineering, and automated deployments." },
        { name: "Attorney at Law (Reading - On Hold)", desc: "Sri Lanka Law College (Colombo, Sri Lanka) — 2025 to Present. Developing logical framework skills and legal compliance insights." }
      ]
    },
    journey: {
      title: "Computer Engineering Journey",
      icon: "🚀",
      items: [
        { name: "Faculty of Engineering", desc: "Enrolled in 2023 at the University of Ruhuna. Developed deep capabilities in system programming, cloud engineering, and operations." },
        { name: "Extracurricular Contributions", desc: "Public Relations team member for the ReXtro-2025 exhibition; active volunteering at Sasnaka Sansada." }
      ]
    }
  };

  return (
    <section id="about" className="py-24 bg-background-secondary/30 backdrop-blur-[2px] border-y border-zinc-200/20 dark:border-zinc-800/20 relative">
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
                <button
                  key={index}
                  onClick={() => setActiveModal(stat.id)}
                  className="bg-background p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm text-left hover:scale-[1.03] hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:shadow-md transition-all duration-200 cursor-pointer w-full group focus:outline-none"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 mt-1 flex items-center justify-between">
                    <span>{stat.label}</span>
                    <span className="text-[10px] text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-1">More →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Photo Detail */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl bg-background-secondary">
              <Image
                src={`${basePath}/profile.JPEG`}
                alt="Vanuja Karunaratne"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
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
          <div className="relative z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{modalContent[activeModal].icon}</span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
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
