import { notFound } from "next/navigation"
import { MDX } from "@/components/mdx-shared"
import { getPostBySlug } from "@/lib/blog"
import ShowViews from "./ShowViews";
import { Suspense } from "react"
import { formatDateWithAgo } from '@/lib/utils';

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug
  const post = getPostBySlug(slug)
  if (!post) {
    return
  }

  const publishedTime = post.metadata.date

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime,
      type: "article",
      url: `/blog/${post.slug}`,
      images: [
        {
          url: `/og/blog?title=${post.metadata.title}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@boobachad",
      images: [`/og/blog?title=${post.metadata.title}`],
    },
  }
}

export default async function Post({ params }: PageProps) {
  const slug = (await params).slug
  const post = getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  return (
    <section className="animate-fade-in-up">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.description,
            image: `/og/blog?title=${encodeURIComponent(post.metadata.title)}`,
            url: `/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "boobachad",
            },
          }),
        }}
      />

      <h1 className="text-4xl font-bold mb-4 text-white">
        <span className="text-blue-500 mr-2">*</span>
        {post.metadata.title}
      </h1>

      <div className="mb-8 flex items-center gap-4 text-sm text-gray-400">
        <span>{formatDateWithAgo(post.metadata.date)}</span>
        <Suspense fallback={<div className="blur-sm">...</div>}>
          <ShowViews slug={post.slug} />
        </Suspense>
      </div>

      <article className="prose-lg prose-invert max-w-none prose-headings:text-blue-500 prose-a:text-blue-500 prose-code:text-white">
        <MDX source={post.content} />
      </article>
    </section>
  )
}
