import React from "react";
import { Link } from "react-router-dom";

const VirusResults: React.FC = ({ data }) => {
  return (
    <>
      <ul className="px-8 py-8 grid grid-cols-2 gap-4">
        {data.viruses?.map((virus) => (
          <Link
            to={{
              pathname: `/proteinresultspage/virus_name/${virus.virus_name}`,
            }}
            key={virus.virus_name}
          >
            <div className="result-card hover:-translate-y-1 transition ease-in-out drop-shadow-md sm:min-h-[10vh] sm:max-h-[10vh] lg:min-h-[15vh] lg:max-h-[15vh] 2xl:min-h-[15vh] 2xl:max-h-[15vh] flex flex-col justify-between border-2 border-[#4a95c0] hover:border-[#50bde5] rounded-md bg-[#f9f9f9]">
              <div className="2xl:text-3xl lg:text-xl sm:text-sm text-[#4a95c0] font-light">
                <li className="px-6 py-2 text-[#4a95c0] font-light">
                  {virus.virus_name}
                </li>
              </div>
              <div className=" py-4 ">
                <li className=" bg-[#4a95c0] w-[33%] fixed bottom-0 right-0 sm:py-1 sm:px-1 lg:px-2 lg:py-2 lg:text-sm 2xl:text-2xl sm:text-xs text-white text-center font-light">
                  Structures: {virus.structure_count}
                </li>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default VirusResults; 
