import React, { useState } from 'react'
import { ChevronDown, MoreHorizontal } from 'lucide-react'

function editCompanies() {
  const [selectedCount] = useState(1)
  const [showMore, setShowMore] = useState(false)

  return (
    <div className='bg-white border-b border-gray-200'>
      <div className='px-6 py-3 flex items-center justify-between gap-4'>
        {/* Left side - Selection count */}
        <div className='flex items-center gap-4'>
          <span className='text-sm font-medium text-gray-900'>
            {selectedCount} compan{selectedCount !== 1 ? 'ies' : 'y'} selected
          </span>
          <span className='text-gray-300'>→</span>
        </div>

        {/* Right side - Action buttons */}
        <div className='flex items-center gap-2'>
          <button className='px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition'>
            Assign
          </button>
          <button className='px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition'>
            ✏️ Edit
          </button>
          <button className='px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition'>
            🗑️ Delete
          </button>
          <button className='px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition'>
            Review Associations
          </button>
          <button className='px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition'>
            ➕ Create tasks
          </button>
          <button className='px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition'>
            Add to static segment
          </button>
          <button className='px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition'>
            Enroll in workflow
          </button>

          {/* More dropdown */}
          <div className='relative ml-2'>
            <button
              onClick={() => setShowMore(!showMore)}
              className='px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition flex items-center gap-1'
            >
              More
              <ChevronDown size={16} />
            </button>
            {showMore && (
              <div className='absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-10'>
                <button className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50'>
                  More option 1
                </button>
                <button className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50'>
                  More option 2
                </button>
              </div>
            )}
          </div>

          {/* Close button */}
          <button className='ml-2 text-gray-400 hover:text-gray-600 transition'>
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

export default editCompanies