export interface WorkExperience {
    title: string
    role: string
    period: string
    description: string
    href: string
}

export const workExperiences: WorkExperience[] = [
    {
        title: "fater",
        role: "software engineer",
        period: "never to never",
        description: "hoarder",
        href: "#",
    },
]

export function getCurrentWork(): WorkExperience | null {
    return workExperiences.find(work => work.period.toLowerCase().includes('present')) || null
} 