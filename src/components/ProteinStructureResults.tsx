import React from "react";
import { Link } from "react-router-dom";

const ProteinStructureResults: React.FC = ({ data, filterParam }) => {

  return filterParam !== 'sequencematch' ?
    (
    <>
      <ul className="px-8 py-2 grid grid-cols-2 gap-4">
        {data.protein_structures?.map((protein) => (
          <Link
            to={{ pathname: `/structureindex/${protein['Virus name(s)']}/${protein._id}` }}
            key={protein._id}
          >
            <div className="result-card drop-shadow-md  flex flex-col-2 gap-8 border-2 hover:border-[#4a95c0] rounded-md   bg-[#f9f9f9]">
              <div className="basis-1/4 ">
                <li className=" px-6 py-2 text-[#4a95c0] font-light">
                  {protein.protein_id}
                </li>
              </div>
              <div className="basis-3/4 text-xl font-thin">
                <li className="">
                  plDDT Score: {protein.colabfold_json_pLDDT}
                </li>
                <li className=""> Product: {protein.product}</li>
                <li className=""> Species: {protein.Species}</li>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </>
    ) : (
      <>
      <ul className="px-8 py-2">
        {data.matches?.map((match) => (
          <Link
            to={{ pathname: `/structureindex/${match.protein_structure['Virus name(s)']}/${match.protein_structure._id}` }}
            key={match.protein_structure._id}
          >
            <div className="result-card drop-shadow-md min-h-[10%] flex flex-col-2 gap-8 border-2 hover:border-[#4a95c0] rounded-md  mb-4 bg-[#f9f9f9]">
              <div className="basis-1/4 py-4">
                <li className=" px-6 py-2 text-[#4a95c0] font-light">
                  {match.protein_structure.protein_id}
                </li>
              </div>
              <div className="basis-1/2 py-4 text-3xl font-thin">
                <li className="px-8">plDDT Score: {match.protein_structure.colabfold_json_pLDDT}</li>
                <li className="px-8"> Product: {match.protein_structure.product}</li>
                <li className="px-8"> Species: {match.protein_structure.Species}</li>
              </div>
              <div className="basis-1/4 py-4 text-3xl font-thin border-l-2">
                <li className="px-8 text-[#4a95c0] font-light">Blastp Score: {match.score}</li>
                <li className="px-8">Positives: {match.positives}</li>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </>  
  )
};

export default ProteinStructureResults;
