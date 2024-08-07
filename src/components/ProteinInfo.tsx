import React, { useState, useEffect } from 'react';

const ProteinInfo: React.FC = () => {
  const [proteinInfo, setProteinInfo] = useState([]);
  const [filteredProtein, setFilteredProtein] = useState([]);

  async function fetchData(): Promise<any> {
    const response = await fetch('http://localhost:8000/genbankid/CAX33877.1');
    const data = await response.json();
    return data.protein_structures;
  }

  useEffect(() => {
    fetchData().then((data) => setProteinInfo(data));
  }, []);

  useEffect(() => {
    filterProtein('CAX33877.1.4'); //
  }, [proteinInfo]); 

  const filterProtein = (text) => {
    const result = proteinInfo.filter((protein) => {
      return protein.uniq_id.includes(text);
    });
    setFilteredProtein(result);
  };

  const proteinItems = filteredProtein.map((property) => {

    //text-[#4a95c0]

    return ( 
      <table className='border-spacing-4 text-left border-separate text-2xl text-slate-500' key={property['uniq_id']}>
        <tr>
            <td className='text-6xl '>{property['uniq_id']}</td>
        </tr>
        {/* <hr className=' h-0.5 w-[150%]  my-4 bg-slate-500'></hr> */}
        <hr className=' w-[150%] my-1  border-0'></hr>
        <tr>
        <th className='font-light text-5xl'>plDTT Score:</th>

            <td className='text-5xl'> {property['colabfold_log_pLDDT']}</td>
        </tr>
        <hr className=' h-0.5 w-[150%]  my-4 bg-slate-500'></hr>
        <tr>
            <th className='font-extralight'>Tax ID:</th>
            <td>{property['taxid']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Virus Name:</th>
            <td>{property['Virus name(s)']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Genome coverage:</th>
            <td>{property['Genome coverage']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Genome Composition:</th>
            <td>{property['Genome composition']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Realm:</th>
            <td>{property['Realm']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Kingdom:</th>
            <td>{property['Kingdom']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Species:</th>
            <td>{property['Species']}</td>
        </tr>
      </table>
    )
});


  return (
    <>
      {proteinItems}
    </>
  );
};

export default ProteinInfo;
