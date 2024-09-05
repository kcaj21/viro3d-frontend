import React from "react";

const Legend: React.FC = () => {


  return (
    <>
        <div className="flex flex-row gap-4">
          <div className="inline-flex items-center">
            <span className="size-2 inline-block bg-[#ACCBE1] rounded-full me-2"></span>
            <span className="">Protein</span>
          </div>
          <div className="inline-flex items-center">
            <span className="size-2 inline-block bg-[#7C98B3] rounded-full me-2"></span>
            <span className="">Region</span>
          </div>
          <div className="inline-flex items-center">
            <span className="size-2 inline-block bg-[#4a95c0] rounded-full me-2"></span>
            <span className="">Mature Peptide</span>
          </div>
        </div>
    </>
  );
};

export default Legend;
