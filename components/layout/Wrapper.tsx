import React from 'react'

function Wrapper({children}: {children: React.ReactNode}) {
  return (
    <div className='h-screen w-screen overflow-hidden bg-gradient-to-b from-[#8A50FD] to-[#350ABC] flex flex-col'>
      {children}
    </div>
  )
}

export default Wrapper
