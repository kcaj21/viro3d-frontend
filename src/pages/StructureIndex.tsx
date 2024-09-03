import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PdbeMolstar from "../components/PdbeMolstar";
import ProteinInfo from "../components/ProteinInfo";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";
import { useStructureIndexData } from "../hooks/useStructureIndexData";

const StructureIndex: React.FC = ({ }) => {
  
  document.documentElement.scrollTop = 0

  const { virus_name, recordID } = useParams();

  return (
    <>
      <div className="IndexContainer flex flex-col gap-4  ">
        <FeatureBrowserContainer filterParam={'virus_name'} searchParam={virus_name} />
        </div>
        <div className="mt-12 mx-12 flex gap-24 flex-col-1  ">
          <div className="w-[50%]">
            <PdbeMolstar model={recordID} />
          </div>
          <div className=" font-extralight">
            <ProteinInfo recordID={recordID} />
          </div>
        </div>
    </>
  );
};

export default StructureIndex;
