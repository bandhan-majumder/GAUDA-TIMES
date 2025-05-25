"use client";
import React, { useState, useCallback, useEffect } from 'react'
import { Search } from 'lucide-react'

const sampleData = [
  {
    id: 1,
    title: 'React Official Documentation',
    url: 'https://reactjs.org/',
  },
  {
    id: 2,
    title: 'Mozilla Developer Network (MDN)',
    url: 'https://developer.mozilla.org/',
  },
  {
    id: 3,
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com/',
  },
  {
    id: 4,
    title: 'GitHub',
    url: 'https://github.com/',
  },
  {
    id: 5,
    title: 'npm',
    url: 'https://www.npmjs.com/',
  },
]

const GoogleSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const handleSearch = useCallback(
    debounce((term) => {
      if (term.trim() === '') {
        setSearchResults([])
      } else {
        const results = sampleData.filter((item) =>
          item.title.toLowerCase().includes(term.toLowerCase()),
        )
        setSearchResults(results)
      }
    }, 300),
    [],
  )

  useEffect(() => {
    handleSearch(searchTerm)
  }, [searchTerm, handleSearch])

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex h-auto flex-col items-center p-4">
      <div className="relative w-full max-w-2xl mb-8">
        <div onSubmit={handleSubmit} className="w-full">
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
                onClick={() =>
                  alert(
                    'Voice search is unsupported in this demo.\nTry implementing this feature yourself 🙂',
                  )
                }
              >
              </button>
              <button type="button" className="text-blue-500 hover:text-blue-600">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Results Overlay */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-[#1C1C1C] text-white p-4 shadow-lg z-50 max-h-96 overflow-y-auto">
            <h2 className="mb-4 text-xl font-bold">Search Results:</h2>
            <ul>
              {searchResults.map((result) => (
                <li key={result.id} className="mb-2">
                  <a
                    href={result.url}
                    className="text-blue-400 hover:text-blue-300 hover:underline block py-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default GoogleSearchBar