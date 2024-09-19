import React from "react";
import { useParams } from "react-router-dom";
import PdbeMolstar from "../components/ui/PdbeMolstar";
import ProteinInfo from "../components/ProteinInfo";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";
import { useStructureIndexData } from "../hooks/useStructureIndexData";

const StructureIndex: React.FC = ({}) => {
  const { filterParam, searchParam } = useParams();

  const { proteinInfo } = useStructureIndexData(searchParam);

  document.documentElement.scrollTop = 0;

  return (
    <>
      <FeatureBrowserContainer
        filterParam={"virus_name"}
        searchParam={filterParam}
        recordID={searchParam}
      />
      <div className="mt-12 min-h-[60vh]  flex gap-16 flex-col-1 ">
        <div className="basis-1/2">
          <PdbeMolstar modelID={searchParam} />
        </div>
        <div className="basis-1/2 min-w-[30vw] font-extralight ">
          {!proteinInfo ? (
            <p>Loading</p>
          ) : (
            <ProteinInfo proteinInfo={proteinInfo} />
          )}
        </div>
      </div>
    </>
  );
};

export default StructureIndex;
