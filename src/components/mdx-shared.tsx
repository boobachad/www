import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { Children, createElement, isValidElement } from "react"
import { codeToHtml } from "shiki"
import CustomButton from '@/components/custom-button';
import NewsletterForm from '@/components/newsletter-form';


function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
    let headers = data.headers.map((header, index) => (
        <th key={index} className="p-2 text-left">
            {header}
        </th>
    ))
    let rows = data.rows.map((row, index) => (
        <tr key={index}>
            {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-2 text-left">
                    {cell}
                </td>
            ))}
        </tr>
    ))

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

function CustomLink({
    href,
    ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
    if (href.startsWith("/")) {
        return (
            <Link href={href} {...props} className="text-blue-500 hover:underline">
                {props.children}
            </Link>
        )
    }

    if (href.startsWith("#")) {
        return <a {...props} className="text-blue-500 hover:underline" />
    }

    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} className="text-blue-500 hover:underline" />
}

function CustomImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img alt={props.alt} className="rounded-lg" {...props} />
}

async function Pre({
    children,
    ...props
}: React.HtmlHTMLAttributes<HTMLPreElement>) {
    const codeElement = Children.toArray(children).find(
        (child) => isValidElement(child) && child.type === "code",
    ) as React.ReactElement<HTMLPreElement> | undefined

    const className = codeElement?.props?.className ?? ""
    const isCodeBlock =
        typeof className === "string" && className.startsWith("language-")

    if (isCodeBlock) {
        const lang = className.split(" ")[0]?.split("-")[1] ?? ""

        if (!lang) {
            return <code {...props}>{children}</code>
        }

        const html = await codeToHtml(String(codeElement?.props.children), {
            lang,
            themes: {
                dark: "vesper",
                light: "vitesse-light",
            },
        })

        return <div dangerouslySetInnerHTML={{ __html: html }} />
    }

    return <pre {...props}>{children}</pre>
}

function slugify(str: string) {
    return str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/&/g, "-and-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
}

function createHeading(level: number) {
    const HeadingComponent = ({ children }: { children: React.ReactNode }) => {
        const childrenString = Children.toArray(children).join("")
        const slug = slugify(childrenString)
        const headingClass = `${level === 1 ? '' : 'mt-8 mb-2 font-bold'} group relative flex items-center text-blue-500`;
        return createElement(`h${level}`, { id: slug, className: headingClass }, [
            <span
                key="hash"
                className="absolute -left-6 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-150 select-none"
                aria-hidden="true"
            >
                #
            </span>,
            createElement(
                "a",
                {
                    href: `#${slug}`,
                    key: `link-${slug}`,
                    className: "anchor flex items-center group-hover:text-blue-700 transition-colors duration-150",
                },
                children,
            ),
        ])
    }
    HeadingComponent.displayName = `Heading${level}`
    return HeadingComponent
}

const components = {
    a: CustomLink,
    img: CustomImage,
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    pre: Pre,
    Table,
    CustomButton,
    NewsletterForm: NewsletterForm,
}

export function MDX(props: any) {
    return (
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components ?? {}) }}
        />
    )
}
