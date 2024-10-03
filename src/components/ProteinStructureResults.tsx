import React from "react";
import { Link } from "react-router-dom";
import ResultToolTip from "./ui/ResultToolTip";

const ProteinStructureResults: React.FC = ({ data, filterParam }) => {
  return filterParam !== "sequencematch" ? (
    <>
      <ul className="px-8 py-8 grid grid-cols-2 gap-4">
        {data.protein_structures?.map((protein) => (
          <Link
            to={{
              pathname: `/structureindex/${protein["Virus name(s)"]}/${protein._id}`,
            }}
            key={protein._id}
          >
            <div className="result-card hover:-translate-y-1 transition ease-in-out drop-shadow-md sm:min-h-[10vh] sm:max-h-[10vh] lg:min-h-[15vh] lg:max-h-[15vh] 2xl:min-h-[15vh] 2xl:max-h-[15vh] flex flex-row justify-between border-2 border-[#4a95c0] hover:border-[#50bde5] rounded-md bg-[#f9f9f9]">
              <div className="px-4 py-2 flex flex-col gap-2 basis-2/3">
                <div className="">
                  <li className="2xl:text-2xl lg:text-xl sm:text-sm text-[#4a95c0] font-light">
                    {protein.genbank_name.substring(0, 70)}
                  </li>
                </div>
                <div className="sm:hidden xl:block lg:text-base 2xl:text-xl font-thin">
                  {/* <li className=""> Product: {protein.product}</li> */}
                  <li className="">Peptide Category: {protein.pept_cat}</li>
                </div>
              </div>
              <div className="basis-1/3 flex flex-col justify-end ">
                <li className="lg:text-sm 2xl:text-2xl sm:text-xs text-white font-thin sm:py-1 sm:px-1 lg:px-2 lg:py-2 bg-[#4a95c0]  ">
                  pLDDT Score: {protein.colabfold_json_pLDDT}
                </li>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </>
  ) : (
    <>
      <ul className="px-8 py-8 grid grid-cols-2 gap-4">
        {data.matches?.map((match) => (
          <Link
            to={{
              pathname: `/structureindex/${match.protein_structure["Virus name(s)"]}/${match.protein_structure._id}`,
            }}
            key={match.protein_structure._id}
          >
            <div
              onClick={() =>
                handleMatchClick(match.protein_structure["Virus name(s)"])
              }
              className="result-card hover:-translate-y-1 transition ease-in-out drop-shadow-md sm:min-h-[20vh] sm:max-h-[20vh] lg:min-h-[15vh] lg:max-h-[15vh] 2xl:min-h-[15vh] 2xl:max-h-[15vh] flex flex-col justify-between border-2 border-[#4a95c0] hover:border-[#50bde5] rounded-md bg-[#f9f9f9]"
            >
              {match.protein_structure.genbank_name.length < 40 ? (
                <div className="px-4 py-2 2xl:text-2xl lg:text-lg sm:text-sm text-[#4a95c0] font-light">
                  <li className="">{match.protein_structure.genbank_name}</li>
                  <li className="text-slate-500">
                  {match.protein_structure['Virus name(s)']}
                  </li>
                </div>
              ) : (
                <div className="px-4 py-2 2xl:text-2xl lg:text-lg sm:text-sm text-[#4a95c0] font-light">
                  <li className="">
                    <ResultToolTip
                      text={match.protein_structure.genbank_name}
                    />
                  </li>
                  <li className="text-slate-500">
                  {match.protein_structure['Virus name(s)']}
                  </li>
                </div>
              )}
              <div className="flex flex-row w-[100%]  divide-x text-center fixed bottom-0 right-0 font-thin 2xl:text-lg sm:text-xs text-white">
              <li className="bg-[#4a95c0] px-2 py-2 basis-1/3">
                  evalue: {match.evalue}
                </li>
                <li className="bg-[#4a95c0] px-2 py-2 basis-1/3">
                  Blastp Score: {match.score}
                </li>
                <li className="bg-[#4a95c0] px-2 py-2 basis-1/3">
                  pLDDT Score: {match.protein_structure.colabfold_json_pLDDT}
                </li>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default ProteinStructureResults;
