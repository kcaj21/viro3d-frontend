import React from 'react';
import { useParams } from "react-router-dom";
import { useProteinsSpecies } from '../hooks/useProteinsSpecies'


const ResultsPage: React.FC = () => {

    const { speciesID } = useParams()

    const { proteinInfo } = useProteinsSpecies(speciesID)

  return (
      <>
      <div className='min-h-screen'>
            <ul>
            {proteinInfo.map((protein, index) => (
            <div>
                <li key={index}
                >{protein.protein_id}</li>
                <li>{protein.taxid}</li>
            </div>

            )   
            )
            }
            </ul>
        </div>
    </>
  );
};

export default ResultsPage;
