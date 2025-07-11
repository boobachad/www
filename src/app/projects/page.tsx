import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import type { Metadata } from "next"
import { projects } from "@/data/projects"

export default function ProjectsPage() {
  return (
    <div className="text-xl">
      <main className="animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-8 text-white">
          <span className="text-blue-500 mr-2">*</span>
          <ScrambleText text="projects" />
        </h1>

        <p className="text-gray-400 mb-12 leading-relaxed">
          some of the projects i&apos;ve worked on. i like building tools
          that make my life easier.
        </p>

        <div className="space-y-12">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </main>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of the projects I've worked on.",
  openGraph: {
    images: [
      {
        url: "https://www.boobachad.dev/og/home?title=projects",
      },
    ],
  },
}
