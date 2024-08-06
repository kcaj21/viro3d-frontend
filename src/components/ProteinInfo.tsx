import React from 'react';

type ProteinInfoProps = {
    GenBankID: string
}

const ProteinInfo: React.FC<ProteinInfoProps> = () => {


  return (
    <>
<h1 className='text-6xl mb-6'>plDDT Score: 89.2</h1>
  <ul className='text-slate-500 border-t mt-4 border-black '>
    <li className='text-4xl mt-2'>GenbankID: 123</li>
    <li className='text-4xl mt-2'>TaxID: 55012</li>
    <li className='text-4xl mt-2'>Sequence: AAURKMGISUWCCJAORJFLLGH</li>
    <li className='text-4xl mt-2'>Protein Length: 41</li>
    <li className='text-4xl mt-2'>Genome Composition: dsRNA</li>
    <li className='text-4xl mt-2'>Realm: Duplodnaviria</li>
    <li className='text-4xl mt-2'>Kingdom: Heunggongvirae</li>
    <li className='text-4xl mt-2'>Phylum: Peploviricota</li>
    <li className='text-4xl mt-2'>Class: Herviviricetes</li>
    <li className='text-4xl mt-2'>Order: Herpesvirales</li>
    <li className='text-4xl mt-2'>Family: Orthoherpesviridae</li>
    <li className='text-4xl mt-2'>Genus: Simplexvirus</li>
    <li className='text-4xl mt-2'>Species: Simplexvirus atelinealpha1</li>          
    <li className='text-4xl mt-2'>Genome Composition: dsRNA</li>
  </ul>
    </>
  );
};

export default ProteinInfo;

