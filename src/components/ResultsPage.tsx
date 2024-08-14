import React from 'react';
import { useProteinsGenbank } from '../hooks/useProteinsGenbank'

type GenbankID = {
    id: string;
}

const ResultsPage: React.FC<GenbankID> = ({ id }) => {

    const { proteinInfo } = useProteinsGenbank(id)

  return (
      <>
          {proteinInfo.map((protein, index) => (
              <li key={index}
              >{protein.uniq_id}</li>
          )   
          )
          }
    </>
  );
};

export default ResultsPage;
