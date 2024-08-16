import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useProteinData } from "../hooks/useProteinData";

import FeatureBrowser from "./FeatureBrowser";

const ResultsPage: React.FC<{
  setFilter: React.Dispatch<React.SetStateAction<any[]>>;
}> = ({ setFilter }) => {
  const { filterParam, searchParam } = useParams();

  const { proteinInfo } = useProteinData(filterParam, searchParam);

  console.log(filterParam, searchParam)

  const handleClick = (proteinID) => {
    const filteredResults = proteinInfo.filter((protein) => {
      return protein.protein_id.includes(proteinID);
    });
    setFilter(filteredResults[0]);
  };

  return (
    <>
      <div className="min-h-screen">
        <FeatureBrowser />
        <div className="results-container mt-4 border-0 text-5xl rounded-md drop-shadow-lg text-slate-500 bg-[#e6e6e6]">
          <ul className="px-8 py-2">
            {proteinInfo.map((protein, index) => (
              <Link to={{ pathname: `/structureindex/${protein.protein_id}` }}>
                <div
                  onClick={() => handleClick(protein.protein_id)}
                  className="result-card drop-shadow-md flex flex-col-2 gap-8 border-2 hover:border-[#4a95c0] rounded-md mt-4 mb-4 bg-[#f9f9f9]"
                >
                  <div className="basis-1/4">
                    <li
                      className=" px-6 py-2 text-[#4a95c0] font-medium"
                      key={index}
                    >
                      {protein.protein_id}
                    </li>
                  </div>
                  <div className="basis-3/4 text-3xl font-thin">
                    <li className="px-8">
                      plDDT Score: {protein.colabfold_log_pLDDT}
                    </li>
                    <li className="px-8">{protein.gene}</li>
                    <li className="px-8">{protein.Species}</li>
                  </div>
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
