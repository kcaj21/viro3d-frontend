import React from 'react';
import { useParams } from "react-router-dom";
import { useProteinsGenbank } from '../hooks/useProteinsGenbank'


const ProteinInfo: React.FC = () => {

    const { structureID } = useParams()
    console.log(structureID)
    const { proteinInfo } = useProteinsGenbank(structureID);

    console.log(proteinInfo)
    

  return (
    <>
      <table className='border-spacing-4 text-left border-separate text-2xl text-slate-500'>
        <tr>
            <td className='text-6xl '>{proteinInfo['uniq_id']}</td>
        </tr>
        {/* <hr className=' h-0.5 w-[150%]  my-4 bg-slate-500'></hr> */}
        <hr className=' w-[150%] my-1  border-0'></hr>
        <tr>
        <th className='font-light text-5xl'>plDTT Score:</th>

            <td className='text-5xl'> {proteinInfo['colabfold_log_pLDDT']}</td>
        </tr>
        <hr className=' h-0.5 w-[150%]  my-4 bg-slate-500'></hr>
        <tr>
            <th className='font-extralight'>Tax ID:</th>
            <td>{proteinInfo['taxid']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Virus Name:</th>
            <td>{proteinInfo['Virus name(s)']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Genome coverage:</th>
            <td>{proteinInfo['Genome coverage']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Genome Composition:</th>
            <td>{proteinInfo['Genome composition']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Realm:</th>
            <td>{proteinInfo['Realm']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Kingdom:</th>
            <td>{proteinInfo['Kingdom']}</td>
        </tr>
        <tr>
            <th className='font-extralight'>Species:</th>
            <td>{proteinInfo['Species']}</td>
        </tr>
      </table>
    </>
  );
};

export default ProteinInfo;
