import React, { } from "react";
import { useParams } from "react-router-dom";
import PdbeMolstar from "../components/ui/PdbeMolstar";
import ProteinInfo from "../components/ProteinInfo";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";

const StructureIndex: React.FC = ({ }) => {
  
  document.documentElement.scrollTop = 0

  const { filterParam, searchParam } = useParams();

  return (
    <>
      <FeatureBrowserContainer filterParam={'virus_name'} searchParam={filterParam} />
        <div className="mt-12 flex gap-16 flex-col-1 ">
          <div className="basis-1/2">
            <PdbeMolstar modelID={searchParam} />
          </div>
          <div className="basis-1/2 font-extralight min-h-full">
            <ProteinInfo recordID={searchParam} />
          </div>
        </div>
    </>
  );
};

export default StructureIndex;
