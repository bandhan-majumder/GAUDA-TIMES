import React from 'react'
import { BlogRender } from '../../../components/NotionRenderer'
import { NotionAPI } from "notion-client";
import { Ban } from 'lucide-react';
import Link from 'next/link';

const notion = new NotionAPI();

type Params = Promise<{ blogId: string }>

async function BlogPage(props: { params: Params }) {
    let notionRecordMap: any = [];
    const blogId = (await props.params).blogId
    try{
        notionRecordMap = await notion.getPage(blogId);

    return (
        <div>
            <BlogRender recordMap={notionRecordMap} />
        </div>
    )
    } catch (e){
        console.error("Error fetching blog page:", e);
        return (
            <div className="flex items-center justify-center h-screen gap-2 flex-col">
                <Ban size={24} color='red'/>
                <h1 className="text-2xl font-bold text-red-500">Blog not found</h1>
                <Link href={"/"} className='text-gray-400 underline text-xl'>Go to home</Link>

            </div>
        )
    }
}

export default BlogPage