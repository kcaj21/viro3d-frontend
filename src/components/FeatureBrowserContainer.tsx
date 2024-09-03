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
            <div className="border-r-2 border-[#bec4cc]">
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
