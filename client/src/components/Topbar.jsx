import React from 'react'
import logo from "@/assets/images/logo-white.png"
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { MdLogin } from "react-icons/md";
import SearchBox from './SearchBox';

const Topbar = () => {
  return (
   <>
   <div className='flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b'>

<div>
  <img src={logo} alt="" />
</div>
<div className='w-[500px]'>
   <SearchBox></SearchBox>

</div>
<div className='rounded-full'>
  <Button className="rounded-full" asChild>
    
    <Link><MdLogin/>Sign in</Link>
  </Button>

</div>
   </div>
   </>
  )
}

export default Topbar