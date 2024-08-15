import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useProteinsSpecies } from '../hooks/useProteinsSpecies'
import FeatureBrowser from "./FeatureBrowser";



const ResultsPage: React.FC<{ setFilter: React.Dispatch<React.SetStateAction<any[]>> }> = ({ setFilter }) => {

    const { speciesID } = useParams()

    const { proteinInfo } = useProteinsSpecies(speciesID)

    const handleClick = (proteinID) => {
        const filteredResults = proteinInfo.filter((protein) => {
            return protein.protein_id.includes(proteinID);
        })
        setFilter(filteredResults[0])
    }

  return (
    <>
    <div className='min-h-screen'>
    <FeatureBrowser />
        <div className='results-container mt-4 border-0 rounded-md text-slate-500 bg-[#e6e6e6]'>
            <ul className="px-8 py-2">
            {proteinInfo.map((protein, index) => (
                <Link to={{ pathname: `/structureindex/${protein.protein_id}`}}>
                <div onClick={() => handleClick(protein.protein_id)} className='result-card border-2 hover:border-[#4a95c0] rounded-md mt-4 mb-4 bg-[#f9f9f9]'>
                    <li className='text-2xl px-6 py-2 text-[#4a95c0] font-medium' key={index}
                    >{protein.protein_id}</li>
                    <li className='px-8'>plDDT Score: {protein.colabfold_log_pLDDT}</li>
                    <li className='px-8'>{protein.product}</li>
                    <li className='px-8'>{protein.Species}</li>
                </div>
                </Link>
            ))}
            </ul>
        </div>
    </div>
    </>
  );
};

export default ResultsPage;
