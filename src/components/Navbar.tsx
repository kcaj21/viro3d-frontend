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
      <nav className='fixed top-0 left-0 right-0 z-20 border-b-2 text-[#4a95c0] drop-shadow-md bg-[#e6e6e6]'>
        <div className='flex items-center md:justify-center sm: justify-end mx-auto px-4 py-2'>
          <ul className='flex p-4 md:p-0 md:flex-row md:space-x-32 font-extralight text-4xl text-[#4a95c0]'>
            <li>
              About
            </li>
            <li>
              Downloads
            </li>
            <li>
              API
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

