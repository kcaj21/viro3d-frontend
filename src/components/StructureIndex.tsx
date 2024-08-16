import React, { useState, useEffect } from "react";
import PdbeMolstar from "./PdbeMolstar";
import ProteinInfo from "./ProteinInfo";
import FeatureBrowser from "./FeatureBrowser";

const StructureIndex: React.FC = ({ filter }) => {
  return (
    <>
      <div className="IndexContainer flex min-h-screen flex-col gap-4  ">
        {/* <Searchbar /> */}
        <div className="GenomeBrowserContainer  ">
          <FeatureBrowser />
        </div>
        <div className="mt-12 mx-12 flex gap-24 flex-col-1 min-h-full ">
          <div className="w-[50%]">
            <PdbeMolstar />
          </div>
          <div className=" font-extralight">
            <ProteinInfo filter={filter} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StructureIndex;