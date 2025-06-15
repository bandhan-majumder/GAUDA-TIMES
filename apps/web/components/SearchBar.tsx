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
  const [isSearching, setIsSearching] = useState<boolean>(false)

  // Fetch blogs in background - don't block UI rendering
  const { data: blogsData, isLoading: isBlogsLoading } = useQuery({
    queryKey: ['allBlogs'],
    queryFn: () => getAllBlogs({ take: 1000000, skip: 0, orderBy: 'desc' }),
    staleTime: 1000 * 60 * 60, 
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
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

  // Search handler with proper typing and loading state
  const handleSearch = useCallback(
    debounce((term: string): void => {
      if (term.trim() === '') {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)

      if (blogsData?.allBlogs) {
        const results = blogsData.allBlogs.filter((item: SearchItem) =>
          item.title.toLowerCase().includes(term.toLowerCase()) ||
          item.description.toLowerCase().includes(term.toLowerCase())
        )
        setSearchResults(results)
        setIsSearching(false)
      } else {
        setIsSearching(true)
      }
    }, 300),
    [blogsData?.allBlogs]
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

  // Render search bar immediately - don't wait for data
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
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </form>

        {searchTerm.trim() !== '' && (isSearching || isBlogsLoading) && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-[#1C1C1C] text-white p-4 shadow-lg z-50">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span className="text-gray-300">
                {isBlogsLoading ? 'Loading blogs...' : 'Searching...'}
              </span>
            </div>
          </div>
        )}

        {searchResults.length > 0 && !isSearching && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-[#1C1C1C] text-white p-4 shadow-lg z-50 max-h-96 overflow-y-auto">
            <h2 className="mb-4 text-xl font-bold">
              Search Results ({searchResults.length}):
            </h2>
            <ul>
              {searchResults.map((result: SearchItem) => (
                <li key={result.id} className="mb-3 last:mb-0">
                  <Link 
                    href={`/blog/${result.id}`} 
                    className="block hover:bg-gray-800 rounded p-2 transition-colors"
                  >
                    <div className="font-medium text-blue-400 hover:text-blue-300">
                      {result.title}
                    </div>
                    {result.description && (
                      <div className="text-sm text-gray-300 mt-1">
                        {result.description.length > 100 
                          ? `${result.description.substring(0, 100)}...` 
                          : result.description
                        }
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {searchTerm.trim() !== '' && 
         searchResults.length === 0 && 
         !isSearching && 
         !isBlogsLoading && 
         blogsData?.allBlogs && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-[#1C1C1C] text-white p-4 shadow-lg z-50">
            <div className="text-gray-300">No blogs found for "{searchTerm}"</div>
          </div>
        )}

        {searchTerm.trim() !== '' && !blogsData && !isBlogsLoading && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-[#1C1C1C] text-white p-4 shadow-lg z-50">
            <div className="text-red-400">
              Unable to load blogs. Please try again later.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GoogleSearchBar