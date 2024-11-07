import React, { useState } from "react";
import ViewStructuresPopUp from "../components/ui/ViewStructuresPopUp";
import ClusterVisualisationLegend from "../components/ui/ClusterVisualisationLegend";
import ClusterVisualisation from "../components/ui/ClusterVisualisation";

const Home: React.FC = () => {

  document.documentElement.scrollTop = 0
  const [isViewStructurePopUpOpen, setIsViewStructurePopUpOpen] = useState(false);
  const [isLegendPopUpOpen, setIsLegendPopUpOpen] = useState(true);
  const [hoveredVirus, setHoveredVirus] = useState('');
  const [popUpVirus, setPopUpVirus] = useState('');


  const handleViewStructurePopUpClick = (virus) => {
    setIsViewStructurePopUpOpen(true)
    setPopUpVirus(virus)
  }

  const handleCloseViewStructurePopUpClick = () => {
    setIsViewStructurePopUpOpen(false)
  }

  const handleLegendPopUpClick = () => {
    setIsLegendPopUpOpen(!isLegendPopUpOpen)
  }
  
  return (
    <div
      id="konva-container"
      className=" mt-32 mx-12 border drop-shadow-md rounded border-slate-300 text-[#4a95c0] overflow-hidden relative"
      style={{ height: "calc(100vh - 150px)"}}
    >
      {/* <ControlsPopUp /> */}
      <div className="flex flex-row absolute w-full justify-center  ">
        <div className="text-center absolute z-10 ">
      <h1 className="mt-2 xl:text-3xl lg:text-2xl font-light bg-[#e6e6e6de] px-2 border-0 rounded text-[#3a5868b4] ">Structure-Informed Map of the Human and Animal Virosphere</h1>
      <h2 className="mt-2 text-2xl font-light bg-[#e6e6e6de] px-2 border-0 rounded text-[#3a5868b4]  ">{hoveredVirus}</h2>
      </div>
      </div>
      <ClusterVisualisation setHoveredVirus={setHoveredVirus} handleViewStructurePopUpClick={handleViewStructurePopUpClick} />
      {isViewStructurePopUpOpen ? <ViewStructuresPopUp popUpVirus={popUpVirus} handleCloseViewStructurePopUpClick={handleCloseViewStructurePopUpClick} /> : null}
      <div className="absolute top-0 left-0 flex flex-col text-[#3a5868b4] ">
      <h3 className="text-4xl"></h3>
      </div>
      <div className="absolute top-0 left-0 flex flex-col text-[#3a5868b4] ">
        {isLegendPopUpOpen ? (<ClusterVisualisationLegend handleLegendPopUpClick={handleLegendPopUpClick}/>) : (
          <button onClick={handleLegendPopUpClick} className="mt-2 ml-2 xl:text-2xl lg:text-xl font-light bg-[#e6e6e6de] px-2 border-0 rounded text-[#6d828d] hover:text-[#505f66]">Legend</button>
        )}
      
      </div>
      {/* <div className="absolute bottom-0 xl:text-2xl md:text-lg left-0 right-0 flex flex-row justify-center gap-4 ">
      <h4 className="mt-2 font-light text-[#3a5868b4] z-10">Scroll to zoom /</h4>
      <h5 className="mt-2 font-light text-[#3a5868b4] z-10">Drag to pan /</h5>
      <h6 className="mt-2 font-light text-[#3a5868b4] z-10">Click to select a virus</h6>
      </div> */}
    </div>
  );
};

export default Home;
