import React from 'react'
import { BlogRender } from '../../../components/NotionRenderer'
import { NotionAPI } from "notion-client";

const notion = new NotionAPI();

async function BlogPage({ params }: { params: { blogId: string } }) {
    let notionRecordMap: any = [];
    const blogId = (await params).blogId
    notionRecordMap = await notion.getPage(blogId);

    return (
        <div>
            <BlogRender recordMap={notionRecordMap} />
        </div>
    )
}

export default BlogPage