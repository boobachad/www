export interface Project {
    title: string
    description: string
    role: string
    period?: string
    achievements: string[]
    technologies: string[]
    href: string
    priority?: boolean
}

export const projects: Project[] = [
    {
        title: "history-learning",
        description:
            "something ehre",
        role: "creator",
        period: "apr 2025 - present",
        achievements: [
            "no achievmetns",
        ],
        technologies: [
            "typescript",
            "next.js",
            "mongodb",
            "tailwind css",
        ],
        href: "https://github.com/boobachad/history_learning",
        priority: true,
    },
    {
        title: "daily-reflection",
        description: "something here to ",
        role: "creator",
        period: "apr 2025 - present",
        achievements: [
            "no achievmetns",
        ],
        technologies: ["typescript", "next.js"],
        href: "https://github.com/boobachad/daily-reflection",
    },
]; 