"use server";
import db from "@repo/db/client";
import { IBlogDetails } from "../types";
// import { cache } from "@repo/db/cache"; // for future optimization usage

export async function getBlog(blogId: string | null) {
    if (!blogId) {
        return null;
    }

    /*
    const value = await cache.get("getBlog", [blogId.toString()]);
    if (value) {
        return value;
    }
        */

    try {
        const blog = await db.blogs.findUnique({
            where: {
                id: blogId,
            },
        });
        // await cache.set("getBlog", [blogId.toString()], blog);
        return blog;
    } catch (err) {
        return null;
    }
}

export async function getAllBlogs({
    take = 10,
    skip = 0,
    cursor,
    orderBy = "desc"
}: {
    take?: number;
    skip?: number;
    cursor?: string,
    orderBy?: "desc" | "asc"
} = {}) {
    /*
    const cacheKey = ["getAllBlogs", take.toString(), skip.toString(), orderBy];
    const cachedData = await cache.get("getAllBlogs", cacheKey);
    if (cachedData) {
        return cachedData;
    }
        */
    
    try {
        const totalCount = await db.blogs.count();
        const allBlogs = await db.blogs.findMany({
            orderBy: {
                createdAt: orderBy,
            },
            take: take,
            skip: skip || 0,
            cursor: cursor ? { id: cursor } : undefined,
        });

        const result = {
            allBlogs,
            totalCount
        };

        // await cache.set("getAllBlogs", cacheKey, result);
        return result;
    } catch (e) {
        console.error("Error fetching blogs:", e);
        return {
            allBlogs: [],
            totalCount: 0
        };
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
        
        // await cache.evict("getAllBlogs", []);
        // await getAllBlogs();

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

