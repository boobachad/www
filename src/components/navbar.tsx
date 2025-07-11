"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  // { href: "/resourceHub", label: "ResourceHub" },
  { href: "/newsletter", label: "Newsletter" },
];

export function Navbar() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        event.target instanceof HTMLInputElement
      ) {
        return
      }

      switch (event.key.toLowerCase()) {
        case "h":
          router.push("/")
          break
        case "b":
          router.push("/blog")
          break
        case "p":
          router.push("/projects")
          break
        case "n":
          router.push("/newsletter")
          break
        case "g":
          router.push("/games")
          break
        // case "r":
        //   router.push("/resourceHub")
        //   break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [router])

  const externalLinks = [
    { title: "x.com", href: "https://x.com/boobachad" },
    { title: "github", href: "https://github.com/boobachad" },
    { title: "book a call", href: "https://cal.com/boobachad" },
  ]

  return (
    <nav className="mb-12 text-sm w-full max-w-full">
      <div className="flex flex-row w-full max-w-full sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col flex-1 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Link
            href="/"
            className="hover:text-blue-500 transition-colors duration-200 whitespace-nowrap"
          >
            [h] home
          </Link>
          <Link
            href="/blog"
            prefetch={true}
            className="hover:text-blue-500 transition-colors duration-200 whitespace-nowrap"
          >
            [b] blog
          </Link>
          <Link
            href="/projects"
            className="hover:text-blue-500 transition-colors duration-200 whitespace-nowrap"
          >
            [p] projects
          </Link>
          <Link
            href="/newsletter"
            className="hover:text-blue-500 transition-colors duration-200 whitespace-nowrap"
          >
            [n] newsletter
          </Link>
          <Link
            href="/games"
            className="hover:text-blue-500 transition-colors duration-200 whitespace-nowrap"
          >
            [g] games
          </Link>
          {/* <Link
            href="/resourceHub"
            className="hover:text-blue-500 transition-colors duration-200 whitespace-nowrap"
          >
            [r] resource hub
          </Link> */}
        </div>
        <div className="flex flex-col flex-1 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 items-end sm:items-center sm:justify-end sm:text-right">
          {externalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
