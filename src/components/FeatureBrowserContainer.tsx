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
  isolate,
}) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [currentIsolate, setCurrentIsolate] = useState("");
  const { isLoading: downloadLoading, handleDownload } =
    useZipDownload(searchParam);

  const handlePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  useEffect(() => {
    setCurrentIsolate(isolate);
  }, [isolate]);

  const handleChange = (e) => {
    let segmentIndex = coordinates.segments.find(
      (segment) => segment["_id"] === e.target.value
    );
    setCurrentIsolate(segmentIndex["_id"]);
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
        <div className="flex flex-col items-center">
        <h1 className="text-center mb-6 text-2xl">{searchParam} Genome</h1>
        {coordinates.segments.length > 1 && coordinates.segments[0].segment === "Non-segmented" ? (
        <select
        id="search-filter"
        className="bg-[#f9f9f9] hover:text-[#56b3e6] border-b-2 border-[#56b4e600] hover:border-[#56b3e6] text-xl text-center  text-slate-500 mb-4"
        onChange={handleChange}
        
      >
        {coordinates.segments?.map((segment) => (
    <option 
    key={segment._id}
    value={`${segment._id}`}
    selected={currentIsolate === segment._id ? 'selected' : ''}
  >
    Isolate: {segment._id}
  </option>
        ))}
      </select>
          ) : null}
          </div>
        <div className="relative">
          {isPopUpOpen ? <ControlsPopUp handleClick={handlePopUp} /> : null}
          {coordinates.segments[0].segment !== "Non-segmented" ? (
            <div
              id="segment-container"
              className="custom-scrollbar overflow-x-auto flex flex-grow divide-x-2 divide-[#bec4cc]"
            >
              {coordinates.segments?.map((segment) => (
                <div
                  key={segment.coordinates[0].segment}
                  id={segment.coordinates[0].nt_acc}
                  className="drop-shadow-md"
                >
                  <h2 className="text-center ">
                    Segment: {segment.coordinates[0].segment}
                  </h2>
                  <FeatureBrowser
                    annotations={segment.coordinates}
                    recordID={recordID}
                  />
                </div>
              ))}
            </div>
          ) : null}
          {coordinates.segments[0].segment === "Non-segmented" &&
          coordinates.segments.length > 1 ? (
            <div
              id="segment-container"
              className="custom-scrollbar overflow-x-auto flex-col flex-grow divide-[#bec4cc]"
            >
              {coordinates.segments?.map((segment) => (
                <div
                  key={segment.coordinates[0].segment}
                  id={segment._id}
                  className={`drop-shadow-md ${
                    currentIsolate !== segment._id ? "hidden" : ""
                  }`}
                >
                  <FeatureBrowser
                    annotations={segment.coordinates}
                    recordID={recordID}
                  />
                </div>
              ))}
            </div>
          ) : null}
          {coordinates.segments[0].segment === "Non-segmented" &&
          coordinates.segments.length === 1 ? (
            <div className="drop-shadow-md border-b-0 border-[#64748b] ">
              <FeatureBrowser
                annotations={coordinates?.segments[0]?.coordinates}
                recordID={recordID}
              />
            </div>
          ) : null}
        </div>
        <div className="mt-1 flex flex-row justify-between">
          <FeatureBrowserLegend />
          <div className="flex flex-row gap-4 ">
            {downloadLoading ? (
              <p>Downloading...</p>
            ) : (
              <>
                <div className="flex flex-row gap-2">
                  <p>Download All Structures:</p>
                  <div className="flex flex-row gap-2">
                  <button
                    onClick={() => handleDownload("_relaxed.pdb")}
                    disabled={downloadLoading}
                    className="hover:text-[#56b3e6] border-b-2 border-[#56b4e600] hover:border-[#56b3e6]"
                  >
                    PDBs
                  </button>
                  <button
                    onClick={() => handleDownload(".cif")}
                    disabled={downloadLoading}
                    className="hover:text-[#56b3e6] border-b-2 border-[#56b4e600] hover:border-[#56b3e6]"
                  >
                    mmCIFs
                  </button>
                  </div>
                </div>
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
