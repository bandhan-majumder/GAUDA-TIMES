"use server";
import db from "@repo/db/client";

interface IBlogData {
    title: string
    description: string
    notionDocsId: string
    image: string
}

export async function getBlog(blogId: string | null) {
    if (!blogId) {
        return null;
    }

    // TODO: add cache
    
    try {
        const blog = await db.blogs.findUnique({
            where: {
                id: blogId,
            },
        });
    
        // TODO: set cache
    
        return blog;
    } catch (err) {
        return null;
    }
}

export async function getAllBlogs() {
    // TODO: add cache
    
    try {
        const allBlogs = await db.blogs.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    
        // TODO: set cache
    
        return allBlogs;
    
    } catch (e) {
        return [];
    }
}

export async function updateBlog(blogId: string, data: IBlogData) {
    try {
        const blog = await db.blogs.update({
            where: {
                id: blogId,
            },
            data,
        });
        return blog;
    } catch (e) {
        return null;
    }
}

export async function createBlog(data: IBlogData) {
    try {
        const blog = await db.blogs.create({
            data,
        });
        return blog;
    } catch (e) {
        return null;
    }
}

