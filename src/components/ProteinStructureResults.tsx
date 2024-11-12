import React from "react";
import { Link } from "react-router-dom";
import ResultToolTip from "./ui/ResultToolTip";

const ProteinStructureResults: React.FC = ({ data, filterParam }) => {
  return filterParam !== "sequencematch" ? (
    <>
      <ul className="xs:px-4 sm:px-8 py-8 grid sm:grid-cols-2 xs:grid-cols-1 gap-4"> 
        {data.protein_structures?.map((protein) => (
          <Link
            to={{
              pathname: `/structureindex/${encodeURIComponent(
                protein["Virus name(s)"]
              )}/${protein._id}`,
            }}
            key={protein._id}
          >
            <div className="result-card hover:-translate-y-1 xs:text-xs transition ease-in-out drop-shadow-md sm:min-h-[10vh] sm:max-h-[10vh] lg:min-h-[15vh] lg:max-h-[15vh] 2xl:min-h-[15vh] 2xl:max-h-[15vh] flex flex-row justify-between border-2 border-[#4a95c0] hover:border-[#50bde5] rounded-md bg-[#f9f9f9]">
              <div className="px-4 py-2 flex flex-col justify-evenly  basis-2/3">
                <div className="">
                  <div className=" 2xl:text-2xl  lg:text-base xs:text-xs text-[#4a95c0] font-light">
                    {protein.genbank_name.length > 60 ? (
                      <ResultToolTip
                        text={protein.genbank_name}
                        textLength={60}
                      />
                    ) : (
                      <li>{protein.genbank_name}</li>
                    )}
                  </div>
                </div>
                <div className=" sm:text-xs xl:text-sm 2xl:text-xl  font-thin break-all">
                  <li className="hidden md:block">Peptide Category: {protein.pept_cat}</li>
                  {protein["Virus name(s)"].length > 40 ? (
                      <ResultToolTip
                        text={protein["Virus name(s)"]}
                        textLength={40}
                      />
                    ) : (
                      <li>{protein["Virus name(s)"]}</li>
                    )}
                </div>
              </div>
              <div className="basis-1/3 flex flex-col justify-end ">
                <li className="lg:text-sm 2xl:text-2xl xs:text-xs text-white font-thin xs:py-1 xs:px-1 lg:px-2 lg:py-2 bg-[#4a95c0]">
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
      <ul className="px-8 py-8 grid xs:grid-col-1 sm:grid-cols-2 gap-4">
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
              className="result-card hover:-translate-y-1 xs:text-xs transition ease-in-out drop-shadow-md xs:min-h-[15vh] xs:max-h-[15vh] lg:min-h-[15vh] lg:max-h-[15vh] 2xl:min-h-[15vh] 2xl:max-h-[15vh] flex flex-col justify-between border-2 border-[#4a95c0] hover:border-[#50bde5] rounded-md bg-[#f9f9f9]"
            >
              {match.protein_structure.genbank_name.length < 50 ? (
                <ul className="sm:px-4 sm:py-2 xs:px-4 xs:py-2 2xl:text-xl xl:text-xl lg:text-base xs:text-sm text-[#4a95c0] font-light">
                  <li className="">{match.protein_structure.genbank_name}</li>
                  <li className="text-slate-500 2xl:text-xl lg:text-sm xs:text-xs">
                    {match.protein_structure["Virus name(s)"]}
                  </li>
                </ul>
              ) : (
                <ul className="sm:px-4 sm:py-2 xs:px-4 xs:py-2 2xl:text-xl lg:text-lg xs:text-sm text-[#4a95c0] font-light">
                  <li className="">
                    <ResultToolTip
                      text={match.protein_structure.genbank_name}
                      textLength={50}
                    />
                  </li>
                  <li className="text-slate-500 2xl:text-xl lg:text-sm xs:text-xs">
                    {match.protein_structure["Virus name(s)"]}
                  </li>
                </ul>
              )}
              <div className="flex flex-row w-[100%]  divide-x text-center fixed bottom-0 right-0 font-thin 2xl:text-lg xs:text-xs text-white">
                <li className="bg-[#4a95c0] xs:px-2 sm:py-2 basis-1/3">
                  evalue: {match.evalue}
                </li>
                <li className="bg-[#4a95c0] xs:px-2 sm:py-2 basis-1/3">
                  Blastp Score: {match.score}
                </li>
                <li className="bg-[#4a95c0] xs:px-2 sm:py-2 basis-1/3">
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
