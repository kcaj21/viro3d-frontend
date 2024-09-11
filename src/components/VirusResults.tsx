import React, { } from "react";
import { Link } from "react-router-dom";

const VirusResults: React.FC = ({ data }) => {
  return (
    <>
      <ul className="px-8 py-2">
        {data.viruses?.map((virus) => (
          <Link
            to={{ pathname: `/resultspage/virus_name/${virus.virus_name}` }} 
            key={virus.virus_name}
          >
            <div
              className="result-card drop-shadow-md min-h-[10%] flex flex-col-2 gap-8 border-2 hover:border-[#4a95c0] rounded-md  mb-4 bg-[#f9f9f9]"
            >
              <div className="basis-3/4">
              <li className="px-6 py-2 text-[#4a95c0] font-light">
                {virus.virus_name}
                </li>
                </div>
              <div className="basis-1/4 py-4 text-3xl font-thin border-l-2">
                <li className="px-8 text-[#4a95c0] text-center font-light">Structures:</li>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default VirusResults;
