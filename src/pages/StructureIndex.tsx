import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PdbeMolstar from "../components/ui/PdbeMolstar";
import ProteinInfo from "../components/ProteinInfo";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";
import { useStructureIndexData } from "../hooks/useStructureIndexData";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import PdbeMolstartLegend from "../components/ui/PdbeMolstarLegned";

const StructureIndex: React.FC = ({}) => {
  const { filterParam, searchParam } = useParams();

  const { coordinates, isLoading: genomeLoading } = useGenomeCoordinates(
    "virus_name",
    filterParam
  );

  const {
    proteinInfo,
    isLoading,
    defaultModel,
    isESMFoldModelPresent,
    handleCollabFoldClick,
    handleESMFoldClick,
  } = useStructureIndexData(searchParam);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
    <div className="min-h-screen mt-32 mb-32 my-auto mx-24">
      {!proteinInfo ? (
        <div className="min-h-screen">
          <div className="flex items-center justify-center gap-12">
            <LoadingSpinner size={"5"} />
          </div>
        </div>
      ) : (
        <>
          <FeatureBrowserContainer
            filterParam={"virus_name"}
            searchParam={filterParam}
            coordinates={coordinates}
            genomeLoading={genomeLoading}
            recordID={searchParam}
            isolate={proteinInfo["nt_acc"]}
          />
          <div className="mt-12 max-h-[80vh] flex gap-16 flex-row-1 ">
            {defaultModel === "CF" ? (
              <div className="basis-1/2">
                <PdbeMolstar
                  defaultModel={defaultModel}
                  modelID={searchParam}
                />
                {isESMFoldModelPresent ? (
                  <div>
                    <button
                      className="border border-[#313645] bg-[#4a95c0] hover:bg-[#4da9ca] text-white w-full"
                      onClick={handleESMFoldClick}
                    >
                      Switch to ESMFold Model
                    </button>
                  </div>
                ) : null}
                <div className=" download-buttons-container flex flex-row ">
                  <a
                    className="border border-[#313645] bg-[#4a95c0] hover:bg-[#4da9ca] text-white text-center w-full"
                    href={`http://viro3d-dev.cvr.gla.ac.uk/api/pdb/${defaultModel}-${searchParam}.cif`}
                  >
                    Download mmCIF
                  </a>
                  <a
                    className="border border-[#313645] bg-[#4a95c0] hover:bg-[#4da9ca] text-white text-center w-full"
                    href={`http://viro3d-dev.cvr.gla.ac.uk/api/pdb/${defaultModel}-${searchParam}_relaxed.pdb`}
                  >
                    Download PDB
                  </a>
                </div>
                <PdbeMolstartLegend />
              </div>
            ) : null}
            {defaultModel === "EF" ? (
              <div className="basis-1/2">
                <PdbeMolstar
                  defaultModel={defaultModel}
                  modelID={searchParam}
                />
                {isESMFoldModelPresent ? (
                  <div>
                    <button
                      className="border border-[#313645]  bg-[#4a95c0] hover:bg-[#4da9ca] text-white w-full"
                      onClick={handleCollabFoldClick}
                    >
                      Switch to ColabFold Model
                    </button>
                  </div>
                ) : null}
                <div className=" download-buttons-container flex flex-row ">
                  <a
                    className="border border-[#313645] bg-[#4a95c0] hover:bg-[#4da9ca] text-white text-center w-full"
                    href={`http://viro3d-dev.cvr.gla.ac.uk/api/pdb/${defaultModel}-${searchParam}.cif`}
                  >
                    Download mmCIF
                  </a>
                  <a
                    className="border border-[#313645] bg-[#4a95c0] hover:bg-[#4da9ca] text-white text-center w-full"
                    href={`http://viro3d-dev.cvr.gla.ac.uk/api/pdb/${defaultModel}-${searchParam}_relaxed.pdb`}
                  >
                    Download PDB
                  </a>
                </div>
                <PdbeMolstartLegend />
              </div>
            ) : null}
            <div className="basis-1/2 min-w-[30vw]  font-extralight ">
              <ProteinInfo
                proteinInfo={proteinInfo}
                defaultModel={defaultModel}
              />
            </div>
          </div>
        </>
      )}
      </div>
    </>
  );
};

export default StructureIndex;
