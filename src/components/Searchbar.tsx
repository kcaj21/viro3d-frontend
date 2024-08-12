import React from 'react';

const Searchbar: React.FC = () => {

  return (
    <>
        <div className=''>
            <input className='w-full outline-none border-b-2 border-slate-500 text-2xl  bg-[#f9f9f9]' type='text' placeholder='Search by GenbankID, Species, Gene or Sequence...'></input>
        </div>
    </>
  );
};

export default Searchbar;

