// app/course/projects/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, ChevronRight, Rocket } from 'lucide-react';
import { projects } from '@/content/projects';
import { useUserStore } from '@/lib/store';

export default function ProjectsPage() {
  const profile = useUserStore(s => s.profile);

  // Check which lessons user has accessed (we'll use explorations as proxy)
  const accessedLessons = new Set(
    profile?.lessonProgress?.map(lp => lp.lessonId) || []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
          <Link
            href="/course"
            className="flex items-center gap-1 text-gray-500 hover:text-primary-600 transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Course
          </Link>
          <span className="text-gray-300">|</span>
          <h1 className="font-bold text-gray-900">Build Along Projects</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Hero */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-4">
            <Rocket className="w-4 h-4" />
            Hands-On Projects
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Build Something Real
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Apply what you've learned across multiple lessons to build portfolio-worthy AI projects.
            Each project guides you step-by-step.
          </p>
        </div>

        {/* Project cards */}
        <div className="space-y-6">
          {projects.map((project, i) => {
            const prerequisiteMet = project.prerequisites.filter(p => accessedLessons.has(p)).length;
            const totalPrerequisites = project.prerequisites.length;
            const readyPercentage = Math.round((prerequisiteMet / totalPrerequisites) * 100);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/course/projects/${project.slug}`}
                  className="block bg-white rounded-2xl border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all overflow-hidden group"
                >
                  {/* Gradient banner */}
                  <div className={`bg-gradient-to-r ${project.color} p-5 sm:p-6`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-3xl sm:text-4xl">{project.icon}</span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                          {project.title}
                        </h3>
                        <p className="text-white/80 text-sm sm:text-base mt-1">
                          {project.subtitle}
                        </p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white transition-colors flex-shrink-0 mt-2" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 sm:p-6">
                    <p className="text-gray-600 text-sm sm:text-base mb-4">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 sm:gap-6 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        ~{project.estimatedMinutes} min
                      </span>
                      <span>{project.steps.length} steps</span>
                    </div>

                    {/* Prerequisites */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all"
                          style={{ width: `${readyPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                        {prerequisiteMet}/{totalPrerequisites} lessons ready
                      </span>
                    </div>

                    {/* Outcome */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs sm:text-sm text-gray-600">
                      <span className="font-medium text-gray-700">What you'll build:</span> {project.outcome}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
