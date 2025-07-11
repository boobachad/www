import fs from 'fs';
import path from 'path';

export type NewsletterMetadata = {
    title: string;
    date?: string;
    status?: string;
};

export type NewsletterFileData = {
    metadata: NewsletterMetadata;
    slug: string;
    content: string;
};

function parseFrontmatter(fileContent: string): { metadata: NewsletterMetadata; content: string } {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(fileContent);
    if (!match) throw new Error('No frontmatter found');
    const frontmatter = match[1];
    if (!frontmatter) throw new Error('No frontmatter found');
    const content = fileContent.replace(frontmatterRegex, '').trim();
    const metadata: Partial<NewsletterMetadata> = {};
    frontmatter.trim().split('\n').forEach((line) => {
        const [key, ...values] = line.split(': ');
        let value = values.join(': ').trim();
        value = value.replace(/^['"](.*)['"]$/, '$1');
        if (key && value) metadata[key.trim() as keyof NewsletterMetadata] = value;
    });
    return { metadata: metadata as NewsletterMetadata, content };
}

function getMDXFiles(dir: string): string[] {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string): { metadata: NewsletterMetadata; content: string } {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    return parseFrontmatter(rawContent);
}

export function getNewsletters(): NewsletterFileData[] {
    const dir = path.join(process.cwd(), 'content', 'newsletter');
    const mdxFiles = getMDXFiles(dir);
    return mdxFiles.map((file) => {
        const { metadata, content } = readMDXFile(path.join(dir, file));
        const slug = path.basename(file, path.extname(file));
        return { metadata, slug, content };
    }).filter(issue => issue.metadata.status === 'release');
}

export function getNewsletterBySlug(slug: string): NewsletterFileData | null {
    return getNewsletters().find((issue) => issue.slug === slug) ?? null;
} 