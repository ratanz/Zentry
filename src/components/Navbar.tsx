import React, { useRef } from 'react'

const Navbar = () => {
    const navContainerRef = useRef<HTMLDivElement>(null)
  
    return (
   <>
    <div ref={navContainerRef}>

    </div>
   </>
  )
}

export default Navbar
