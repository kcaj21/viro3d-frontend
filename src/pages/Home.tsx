import React, { useState } from "react";
import ViewStructuresPopUp from "../components/ui/ViewStructuresPopUp";
import ClusterVisualisationLegend from "../components/ui/ClusterVisualisationLegend";
import ClusterVisualisation from "../components/ui/ClusterVisualisation";

const Home: React.FC = () => {
  document.documentElement.scrollTop = 0;
  const [isViewStructurePopUpOpen, setIsViewStructurePopUpOpen] =
    useState(false);
  const [isLegendPopUpOpen, setIsLegendPopUpOpen] = useState(true);
  const [hoveredVirus, setHoveredVirus] = useState("");
  const [popUpVirus, setPopUpVirus] = useState("");

  const handleViewStructurePopUpClick = (virus: string) => {
    setIsViewStructurePopUpOpen(true);
    setPopUpVirus(virus);
  };

  const handleCloseViewStructurePopUpClick = () => {
    setIsViewStructurePopUpOpen(false);
  };

  const handleLegendPopUpClick = () => {
    setIsLegendPopUpOpen(!isLegendPopUpOpen);
  };

  return (
    <>
      <div
        id="konva-container"
        className=" 2xl:mt-32 sm:mt-24 xl:h-[85vh] md:h-[85vh] md:mb-12 xs:mb-20 xs:mx-0 xs:mt-20 2xl:ml-4 md:ml-2 xs:ml-2 lg:mx-4 xs:h-[80vh] border drop-shadow-md rounded xs:w-[95vw]  sm:w-[98%] border-slate-300 text-[#4a95c0] overflow-hidden relative"
      >
        <div className="flex flex-row absolute w-full justify-center  ">
          <div className="text-center absolute z-10 ">
            <h1 className="mt-2 xl:text-3xl lg:text-2xl font-light bg-[#e6e6e6de] px-2 border-0 rounded text-[#3a5868b4] ">
              Structure-Informed Map of the Human and Animal Virosphere
            </h1>
            <h2 className="mt-2 text-2xl font-light bg-[#e6e6e6de] px-2 border-0 rounded text-[#3a5868b4]  ">
              {hoveredVirus}
            </h2>
          </div>
        </div>
        <ClusterVisualisation
          setHoveredVirus={setHoveredVirus}
          handleViewStructurePopUpClick={handleViewStructurePopUpClick}
        />
        {isViewStructurePopUpOpen ? (
          <ViewStructuresPopUp
            popUpVirus={popUpVirus}
            handleCloseViewStructurePopUpClick={
              handleCloseViewStructurePopUpClick
            }
          />
        ) : null}
        <div className="absolute top-0 left-0 flex flex-col text-[#3a5868b4] ">
          <h3 className="text-4xl"></h3>
        </div>
        <div className="absolute xs:bottom-0 md:top-0 left-0 flex flex-col text-[#3a5868b4] ">
          {isLegendPopUpOpen ? (
            <ClusterVisualisationLegend
              handleLegendPopUpClick={handleLegendPopUpClick}
            />
          ) : (
            <button
              onClick={handleLegendPopUpClick}
              className="mt-2 ml-2 xl:text-2xl lg:text-xl font-light bg-[#e6e6e6de] px-2 border-0 rounded text-[#6d828d] hover:text-[#505f66]"
            >
              Legend
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
