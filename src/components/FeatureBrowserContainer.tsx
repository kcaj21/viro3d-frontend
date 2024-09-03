import React from "react";
import { Link } from "react-router-dom";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";
import FeatureBrowser from "../components/FeatureBrowser";

const FeatureBrowserContainer: React.FC = ({ filterParam, searchParam }) => {
  const { coordinates, isLoading } = useGenomeCoordinates(
    filterParam,
    searchParam
  );

  return isLoading ? (
    <>
      <p>loading</p>
    </>
  ) : (
    <>
      {coordinates.segments.length > 1 ? (
        <div className="custom-scrollbar overflow-x-auto flex flex-grow">
          {coordinates.segments?.map((segment) => (
            <div key={segment.coordinates[0].segment} className="border-r-2 border-[#bec4cc]">
              <p className="text-center text-slate-500">{segment.coordinates[0].segment}</p>
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
