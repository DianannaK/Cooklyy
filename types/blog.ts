import { Category } from '@/lib/categories';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: number;
    imageUrl: string;
    category: string;
    tags: string[];
}
