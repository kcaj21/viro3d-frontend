import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PdbeMolstar from "./PdbeMolstar";
import ProteinInfo from "./ProteinInfo";
import FeatureBrowser from "./FeatureBrowser";
import { useStructureIndex } from "../hooks/useStructureIndex";


//BUG - refreshing page doesnt retain the proteinInfo state

const StructureIndex: React.FC = ({  }) => {

  const { recordID } = useParams();

  // const [proteinInfo, setProteinInfo] = useState(filter)

  const { proteinInfo } = useStructureIndex(recordID);
  


  return (
    <>
      <div className="IndexContainer flex min-h-screen flex-col gap-4  ">
        {/* <Searchbar /> */}
        <div className="GenomeBrowserContainer  ">
          <FeatureBrowser />
        </div>
        <div className="mt-12 mx-12 flex gap-24 flex-col-1 min-h-full ">
          <div className="w-[50%]">
            <PdbeMolstar />
          </div>
          <div className=" font-extralight">
            <ProteinInfo proteinInfo={proteinInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StructureIndex;
