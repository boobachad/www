import { Header } from "@/components/header"
import type { Item } from "@/components/section-list"
import { SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { projects } from "@/data/projects"
import { workExperiences } from "@/data/work"
import NewsletterForm from '@/components/newsletter-form'

const workItems: Item[] = workExperiences.map(work => ({
  title: work.title,
  role: work.role,
  period: work.period,
  description: work.description,
  href: work.href,
}))

// show all priority projects else show only 3
const priorityProjects = projects.filter(p => p.priority);
const nonPriorityProjects = projects.filter(p => !p.priority);
let homepageProjects = priorityProjects;
if (priorityProjects.length < 3) {
  homepageProjects = [
    ...priorityProjects,
    ...nonPriorityProjects.slice(0, 3 - priorityProjects.length)
  ];
}

export default function HomePage() {
  return (
    <>
      <div className="text-xl">
        <Header />
        <SectionList title="work" items={workItems} />
        <SectionList
          title="projects"
          items={homepageProjects.map(({ title, role, description, href }) => ({ title, role, description, href }))}
          viewAllHref="/projects"
          viewAllText="all projects"
        />
        <BlogSection />
      </div>
      <div className="mt-12">
        <NewsletterForm />
      </div>
    </>
  )
}
