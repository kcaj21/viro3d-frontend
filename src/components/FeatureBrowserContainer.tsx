import React, { useState, useEffect } from "react";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";
import FeatureBrowser from "./ui/FeatureBrowser";
import LoadingSpinner from "./ui/LoadingSpinner";
import Legend from "./ui/Legend";
import ControlsPopUp from "./ui/ControlsPopUp";
import InfoIcon from "./ui/InfoIcon";
import { useZipDownload } from "../hooks/useZipDownload";

const FeatureBrowserContainer: React.FC = ({
  coordinates,
  genomeLoading,
  searchParam,
  recordID,
}) => {

  //move fetch to parent component
  // const { coordinates, isLoading: genomeLoading } = useGenomeCoordinates(
  //   filterParam,
  //   searchParam
  // );

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const { isLoading: downloadLoading, handleDownload } =
    useZipDownload(searchParam);

  const handlePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };
  console.log(coordinates)

  // useEffect(() => {

  //   console.log(coordinates.segments.filter((a) => a._id === recordID))
  // }, [coordinates])

  // let mat_pept = all.filter((a) => a.pept_cat == "mat_pept");

  return genomeLoading ? (
    <>
      <div className="flex items-center justify-center gap-12">
        <h2 className="text-5xl text-slate-500">Loading Genome Browser...</h2>
        <LoadingSpinner color={'#4a95c0'} size={'5'} />
      </div>
    </>
  ) : (
    <>
      <div className="text-slate-500">
        <div className="relative">
          {isPopUpOpen ? <ControlsPopUp handleClick={handlePopUp} /> : null}
          {coordinates.segments?.length > 1 ? (
            <div
              id="segment-container"
              className="custom-scrollbar overflow-x-auto flex flex-grow"
            >
              {coordinates.segments?.map((segment) => (
                <div
                  key={segment.coordinates[0].segment}
                  id={segment.coordinates[0].nt_acc}
                  className="border-r-2 border-[#bec4cc]"
                >
                  <p className="text-center ">
                    {segment.coordinates[0].segment}
                  </p>
                  <FeatureBrowser
                    annotations={segment.coordinates}
                    recordID={recordID}
                  />
                </div>
              ))}
            </div>
          ) : (
            <FeatureBrowser
              annotations={coordinates.segments[0].coordinates}
              recordID={recordID}
            />
          )}
        </div>
        <div className="mt-1 flex flex-row justify-between">
          <Legend />
          <div className="flex flex-row gap-4 ">
            {downloadLoading ? (
              <p>Downloading...</p>
            ) : (
              <>
                <button
                  onClick={() => handleDownload("_relaxed.pdb")}
                  disabled={downloadLoading}
                  className="hover:text-[#56b3e6]"
                >
                Download PDBs
                </button>
                <button
                  onClick={() => handleDownload(".cif")}
                  disabled={downloadLoading}
                  className="hover:text-[#56b3e6]"
                >
                Download mmCIFs
                </button>
              </>
            )}
            <button
              onClick={handlePopUp}
              className="block"
              data-modal-target="default-modal"
              data-modal-show="default-modal"
              type="button"
            >
              <InfoIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureBrowserContainer;
