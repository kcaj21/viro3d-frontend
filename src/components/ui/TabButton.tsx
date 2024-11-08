import React from 'react'

const TabButton = ({ active, selectTab, children }) => {

    const buttonClasses = active ? 'text-[#4a95c0] border-b border-[#4a95c0]' : 'text-[#4a95c0]'

  return (
    <button onClick={selectTab}>
        <p className={`mr-3 font-semibold hover:text-[#50bde5] ${buttonClasses}`}>
        {children}
        </p>
    </button>
  )
}

export default TabButton