import React from "react";
import { Link } from "react-router-dom";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";
import FeatureBrowser from "../components/FeatureBrowser";

const FeatureBrowserContainer: React.FC = ({ filterParam, searchParam }) => {
    const { coordinates } = useGenomeCoordinates(filterParam, searchParam);
    
    // const annotations = [
    //     {
    //       id: "dfam-nrph-1",
    //       start: 10464,
    //       end: 10954,
    //       strand: "-",
    //       family: "TAR1",
    //       evalue: 1.1e-103,
    //       divergence: 10.26,
    //       join: "none",
    //     },
    //     {
    //       id: "dfam-nrph-1-end",
    //       start: 10954.01,
    //       end: 10978,
    //       strand: "-",
    //       family: "TAR1",
    //       evalue: 1.1e-103,
    //       divergence: 10.26,
    //       join: "left-join",
    //     },
    //     {
    //       id: "dfam-nrph-2-start",
    //       start: 10978.01,
    //       end: 10999.99,
    //       strand: "-",
    //       family: "TAR1",
    //       evalue: 1.1e-103,
    //       divergence: 10.26,
    //       join: "right-join",
    //     },
    //     {
    //       id: "dfam-nrph-2",
    //       start: 11000,
    //       end: 11463,
    //       strand: "-",
    //       family: "TAR1",
    //       evalue: 4.1e-165,
    //       divergence: 8.78,
    //       join: "none",
    //     },
    //     {
    //       id: "dfam-nrph-3",
    //       start: 12502,
    //       end: 12676,
    //       strand: "-",
    //       family: "L1MC4a_3end",
    //       evalue: 6.9e-16,
    //       divergence: 31.22,
    //       join: "none",
    //     },
    // ];
    
    const annotations = [
        {
                    "id": "BAA04609.1.1_7118_mat_pept",
                    "nt_acc": "D17763.1",
                    "virus_name": "hepatitis C virus genotype 3a",
                    "gene_name": "C",
                    "segment": "N/A",
                    "start": 339.0,
                    "end": 530.0,
                    "strand": "+",
                    "family": "BAA04609.1.1_7118",
                    "join": "none"
                },
                {
                    "id": "BAA04609.1.1_7118",
                    "nt_acc": "D17763.1",
                    "virus_name": "hepatitis C virus genotype 3a",
                    "gene_name": "C",
                    "segment": "N/A",
                    "start": 340.0,
                    "end": 912.0,
                    "strand": "+",
                    "family": "BAA04609.1.1_7118",
                    "join": "none"
                }

    ]

  return coordinates === null ? (
      <>
          <p>loading</p>
      </>
  ) : (
    <>
      <div className="feature-browsers">
        {/* {console.log(coordinates.segments[0].coordinates)}
        {coordinates.segments?.map((segment) => (
              <FeatureBrowser annotations={annotations} id={segment.virus_name} />
        ))} */}
              <FeatureBrowser annotations={coordinates.segments[0].coordinates} id={'abc'} />
      </div>
    </>
  );
};

export default FeatureBrowserContainer;
