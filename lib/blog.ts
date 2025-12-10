import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    coverImage: string;
    date: string;
    author: string;
}

export function getAllPosts(): BlogPost[] {
    const files = fs.readdirSync(postsDirectory);

    return files.map((filename) => {
        const filePath = path.join(postsDirectory, filename);
        const file = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(file);

        return {
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt || '',
            content: content,
            category: data.category,
            coverImage: data.coverImage,
            date: data.date,
            author: data.author
        } as BlogPost;
    });
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const file = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(file);
    const processed = await remark().use(html).process(content);
    const htmlContent = processed.toString();

    return {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || '',
        content: htmlContent,
        category: data.category,
        coverImage: data.coverImage,
        date: data.date,
        author: data.author
    } as BlogPost;
}
