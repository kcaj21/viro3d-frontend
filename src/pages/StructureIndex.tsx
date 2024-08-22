import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PdbeMolstar from "../components/PdbeMolstar";
import ProteinInfo from "../components/ProteinInfo";
import FeatureBrowser from "../components/FeatureBrowser";
import { useStructureIndexData } from "../hooks/useStructureIndexData";

const StructureIndex: React.FC = ({ }) => {
  
  document.documentElement.scrollTop = 0

  const { recordID } = useParams();

  const { proteinInfo } = useStructureIndexData(recordID);

  const annotations = [
    {
    "id": "dfam-nrph-1",
    "start": 10464,
    "end": 10954,
    "strand": "-",
    "family": "TAR1",
    "evalue": 1.1e-103,
    "divergence": 10.26,
    "join": "none"
    },
    {
      "id": "dfam-nrph-1-end",
      "start": 10955,
      "end": 10977,
      "strand": "-",
      "family": "TAR1",
      "evalue": 1.1e-103,
      "divergence": 10.26,
      "join": "left-join"
    },
    {
      "id": "dfam-nrph-2-start",
      "start": 10978,
      "end": 10999,
      "strand": "-",
      "family": "TAR1",
      "evalue": 1.1e-103,
      "divergence": 10.26,
      "join": "right-join"
    },
    {
    "id": "dfam-nrph-2",
    "start": 11000,
    "end": 11463,
    "strand": "-",
    "family": "TAR1",
    "evalue": 4.1e-165,
    "divergence": 8.78,
    "join": "none"
    },
    {
    "id": "dfam-nrph-3",
    "start": 11502,
    "end": 11676,
    "strand": "-",
    "family": "L1MC4a_3end",
    "evalue": 6.9e-16,
    "divergence": 31.22,
    "join": "none"
    }
  ]
  
  const id1 = 'soda-chart-1'
  const id2 = 'soda-chart-2'
  const id3 = 'soda-chart-3'
  const id4 = 'soda-chart-4'
  const id5 = 'soda-chart-5'
  const id6 = 'soda-chart-6'
  const id7 = 'soda-chart-7'
  const id8 = 'soda-chart-8'


  return (
    <>
      <div className="IndexContainer flex min-h-screen flex-col gap-4  ">
        {/* <Searchbar /> */}
        <div className="GenomeBrowserContainer custom-scrollbar overflow-x-auto flex flex-col-1   ">
          <FeatureBrowser annotations={annotations} id={id1} />
          <FeatureBrowser annotations={annotations} id={id2}/>
          <FeatureBrowser annotations={annotations} id={id3}/>
          <FeatureBrowser annotations={annotations} id={id4}/>
          <FeatureBrowser annotations={annotations} id={id5}/>
          <FeatureBrowser annotations={annotations} id={id6}/>
          <FeatureBrowser annotations={annotations} id={id7}/>
          <FeatureBrowser annotations={annotations} id={id8}/>

        </div>
        <div className="mt-12 mx-12 flex gap-24 flex-col-1 min-h-full ">
          <div className="w-[50%]">
            <PdbeMolstar />
          </div>
          <div className=" font-extralight">
            <ProteinInfo proteinInfo={proteinInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StructureIndex;
