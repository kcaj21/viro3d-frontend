import React, { useState } from "react";
import VanillaTest from "../components/ui/VanillaTest";
import ControlsPopUp from "../components/ui/ControlsPopUp";
import ViewStructuresPopUp from "../components/ui/ViewStructuresPopUp";
import InfoIcon from "../components/ui/InfoIcon";
import ClusterVisualisationLegend from "../components/ui/ClusterVisualisationLegend";
import ClusterVisualisation from "../components/ui/ClusterVisualisation";

const Home: React.FC = () => {


  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [hoveredVirus, setHoveredVirus] = useState('');
  const [popUpVirus, setPopUpVirus] = useState('');


  const handleOpenPopUpClick = (virus) => {
    setIsPopUpOpen(true)
    setPopUpVirus(virus)
  }

  const handleClosePopUpClick = () => {
    setIsPopUpOpen(false)
  }

  

  return (
    <div
      id="konva-container"
      className=" mt-32 mx-12 border drop-shadow-md rounded border-slate-300 text-[#4a95c0] overflow-hidden relative"
      style={{ height: "calc(100vh - 150px)"}} // Adjust height as needed
    >
      {/* <ControlsPopUp /> */}
      <div className="flex flex-row justify-center">
      <h1 className="mt-2 text-4xl font-light bg-[#e6e6e6] px-2 border-0 rounded text-[#3a5868] absolute z-10">{hoveredVirus}</h1>
      </div>
      <ClusterVisualisation setHoveredVirus={setHoveredVirus} handleOpenPopUpClick={handleOpenPopUpClick} />
      {isPopUpOpen ? <ViewStructuresPopUp popUpVirus={popUpVirus} handleClosePopUpClick={handleClosePopUpClick} /> : null}
      <div className="absolute top-0 left-0 flex flex-col text-[#3a5868b4] ">
      <ClusterVisualisationLegend />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-center gap-4 ">
      <h3 className="mt-2  text-4xl font-light text-[#3a5868b4] z-10">Scroll to Zoom /</h3>
      <h4 className="mt-2  text-4xl font-light text-[#3a5868b4] z-10">Drag to Pan /</h4>
      <h4 className="mt-2  text-4xl font-light text-[#3a5868b4] z-10">Click to select a virus</h4>
      </div>
    </div>
  );
};

export default Home;
