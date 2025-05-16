"use server";
import db from "@repo/db/client";
import { IBlogDetails } from "../types";

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

        return blog;
    } catch (err) {
        return null;
    }
}

export async function getAllBlogs({ take, skip, cursor, orderBy = "desc" }: { take?: number; skip?: number; cursor?: string, orderBy?: "desc" | "asc" } = {}) {
    try {
        const allBlogs = await db.blogs.findMany({
            orderBy: {
                createdAt: orderBy,
            },
            take: take || 10,
            skip: skip || 0,
            cursor: cursor ? { id: cursor } : undefined,
        });

        return allBlogs;

    } catch (e) {
        return [];
    }
}

export async function updateBlog(data: IBlogDetails) {
    try {
        const blog = await db.blogs.update({
            where: {
                notionDocsId: data.notionDocsId,
            },
            data,
        });
        return blog;
    } catch (e: any) {
        throw new Error("Error updating blog:", e);
    }
}

export async function createBlog(data: IBlogDetails) {
    try {
        const blog = await db.blogs.create({
            data,
        });
        return blog;
    } catch (e: any) {
        throw new Error("Error creating blog:", e);
    }
}

