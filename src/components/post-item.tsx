import { type MDXFileData } from "@/lib/blog"
import Link from "next/link"

type PostItemProps = {
  post: MDXFileData
  isSelected?: boolean
}

export function PostItem({ post, isSelected }: PostItemProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 group ${isSelected
        ? "bg-linear-to-r from-blue-500/10 to-transparent -mx-2 px-2 border-l-2 border-l-blue-500/50"
        : ""
        }`}
    >
      <Link
        href={`/blog/${post.slug}`}
        prefetch={true}
        className="text-foreground hover:text-blue-500 transition-colors duration-200"
      >
        {post.metadata.title.toLowerCase()}
      </Link>
      <div className="flex items-center text-sm text-muted-foreground shrink-0 gap-2">
        <span>
          {new Date(post.metadata.date)
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            .toLowerCase()}
        </span>
      </div>
    </div>
  )
}
