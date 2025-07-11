import { notFound } from 'next/navigation';
import { getNewsletterBySlug } from '@/lib/newsletter';
import { MDX } from '@/components/mdx-shared';
import NewsletterForm from '@/components/newsletter-form';
import { formatDateWithAgo } from '@/lib/utils';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function NewsletterIssuePage({ params }: PageProps) {
    const { slug } = await params;
    const issue = getNewsletterBySlug(slug);
    if (!issue) notFound();
    const dateLine = issue.metadata.date ? formatDateWithAgo(issue.metadata.date) : null;

    return (
        <section className="animate-fade-in-up max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-white">
                <span className="text-blue-500 mr-2">*</span>
                {issue.metadata.title}
            </h1>
            {dateLine && (
                <div className="mb-8 text-sm text-neutral-500 font-mono">{dateLine}</div>
            )}
            <article className="prose-lg prose-invert max-w-none prose-headings:text-blue-500 prose-a:text-blue-500 prose-code:text-white">
                <MDX source={issue.content} />
            </article>
            <div className="mt-12">
                <NewsletterForm />
            </div>
        </section>
    );
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const issue = getNewsletterBySlug(slug);
    if (!issue) return;
    const publishedTime = issue.metadata.date;
    return {
        title: issue.metadata.title,
        description: `Luminary newsletter issue${issue.metadata.date ? ' • ' + issue.metadata.date : ''}`,
        openGraph: {
            title: issue.metadata.title,
            description: `Luminary newsletter issue${issue.metadata.date ? ' • ' + issue.metadata.date : ''}`,
            publishedTime,
            type: "article",
            url: `/newsletter/${issue.slug}`,
            images: [
                {
                    url: `/og/newsletter?title=${encodeURIComponent(issue.metadata.title)}`,
                },
            ],
        },
        twitter: {
            title: issue.metadata.title,
            description: `Luminary newsletter issue${issue.metadata.date ? ' • ' + issue.metadata.date : ''}`,
            card: "summary_large_image",
            creator: "@boobachad",
            images: [`/og/newsletter?title=${encodeURIComponent(issue.metadata.title)}`],
        },
    };
} 