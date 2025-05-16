import React from 'react'
import { MdMoodBad } from 'react-icons/md'

function NoBlogFound() {
    return (
        <div className="text-center py-8 text-gray-400">
            <div className="flex gap-3 justify-center items-center text-2xl">
                No blogs found <MdMoodBad size={40} />
            </div>
        </div>
    )
}

export default NoBlogFound