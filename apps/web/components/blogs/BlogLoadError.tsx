import { CircleX } from 'lucide-react'
import React from 'react'

function BlogLoadError() {
    return (
        <div className='flex gap-3 justify-center items-center'>
            <p>Failed to load blogs</p>
            <CircleX size={24} />
        </div>
    )
}

export default BlogLoadError