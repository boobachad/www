import NewsletterForm from '@/components/newsletter-form';
import Link from 'next/link';
import { getNewsletters } from '@/lib/newsletter';
import { ScrambleText } from "@/components/scramble-text"
import type { Metadata } from "next"


function getDateOrRemark(date?: string) {
    if (!date) return 'from the future!';
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'time is a mystery!';
    return d.toLocaleDateString('en-CA');
}

export default function NewsletterPage() {
    // getNewsletters() only returns issues with status set as release
    const issues = getNewsletters().sort((a, b) => {
        if (a.metadata.date && b.metadata.date) {
            return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
        }
        return b.slug.localeCompare(a.slug);
    });
    return (
        <>
            <div className="text-xl">
                <main className="animate-fade-in-up relative">
                    <h1 className="text-4xl font-bold mb-8 text-white">
                        <span className="text-blue-500 mr-2">*</span>
                        <ScrambleText text="newsletter" />
                    </h1>

                    <div className="mt-12">
                        <NewsletterForm />
                    </div>

                    <h2 className="mt-12 mb-4 text-lg font-semibold">Past Issues:</h2>
                    <div className="flex flex-col gap-4">
                        {issues.length > 0 ? (
                            issues.map((issue) => (
                                <Link
                                    key={issue.slug}
                                    href={`/newsletter/${issue.slug}`}
                                    tabIndex={-1}
                                    className="focus:outline-none"
                                >
                                    <div
                                        className="group bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 shadow-sm cursor-pointer transition-transform duration-150 hover:scale-[1.01]"
                                    >
                                        <div className="text-xs text-neutral-500 mb-1 font-mono">{getDateOrRemark(issue.metadata.date)}</div>
                                        <div className="text-lg font-medium text-neutral-800 dark:text-neutral-100">{issue.metadata.title}</div>
                                        <div className={"overflow-hidden transition-all duration-300 max-h-0 opacity-0 -translate-y-2 group-hover:max-h-8 group-hover:opacity-100 group-hover:translate-y-0 text-blue-500 text-sm font-mono"}>
                                            Read this issue
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-12 text-gray-400">
                                <p className="text-lg">404 thoughts not found (yet)</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

export const metadata: Metadata = {
    title: "Newsletter",
    description: "Stay ahead of the curve with my monthly newsletter, luminary. Get insights, bookmarks, and updates on development, design, and more.",
    openGraph: {
        images: [
            {
                url: "https://www.boobachad.dev/og/home?title=newsletter",
            },
        ],
    },
} 
