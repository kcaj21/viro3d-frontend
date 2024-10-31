import React, { useState } from "react";
import VanillaTest from "../components/ui/VanillaTest";
import ControlsPopUp from "../components/ui/ControlsPopUp";
import ViewStructuresPopUp from "../components/ui/ViewStructuresPopUp";

const Test: React.FC = () => {


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
      className=" mt-40 mx-24 border drop-shadow-xl rounded border-slate-500 text-[#4a95c0] overflow-hidden relative"
      style={{ height: "calc(100vh - 200px)"}} // Adjust height as needed
    >
      {/* <ControlsPopUp /> */}
      <h1 className="mt-2 text-2xl text-black text-center w-full font-extralight absolute top-0 z-10">{hoveredVirus}</h1>
      <VanillaTest setHoveredVirus={setHoveredVirus} handleOpenPopUpClick={handleOpenPopUpClick} />
      {isPopUpOpen ? <ViewStructuresPopUp popUpVirus={popUpVirus} handleClosePopUpClick={handleClosePopUpClick} /> : null}

    </div>
  );
};

export default Test;
