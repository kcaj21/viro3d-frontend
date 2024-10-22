import React, { useState, useEffect } from "react";
import FeatureBrowser from "./ui/FeatureBrowser";
import LoadingSpinner from "./ui/LoadingSpinner";
import FeatureBrowserLegend from "./ui/FeatureBrowserLegend";
import ControlsPopUp from "./ui/ControlsPopUp";
import InfoIcon from "./ui/InfoIcon";
import { useZipDownload } from "../hooks/useZipDownload";

const FeatureBrowserContainer: React.FC = ({
  coordinates,
  genomeLoading,
  searchParam,
  recordID,
}) => {

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const { isLoading: downloadLoading, handleDownload } =
    useZipDownload(searchParam);

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
        <h1 className="text-center mb-6 text-2xl" >{searchParam} Genome</h1>
        <div className="relative">
          {isPopUpOpen ? <ControlsPopUp handleClick={handlePopUp} /> : null}
          {coordinates.segments?.length > 1 ? (
            <div
              id="segment-container"
              className="custom-scrollbar overflow-x-auto flex flex-grow divide-x-2 divide-[#bec4cc]"
            >
              {coordinates.segments?.map((segment) => (
                <div
                  key={segment.coordinates[0].segment}
                  id={segment.coordinates[0].nt_acc}
                  className=" drop-shadow-md"
                >
                  <h2 className="text-center ">
                    {segment.coordinates[0].segment !== "Non-segmented" ? 
                    <h3>Segment: {segment.coordinates[0].segment}</h3> : <h3>Isolate: {segment.coordinates[0].nt_acc}</h3>}
                  </h2>
                  <FeatureBrowser
                    annotations={segment.coordinates}
                    recordID={recordID}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="drop-shadow-md border-b-0 border-[#64748b] ">
              <FeatureBrowser
                annotations={coordinates?.segments[0].coordinates}
                recordID={recordID}
              />
            </div>
          )}
        </div>
        <div className="mt-1 flex flex-row justify-between">
          <FeatureBrowserLegend />
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
                  Download Genome PDBs
                </button>
                <button
                  onClick={() => handleDownload(".cif")}
                  disabled={downloadLoading}
                  className="hover:text-[#56b3e6]"
                >
                  Download Genome mmCIFs
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
