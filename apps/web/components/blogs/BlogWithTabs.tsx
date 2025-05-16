"use client";

import * as React from "react"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui"
import { useState } from "react";
import BlogHighlight from "./BlogHighlight";
import { BlogSkeleton } from "./BlogSkeleton";
import NoBlogFound from "./NoBlogFound";
import BlogLoadError from "./BlogLoadError";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");
    const [currentPage, setCurrentPage] = useState(1);
    
    // Number of items to fetch per page
    const itemsPerPage = 10;
    const skip = (currentPage - 1) * itemsPerPage;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['blogs', sortBy, skip, itemsPerPage],
        queryFn: async () => {
            const response = await axios.get(`/api/blog?sortBy=${sortBy}&skip=${skip}&limit=${itemsPerPage}`);
            return response.data;
        }
    });

    const blogs = data?.allBlogs || [];
    const totalBlogs = data?.totalCount || 0;
    const totalPages = Math.ceil(totalBlogs / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Generate the pagination numbers to display
    const getPaginationNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            // Show all pages if there are 5 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show the first page
            pages.push(1);

            // Show ellipsis if current page is more than 3
            if (currentPage > 3) {
                pages.push(-1); // -1 represents ellipsis
            }

            // Show pages around current page
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Show ellipsis if current page is less than totalPages - 2
            if (currentPage < totalPages - 2) {
                pages.push(-2); // -2 represents ellipsis
            }

            // Always show the last page
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mx-auto px-4">
            <div className="flex justify-between w-full max-w-4xl mt-10">
                <div className="flex flex-col justify-between">
                    <h1 className="text-2xl md:text-4xl font-bold text-white">Blogs</h1>
                    <p className="text-gray-400 mt-2 text-sm md:text-base">Visit blogs from the Gauda Times</p>
                </div>
                <div>
                    <Select onValueChange={(e) => {
                        setSortBy(e as "asc" | "desc");
                        setCurrentPage(1); // Reset to first page on sort change
                    }}>
                        <SelectTrigger className="w-[120px] text-white text-sm mt-10 border border-gray-600">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="shadow-neutral-600/5 backdrop-blur-lg p-1 outline-none rounded-2xl border-none">
                            <SelectGroup className="text-white border border-gray-600 rounded-lg">
                                <SelectItem value="asc" className="outline-none hover:bg-gray-700 p-2 cursor-pointer md:text-md">Older</SelectItem>
                                <SelectItem value="desc" className="outline-none hover:bg-gray-700 p-2 cursor-pointer md:text-md">Newer</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2 w-full max-w-4xl my-10">
                {isLoading ? (
                    <>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </>
                ) : isError ? (
                    <BlogLoadError />
                ) : blogs.length === 0 ? (
                    <NoBlogFound />
                ) : (
                    blogs.map((blog: IBlog) => (
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
                    ))
                )}
            </div>

            {!isLoading && blogs.length > 0 && totalPages > 1 && (
                <div>
                    <Pagination className="mb-8 text-white">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    size={"lg"}
                                    className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                />
                            </PaginationItem>

                            {getPaginationNumbers().map((pageNum, index) => (
                                <React.Fragment key={index}>
                                    {pageNum === -1 || pageNum === -2 ? (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    ) : (
                                        <PaginationItem>
                                            <PaginationLink
                                                size={"lg"}
                                                isActive={currentPage === pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className="cursor-pointer"
                                            >
                                                {pageNum}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                </React.Fragment>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    size={"lg"}
                                    className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}