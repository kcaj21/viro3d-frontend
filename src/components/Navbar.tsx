import React from 'react';

type Link = {
  title: string,
  href: string
}

type NavbarProps = {
  links: Link []
}

const Navbar: React.FC = () => {

  return (
    <>
      <nav className='fixed top-0 left-0 right-0 z-20 border-b-2 border-[#d6d5d5] text-[#4a95c0] drop-shadow-md bg-[#e6e6e6]'>
        <div className='flex items-center md:justify-around sm: justify-end mx-auto px-4 py-2'>
          <img src='src/assets/CVR_RGB.png' width='200'></img>
        <input className=' text-slate-500 pl-4 outline-none h-12 w-1/2 border-none rounded-md text-2xl  bg-[#f9f9f9]' type='text' placeholder='Search by GenbankID, Species, Gene or Sequence...'></input>
          <ul className='flex  p-4 md:p-0 md:flex-row md:space-x-32 font-extralight text-4xl text-[#4a95c0]'>
            <button className='hover:text-[#50bde5]'>
              About
            </button>
            <button className='hover:text-[#50bde5]'>
              Downloads
            </button>
            <button className='hover:text-[#50bde5]'>
              API
            </button>
          </ul>
        </div>

      </nav>
    </>
  );
};

export default Navbar;

