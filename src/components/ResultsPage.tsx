import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useProteinData } from "../hooks/useProteinData";

import FeatureBrowser from "./FeatureBrowser";

const ResultsPage: React.FC<{
  setFilter: React.Dispatch<React.SetStateAction<any[]>>;
}> = ({ setFilter }) => {

  const [currentPage, setCurrentPage] = useState(1)

  const { filterParam, searchParam } = useParams();

  const { proteinInfo, resultCount, isLoading } = useProteinData(filterParam, searchParam, currentPage);

  // console.log(filterParam, searchParam)

  useEffect(() => {
    setCurrentPage(1)
}, [searchParam]);

  const handleSelectStructure = (proteinID) => {
    const filteredResults = proteinInfo.filter((protein) => {
      return protein.protein_id.includes(proteinID);
    });
    setFilter(filteredResults[0]);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  };

  return !proteinInfo
    ? (
    <>
<div className="min-h-screen">
        <div className="results-container flex flex-col items-center h-screen justify-center">
          <h2 className="mb-12 text-5xl text-slate-500">Searching...</h2>
            <svg aria-hidden="true" className="w-[15%] h-[15%] text-[#e6e6e6] animate-spin dark:text-gray-[#f9f9f9] fill-[#4a95c0]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="min-h-screen">
        <FeatureBrowser />
          <div className="results-container min-h-screen mt-4 mb-4 border-0 text-5xl rounded-md drop-shadow-lg text-slate-500 bg-[#e6e6e6]">
            <div className='buttom-row flex flex-row justify-between font-light text-[#4a95c0]'>
              <p className ='px-8 mt-6'>Showing {resultCount} results for "{searchParam}"</p>
              <div className='pagination flex flex-col-2 gap-4 justify-end font-light px-8 py-4 text-[#4a95c0]'>
                {currentPage > 1 && (
                <button onClick={handlePrevPage} className='border-2 drop-shadow-md rounded-md bg-[#f9f9f9] hover:border-[#4a95c0] px-2 py-2'>Prev</button>
                )}
                <p className='py-2'>{currentPage} of {Math.ceil(resultCount / 10)}</p>
                {currentPage < Math.ceil(resultCount / 10) && (
                  <button onClick={handleNextPage} className='border-2 drop-shadow-md rounded-md bg-[#f9f9f9] hover:border-[#4a95c0] px-2 py-2'>Next</button>
                )}
              </div>
            </div>
            <ul className="px-8 py-2">
              {proteinInfo.map((protein) => (
                <Link to={{ pathname: `/structureindex/${protein._id}` }} key={protein._id}>
                  <div 
                    onClick={() => handleSelectStructure(protein.protein_id)}
                    className="result-card drop-shadow-md min-h-[10%] flex flex-col-2 gap-8 border-2 hover:border-[#4a95c0] rounded-md  mb-4 bg-[#f9f9f9]"
                  >
                    <div className="basis-1/4 py-4">
                      <li
                        className=" px-6 py-2 text-[#4a95c0] font-light"
                        
                      >
                        {protein.protein_id}
                      </li>
                    </div>
                    <div className="basis-3/4 py-4 text-3xl font-thin">
                      <li className="px-8">
                        plDDT Score: {protein.colabfold_log_pLDDT}
                      </li>
                      <li className="px-8"> Product: {protein.product}</li>
                      <li className="px-8"> Species: {protein.Species}</li>
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
