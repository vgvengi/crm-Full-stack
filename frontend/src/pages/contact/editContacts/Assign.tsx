import React from 'react'

type AssignProps = {
  count: number;
  onClose: () => void;
};

export const Assign = ({count, onClose}:AssignProps) => {
  return (
   <div className="fixed inset-0 z-900 flex items-center justify-center">
       {/* Backdrop */}
       <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={() => onClose()}
       />
   
       {/* Modal */}
       <div className="relative w-[520px] rounded-2xl bg-white shadow-2xl">
         
         {/* Header */}
         <div className="flex items-center justify-between border-b px-12 py-5">
           <h2 className="text-xl font-semibold text-gray-900">
             Bulk assign {count} record{count !== 1 ? "s" : ""}
           </h2>
   
           <button
             onClick={() => onClose()}
             className="text-2xl text-gray-500 hover:text-gray-800"
           >
             ×
           </button>
         </div>
   
         {/* Body */}
         <div className="px-12 py-10">
           <label className="mb-2 block text-sm font-semibold text-gray-900">
             Contact owner
           </label>
   
           <select
             className="w-full rounded-md border border-gray-400 bg-white px-4 py-3
                        text-base text-gray-800 outline-none
                        focus:border-gray-600"
           >
             <option>No owner</option>
             <option>Vengatesh</option>
             <option>John</option>
           </select>
         </div>
   
         {/* Footer */}
         <div className="flex gap-3 px-12 pb-7">
           <button
             className="rounded-md bg-black px-7 py-3 text-sm font-semibold text-white
                        hover:bg-gray-800"
           >
             Update
           </button>
   
           <button
             onClick={() => onClose()}
             className="rounded-md border border-gray-400 bg-white px-7 py-3
                        text-sm font-semibold text-gray-800 hover:bg-gray-50"
           >
             Cancel
           </button>
         </div>
       </div>
     </div>
  )
}
