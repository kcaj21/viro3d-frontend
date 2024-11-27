import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PdbeMolstar from "../components/ui/PdbeMolstar";
import ProteinInfo from "../components/ProteinInfo";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";
import { useStructureIndexData } from "../hooks/useStructureIndexData";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import PdbeMolstartLegend from "../components/ui/PdbeMolstarLegned";

const StructureIndex: React.FC = () => {
  const { filterParam, searchParam } = useParams();

  const { coordinates, isLoading: genomeLoading } = useGenomeCoordinates(
    "virus_name",
    filterParam ?? ""
  );

  const {
    proteinInfo,
    defaultModel,
    isESMFoldModelPresent,
    handleCollabFoldClick,
    handleESMFoldClick,
  } = useStructureIndexData(searchParam ?? "");

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <div className="min-h-screen xs:mt-24 sm:mt-32 xs:mb-96 sm:mb-32 sm:my-auto sm:mx-4 lg:mx-8 2xl:mx-24">
        {!proteinInfo ? (
          <div className="min-h-screen">
            <div className="flex items-center justify-center gap-12">
              <LoadingSpinner />
            </div>
          </div>
        ) : (
          <>
            <div className="desktop-back-button hidden md:block py-2 ">
              {filterParam ? (
                <a
                  href={`/proteinresultspage/virus_name/${encodeURIComponent(
                    filterParam
                  )}`}
                  className="text-xl px-2 py-2 rounded-md drop-shadow-md border-0  bg-[#4a95c0] hover:bg-[#4da9ca] text-white text-center"
                >
                  Virus Structure List
                </a>
              ) : null}
            </div>
            {coordinates ? (
              <FeatureBrowserContainer
                filterParam={"virus_name"}
                searchParam={filterParam ?? ""}
                coordinates={coordinates}
                genomeLoading={genomeLoading}
                recordID={searchParam ?? ""}
                isolate={proteinInfo["Virus isolate designation"]}
              />
            ) : null}

            <div className="mobile-heading sm:hidden ">
              <h1 className="mx-12 text-2xl text-slate-500 ">
                {proteinInfo["genbank_name_curated"]}
              </h1>
            </div>

            <div className="sm:mt-12 xs:mt-8 max-h-[100vh] xs:grid xs:grid-rows-2 xs:gap-32 md:gap-16 lg:flex lg:gap-2 xl:gap-16 lg:flex-row-1 ">
              {defaultModel === "CF" ? (
                <div className="sm:basis-1/2 xs:mx-8">
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
                  <PdbeMolstar
                    defaultModel={defaultModel}
                    modelID={searchParam ?? ""}
                  />

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
                <div className="sm:basis-1/2 xs:mx-8">
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
                  <PdbeMolstar
                    defaultModel={defaultModel}
                    modelID={searchParam ?? ""}
                  />
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
              <div className="sm:basis-1/2 sm:min-w-[30vw] font-extralight ">
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
