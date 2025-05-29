"use client";
import React, { useState, useCallback, useEffect, FormEvent, ChangeEvent } from 'react'
import { Search } from 'lucide-react'
import { getAllBlogs } from '../lib/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

// Type definitions
interface SearchItem {
  id: number;
  title: string;
  description: string;
}

interface BlogsResponse {
  allBlogs: SearchItem[];
}

type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

const GoogleSearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])

  // Fetch all blogs using React Query
  const { data: blogsData, isLoading, error } = useQuery({
    queryKey: ['allBlogs'],
    queryFn: () => getAllBlogs({ take: 1000000, skip: 0, orderBy: 'desc' }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Debounce function with proper typing
  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): DebouncedFunction<T> => {
    let timeoutId: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  // Search handler with proper typing
  const handleSearch = useCallback(
    debounce((term: string): void => {
      if (term.trim() === '') {
        setSearchResults([])
      } else if (blogsData?.allBlogs) {
        console.log('blogsData: ', blogsData?.allBlogs);
        //@ts-ignore
        const results: BlogsResponse = blogsData.allBlogs.filter((item: SearchItem) =>
          item.title.toLowerCase().includes(term.toLowerCase()) ||
          item.description.toLowerCase().includes(term.toLowerCase())
        )
        //@ts-ignore
        setSearchResults(results)
      }
    }, 300),
    [blogsData?.allBlogs], // Add blogsData as dependency
  )

  useEffect(() => {
    handleSearch(searchTerm)
  }, [searchTerm, handleSearch])

  // Event handlers with proper typing
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // You can add additional submit logic here if needed
  }

  const handleVoiceSearch = (): void => {
    alert(
      'Voice search is unsupported in this demo.\nTry implementing this feature yourself 🙂',
    )
  }

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex h-auto flex-col items-center p-4">
        <div className="w-full max-w-2xl mb-8">
          <div className="text-center text-gray-500">Loading blogs...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-auto flex-col items-center p-4">
        <div className="w-full max-w-2xl mb-8">
          <div className="text-center text-red-500">Error loading blogs</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-auto flex-col items-center p-4">
      <div className="relative w-full max-w-2xl mb-8">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full rounded-full border border-gray-200 px-5 py-3 pr-20 text-base shadow-md transition-shadow duration-200 hover:shadow-lg focus:border-gray-300 focus:outline-none"
              placeholder="search blogs.."
            />
            <div className="absolute right-0 top-0 mr-4 mt-3 flex items-center">
              <button
                type="button"
                className="mr-3 text-gray-400 hover:text-gray-600"
                onClick={handleVoiceSearch}
                aria-label="Voice search"
              >
                {/* Voice search icon would go here */}
              </button>
              <button
                type="submit"
                className="text-blue-500 hover:text-blue-600"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </form>

        {/* Search Results Overlay */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-[#1C1C1C] text-white p-4 shadow-lg z-50 max-h-96 overflow-y-auto">
            <h2 className="mb-4 text-xl font-bold">Search Results:</h2>
            <ul>
              {searchResults.map((result: SearchItem) => (
                <li key={result.id} className="mb-2">
                  <Link href={`/blog/${result.id}`} className="text-blue-500 hover:underline">
                    <div className="font-medium">{result.title}</div>
                    {result.description && (
                      <div className="text-sm text-gray-300 mt-1">
                        {result.description.substring(0, 100)}...
                      </div>
                    )}
                  </Link>

                </li>
              ))}
            </ul>
          </div>
        )}

        {/* No results message */}
        {searchTerm.trim() !== '' && searchResults.length === 0 && blogsData?.allBlogs && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-[#1C1C1C] text-white p-4 shadow-lg z-50">
            <div className="text-gray-300">No blogs found for "{searchTerm}"</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GoogleSearchBar