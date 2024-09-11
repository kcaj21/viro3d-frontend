import React, { useState } from "react";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";
import FeatureBrowser from "./ui/FeatureBrowser";
import LoadingSpinner from "./ui/LoadingSpinner";
import Legend from "./ui/Legend";
import ControlsPopUp from "./ui/ControlsPopUp";
import InfoIcon from "./ui/InfoIcon";
import { useZipDownload } from "../hooks/useZipDownload";

const FeatureBrowserContainer: React.FC = ({ filterParam, searchParam }) => {
  const { coordinates, isLoading: genomeLoading } = useGenomeCoordinates(
    filterParam,
    searchParam
  );

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const { isLoading: downloadLoading, handleDownload } = useZipDownload(searchParam);

  const handlePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  return genomeLoading ? (
    <>
      <div className="flex items-center justify-center gap-12">
        <h2 className="text-5xl text-slate-500">Loading Genome Browser...</h2>
        <LoadingSpinner color={"#4a95c0"} size={"5"} />
      </div>
    </>
  ) : (
    <>
      <div className="text-slate-500">
        <div className="relative">
          {isPopUpOpen ? <ControlsPopUp handleClick={handlePopUp} /> : null}
          {coordinates.segments?.length > 1 ? (
            <div className="custom-scrollbar overflow-x-auto flex flex-grow">
              {coordinates.segments?.map((segment) => (
                <div
                  key={segment.coordinates[0].segment}
                  className="border-r-2 border-[#bec4cc]"
                >
                  <p className="text-center ">
                    {segment.coordinates[0].segment}
                  </p>
                  <FeatureBrowser annotations={segment.coordinates} />
                </div>
              ))}
            </div>
          ) : (
            <FeatureBrowser
              annotations={coordinates.segments[0]?.coordinates}
            />
          )}
        </div>
        <div className="mt-1 flex flex-row justify-between">
          <Legend />
          <div className="flex flex-row gap-4 ">
            <button 
              onClick={handleDownload} 
              disabled={downloadLoading}
              className="hover:text-[#56b3e6]"
            >
              {downloadLoading ? 'Downloading...' : 'Download PDBs'}
            </button>
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
