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
  const [isolateDesignations, setIsolateDesignations] = useState(null);

  const { isLoading: downloadLoading, handleDownload } =
    useZipDownload(searchParam);

  const handlePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  const areSegmentsUnique = (coords) => {
    const seenSegments = new Set();

    for (const segment of coords.segments) {
      if (seenSegments.has(segment.segment)) {
        return false;
      }
      seenSegments.add(segment.segment);
    }

    return true;
  };

  console.log(isolate);

  useEffect(() => {
    if (coordinates) {
      const array = [...new Set(coordinates?.segments?.map(segment => segment.isolate_designation))]

      setIsolateDesignations(array);
    }
  }, [coordinates]);

  useEffect(() => {
    setCurrentIsolate(isolate);
  }, [isolate]);

  const handleChange = (e) => {
    let segmentIndex = coordinates.segments.find(
      (segment) => segment["isolate_designation"] === e.target.value
    );
    console.log("seg index is:", segmentIndex);
    setCurrentIsolate(segmentIndex["isolate_designation"]);
  };

  //change currentIsolate from nt_acc to isolate_designation and pass it to chikungunya-like viruses too
  //

  return genomeLoading ? (
    <>
      <div className="xs:hidden  sm:flex items-center justify-center gap-12">
        <h2 className="text-5xl text-slate-500">Loading Genome Browser...</h2>
        <LoadingSpinner color={"#4a95c0"} size={"5"} />
      </div>
    </>
  ) : (
    <>
      <div className="hidden sm:block text-slate-500 ">
        <div className="flex flex-col items-center">
          <h1 className="text-center mb-6 text-2xl">{searchParam} Genome</h1>
          {coordinates.segments.length > 1 &&
          coordinates.segments[0].segment === "Non-segmented" || coordinates.segments[0].segment !== "Non-segmented" && !areSegmentsUnique(coordinates)  ? (
            <select
              id="search-filter"
              className="bg-[#f9f9f9] hover:text-[#56b3e6] border-b-2 border-[#56b4e600] hover:border-[#56b3e6] text-xl text-center  text-slate-500 mb-4"
              onChange={handleChange}
            >
              {isolateDesignations?.map((segment) => (
                <option
                  key={segment}
                  value={`${segment}`}
                  selected={
                    currentIsolate === segment
                      ? "selected"
                      : ""
                  }
                >
                  Isolate: {segment}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <div className="relative">
          {coordinates.segments[0].segment !== "Non-segmented" &&
          areSegmentsUnique(coordinates) ? (
            <div
              id="segment-container"
              className="custom-scrollbar overflow-x-auto flex flex-grow divide-x-2 divide-[#bec4cc]"
            >
              {coordinates.segments?.map((segment) => (
                <div
                  key={segment.coordinates[0].nt_acc}
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
          {coordinates.segments[0].segment !== "Non-segmented" &&
          !areSegmentsUnique(coordinates) ? (
            <div
              id="segment-container"
              className="custom-scrollbar overflow-x-auto flex flex-grow divide-x-2 divide-[#bec4cc]"
            >
              {coordinates.segments?.map((segment) => (
                <div
                  key={segment.coordinates[0].nt_acc}
                  id={segment.coordinates[0].nt_acc}
                  className={`drop-shadow-md ${
                    currentIsolate !== segment.isolate_designation
                      ? "hidden"
                      : ""
                  }`}
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
                  key={segment.coordinates[0].nt_acc}
                  id={segment._id}
                  className={`drop-shadow-md ${
                    currentIsolate !== segment.isolate_designation
                      ? "hidden"
                      : ""
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
          {isPopUpOpen ? <ControlsPopUp handleClick={handlePopUp} /> : null}
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
