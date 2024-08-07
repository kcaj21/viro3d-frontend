import React, { useState, useEffect } from 'react';

const ProteinInfo: React.FC<ProteinInfoProps> = () => {
  // Initialize proteinInfo as an empty array instead of undefined
  const [proteinInfo, setProteinInfo] = useState([]);

  async function fetchData(): Promise<any> {
    const response = await fetch('http://localhost:8000/genbankid/CAX33877.1');
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchData().then((data) => setProteinInfo(data.protein_structures));
  }, []);

  return (
    <>
      <h1 className='text-6xl mb-6'>plDDT Score: 89.2</h1>
      {/* Render the list only if proteinInfo has items */}
      {proteinInfo.length > 0 && proteinInfo.map((protein) => (
        <ul className='text-slate-500 border-t mt-4 border-black' key={protein.uniq_id}>
          <li>{protein.uniq_id}</li>
          <li>{protein.taxid}</li>
        </ul>
      ))}
    </>
  );
};

export default ProteinInfo;
