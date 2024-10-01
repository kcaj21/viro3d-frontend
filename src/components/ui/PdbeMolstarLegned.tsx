import React from "react";

const PdbeMolstartLegend: React.FC = () => {

  return (
    <>
        <div className="flex text-slate-500 text-sm justify-between flex-row px-1 mt-4">
          <div className="inline-flex items-center">
            <span className="size-2 inline-block bg-[#023688] rounded-full me-2"></span>
            <span className="">Very high (pLDDT &gt; 90)</span>
          </div>
          <div className="inline-flex items-center">
            <span className="size-2 inline-block bg-[#65caf1] rounded-full me-2"></span>
            <span className="">High (90 &gt; pLDDT &gt; 70)</span>
          </div>
          <div className="inline-flex items-center">
            <span className="size-2 inline-block bg-[#f8d615] rounded-full me-2"></span>
            <span className="">Low (70 &gt; pLDDT &gt; 50)</span>
        </div>
        <div className="inline-flex items-center">
            <span className="size-2 inline-block bg-[#cf6739] rounded-full me-2"></span>
            <span className="">Very low (pLDDT &lt; 50)</span>
        </div>
        </div>
    </>
  );
};

export default PdbeMolstartLegend;
