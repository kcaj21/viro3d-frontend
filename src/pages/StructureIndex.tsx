import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PdbeMolstar from "../components/ui/PdbeMolstar";
import ProteinInfo from "../components/ProteinInfo";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";
import { useStructureIndexData } from "../hooks/useStructureIndexData";

const StructureIndex: React.FC = ({}) => {
  const { filterParam, searchParam } = useParams();

  const {
    proteinInfo,
    isLoading,
    defaultModel,
    isESMFoldModelPresent,
    handleCollabFoldClick,
    handleESMFoldClick,
  } = useStructureIndexData(searchParam);

  document.documentElement.scrollTop = 0;

  return (
    <>
      <FeatureBrowserContainer
        filterParam={"virus_name"}
        searchParam={filterParam}
        recordID={searchParam}
      />
      {!proteinInfo ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-12 min-h-[60vh]  flex gap-16 flex-col-1 ">
          {defaultModel === "CF" ? (
            <div className="basis-1/2">
              <PdbeMolstar defaultModel={defaultModel} modelID={searchParam} />
              {isESMFoldModelPresent ? (
                <div>
                  <button
                    className="border border-[#313645]  bg-[#4a95c0] hover:bg-[#4da9ca] text-white w-full"
                    onClick={handleESMFoldClick}
                  >
                    Switch to ESMFold Model
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
          {defaultModel === "EF" ? (
            <div className="basis-1/2">
              <PdbeMolstar defaultModel={defaultModel} modelID={searchParam} />
              {isESMFoldModelPresent ? (
                <div>
                  <button
                    className="border border-[#313645]  bg-[#4a95c0] hover:bg-[#4da9ca] text-white w-full"
                    onClick={handleCollabFoldClick}
                  >
                    Switch to Collabfold Model
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="basis-1/2 min-w-[30vw] font-extralight ">
            <ProteinInfo
              proteinInfo={proteinInfo}
              defaultModel={defaultModel}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StructureIndex;
