import React from 'react'
import DealsHeader from './Deals-header'
import DealsFilter from './DealsFilter'

const Deals = () => {
  return (
    <div className='border-2  shadow-2xl rounded-2xl h-full'>
      <DealsHeader/>
      <DealsFilter/>
    </div>
  )
}

export default Deals