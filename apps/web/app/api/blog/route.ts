"use server";

import { NextResponse } from "next/server";
import { createBlog, getAllBlogs, updateBlog } from "../../../lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.admin) {
    return NextResponse.json("Unauthorized", {
      status: 401,
    });
  }

  const data = await request.json();
  const newBlog = await createBlog(data);
  if (!newBlog || !newBlog.id) {
    return NextResponse.json("Failed to create blog", {
      status: 500,
    });
  }
  return NextResponse.json({
    blogId: newBlog.id,
  }, {
    status: 201,
  });
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.admin) {
    return NextResponse.json("Unauthorized", {
      status: 401,
    });
  }
  const data = await request.json();
  const updatedBlog = await updateBlog(data);
  if (!updatedBlog || !updatedBlog.id) {
    return NextResponse.json("Failed to update blog", {
      status: 500,
    });
  }
  return NextResponse.json({
    blogId: updatedBlog.id,
  }, {
    status: 200,
  });
}

// get all blogs based on pagination.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const take = parseInt(url.searchParams.get("take") || "10", 10);
  const skip = parseInt(url.searchParams.get("skip") || "0", 10);
  const cursor = url.searchParams.get("cursor") || undefined;
  const sortBy = url.searchParams.get("sortBy");
  const orderBy: "asc" | "desc" = sortBy === "asc" || sortBy === "desc" ? sortBy : "desc";

  const allBlogs = await getAllBlogs({ take, skip, cursor, orderBy });
  if (!allBlogs || allBlogs.length === 0) {
    return NextResponse.json("No blogs found", {
      status: 404,
    });
  }

  console.log("allBlogs", allBlogs);
  return NextResponse.json({
    allBlogs
  }, {
    status: 200,
  });
}