import React, { useState } from "react";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";
import FeatureBrowser from "./ui/FeatureBrowser";
import LoadingSpinner from "./ui/LoadingSpinner";
import Legend from "./ui/Legend";
import ControlsPopUp from "./ui/ControlsPopUp";
import InfoIcon from "./ui/InfoIcon";

const FeatureBrowserContainer: React.FC = ({ filterParam, searchParam }) => {
  const { coordinates, isLoading } = useGenomeCoordinates(
    filterParam,
    searchParam
  );

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handlePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  const DownloadZip = () => {
    'http://localhost:8000/zip?virus_name=hepatitis%20C%20virus%20genotype%203a&qualifier=BAA04609.1.1.1_7118&qualifier=BAA04609.1.1_7118'
  };

  return isLoading ? (
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
              <a href={`http://localhost:8000/zip/${searchParam}`}>
                <button className="hover:text-[#56b3e6]">Download PDBs</button>
                </a>
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
