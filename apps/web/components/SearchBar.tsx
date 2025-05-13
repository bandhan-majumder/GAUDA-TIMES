"use client";
import { Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function SearchBar() {
    const searchExamples = [
        "What happended to the Titanic?",
        "Why India is fighting with China?",
        "Why Pakistan is fighting with India?",
    ];

    const [placeholderText, setPlaceholderText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [exampleIndex, setExampleIndex] = useState(0);

    useEffect(() => {
        // Function to handle the typewriter effect
        const typewriterEffect = () => {
            if (isTyping) {
                // Typing phase
                if (searchExamples[exampleIndex] && currentIndex < searchExamples[exampleIndex].length) {
                    setPlaceholderText(prev => prev + (searchExamples[exampleIndex]?.[currentIndex] || ""));
                    setCurrentIndex(prev => prev + 1);
                } else {
                    // Finished typing, pause before erasing
                    setIsTyping(false);
                    setCurrentIndex(searchExamples[exampleIndex]?.length ?? 0);
                }
            } else {
                // Erasing phase
                if (currentIndex > 0) {
                    setPlaceholderText((searchExamples[exampleIndex] ?? "").substring(0, currentIndex - 1));
                    setCurrentIndex(prev => prev - 1);
                } else {
                    // Finished erasing, move to next example
                    setIsTyping(true);
                    setExampleIndex((exampleIndex + 1) % searchExamples.length);
                    setPlaceholderText("");
                }
            }
        };

        // Timing control for different phases
        const timer = setTimeout(() => {
            typewriterEffect();
        }, isTyping ? 50 : (!isTyping && currentIndex === (searchExamples[exampleIndex]?.length ?? 0)) ? 2000 : 50);

        return () => clearTimeout(timer);
    }, [currentIndex, exampleIndex, isTyping, searchExamples]);

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <div className='relative max-w-xl w-full'>
                <input
                    type="text"
                    className="bg-black/30 text-white rounded-2xl p-4 w-full max-w-xl mx-auto outline-none border"
                    placeholder={placeholderText}
                />
                <div className='absolute bottom-4 right-2'>
                    <Search size={24} className='text-white cursor-pointer' />
                </div>
            </div>
        </div>
    );
}

export default SearchBar;