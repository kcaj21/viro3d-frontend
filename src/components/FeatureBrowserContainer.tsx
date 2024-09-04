import React from "react";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";
import FeatureBrowser from "./ui/FeatureBrowser";
import LoadingSpinner from "./ui/LoadingSpinner";

const FeatureBrowserContainer: React.FC = ({ filterParam, searchParam }) => {
  const { coordinates, isLoading } = useGenomeCoordinates(
    filterParam,
    searchParam
  );

  return isLoading ? (
    <>
      <div className="flex items-center justify-center gap-12">
        <h2 className="text-5xl text-slate-500">Loading Genome Browser...</h2>
        <LoadingSpinner color={'#4a95c0'} size={'5'} />
      </div>
    </>
  ) : (
    <>
      {coordinates.segments.length > 1 ? (
        <div className="custom-scrollbar overflow-x-auto flex flex-grow">
          {coordinates.segments?.map((segment) => (
            <div
              key={segment.coordinates[0].segment}
              className="border-r-2 border-[#bec4cc]"
            >
              <p className="text-center text-slate-500">
                {segment.coordinates[0].segment}
              </p>
              <FeatureBrowser annotations={segment.coordinates} />
            </div>
          ))}
        </div>
      ) : (
        <FeatureBrowser annotations={coordinates.segments[0].coordinates} />
      )}
    </>
  );
};

export default FeatureBrowserContainer;
