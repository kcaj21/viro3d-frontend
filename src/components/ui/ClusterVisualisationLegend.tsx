import React from "react";

const ClusterVisualisationLegend: React.FC = ({handleLegendPopUpClick}) => {

//   const colourKeys = {"Riboviria": "#5cb7a8", "Monodnaviria": "#b87795", "Unclassified": "gray", "Varidnaviria": "#f1e9c5", "Ribozyviria": "#117733", "Duplodnaviria": "#8b81b9" }


  return (
    <>
        <div className="flex flex-col mx-2 my-2 px-2 py-2 border-0 xl:text-lg lg:text-md sm:text-xs rounded bg-[#e6e6e6de] gap-2">
        <button onClick={handleLegendPopUpClick} className="text-[#6d828d] xl:text-2xl lg:text-xl border-b hover:border-[#505f66] hover:text-[#505f66]">Hide Legend</button>
          <div className="inline-flex italic items-center">
            <span className="size-4 inline-block bg-[#8b81b9] rounded-full me-2"></span>
            <span className="">Duplodnaviria</span>
          </div>
          <div className="inline-flex italic items-center">
            <span className="size-4 inline-block bg-[#b87795] rounded-full me-2"></span>
            <span className="">Monodnaviria</span>
          </div>
          <div className="inline-flex italic items-center">
            <span className="size-4 inline-block bg-[#5cb7a8] rounded-full me-2"></span>
            <span className="">Riboviria</span>
        </div>
        <div className="inline-flex italic items-center">
            <span className="size-4 inline-block bg-[#117733] rounded-full me-2"></span>
            <span className="">Ribozyviria</span>
        </div>
        <div className="inline-flex italic items-center">
            <span className="size-4 inline-block bg-[#ddc454] rounded-full me-2"></span>
            <span className="">Varidnaviria</span>
          </div>
          <div className="inline-flex italic items-center">
            <span className="size-4 inline-block bg-gray-500 rounded-full me-2"></span>
            <span className="">Unclassified</span>
          </div>
        </div>
    </>
  );
};

export default ClusterVisualisationLegend;