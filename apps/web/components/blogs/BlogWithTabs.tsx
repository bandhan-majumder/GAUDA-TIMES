"use client";

import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@repo/ui"
import { useEffect, useState } from "react";
import BlogHighlight from "./BlogHighlight";
import { PaginationBlog } from "../Pagination";

interface IBlog {
    id: string;
    title: string;
    description: string;
    imageURL: string;
    notionDocsId: string;
    createdAt: string;
    updatedAt: string;
}

export function HomeBlogs() {
    const [sortBy, setSortBy] = useState<string>("new");
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/api/blog");
                if (!response.ok) {
                    throw new Error("Failed to fetch blogs");
                }
                const data = await response.json();
                setBlogs(data.allBlogs || []);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("Failed to load blogs. Please try again later.");
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [])

    if (loading) {
        return (
            <div className="py-8 flex justify-center">

            </div>
        );
    }

    if (error && blogs.length === 0) {
        return <div className="text-center py-8 text-destructive">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full  mx-auto px-4">
            <div className="flex justify-between w-full max-w-4xl mt-10">
                <div className=" flex flex-col justify-between">
                    <h1 className="text-2xl md:text-4xl font-bold text-white">Blogs</h1>
                    <p className="text-gray-400 mt-2 text-sm md:text-base">Visit blogs from the Gauda Times</p>
                </div>
                <div>
                    <Select onValueChange={(e) => setSortBy(e)}>
                        <SelectTrigger className="w-[120px] text-white text-md mt-10 border border-gray-600">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="shadow-neutral-600/5 backdrop-blur-lg p-1 outline-none rounded-2xl border-none">
                            <SelectGroup className=" text-white">
                                <SelectItem value="ascending" className="outline-none hover:bg-gray-700 p-2 cursor-pointer md:text-md">All</SelectItem>
                                <SelectItem value="descending" className="outline-none hover:bg-gray-700 p-2 cursor-pointer md:text-md">Older</SelectItem>
                                <SelectItem value="new" className="outline-none hover:bg-gray-700 p-2 cursor-pointer md:text-md">Newer</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2 w-full max-w-4xl mt-10">
                {blogs.map((blog) => (
                    <div className="w-full" key={blog.notionDocsId || blog.id}>
                        <BlogHighlight
                        key={blog.notionDocsId || blog.id}
                        id={blog.notionDocsId || blog.id}
                        title={blog.title}
                        description={blog.description}
                        image={blog.imageURL}
                        createdAt={blog.createdAt}
                    />
                    </div>
                ))}
            </div>

            <PaginationBlog />
        </div>
    )
}
