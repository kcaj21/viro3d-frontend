import React, { useState } from "react";
import ViewStructuresPopUp from "../components/ui/ViewStructuresPopUp";
import ClusterVisualisationLegend from "../components/ui/ClusterVisualisationLegend";
import ClusterVisualisation from "../components/ui/ClusterVisualisation";
import TestGenomeBrowser from "../components/ui/TestGenomeBrowser";

const Test: React.FC = () => {
  const group = [{

        id: "AF547984.1",
        start: 32828.0,
        end: 53012.0,
        segment: "Non-segmented",
        annotations: [
          {
            id: "AAP85681.1_12386",
            nt_acc: "AF547984.1",
            virus_name: "Adoxophyes orana granulovirus",
            gene_name: "Gene: ORF_44",
            pept_cat: "protein",
            segment: "Non-segmented",
            start: 32828.0,
            end: 32974.0,
            strand: "+",
            family: "AAP85681.1_12386",
            join: "none",
          },
          {
            id: "AAP85709.1_12386",
            nt_acc: "AF547984.1",
            virus_name: "Adoxophyes orana granulovirus",
            gene_name: "Gene: p6.9",
            pept_cat: "protein",
            segment: "Non-segmented",
            start: 52845.0,
            end: 53012.0,
            strand: "+",
            family: "AAP85709.1_12386",
            join: "none",
          }
        ],
      }]

  return <div className="mt-24 mx-4 min-h-screen">
    <TestGenomeBrowser group={group} />
  </div>;
};

export default Test;
