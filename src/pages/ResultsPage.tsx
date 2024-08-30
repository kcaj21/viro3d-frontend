import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useResultsPageData } from "../hooks/useResultsPageData";
import ProteinStructureResults from "../components/ProteinStructureResults";
import VirusResults from "../components/VirusResults";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Pagination from "../components/ui/Pagination";
import FeatureBrowser from "../components/FeatureBrowser";

const ResultsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { filterParam, searchParam } = useParams();

  const { data, resultCount, isLoading } = useResultsPageData(
    filterParam,
    searchParam,
    currentPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filterParam, searchParam]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const annotations = [
    {
      id: "dfam-nrph-1",
      start: 10464,
      end: 10954,
      strand: "-",
      family: "TAR1",
      evalue: 1.1e-103,
      divergence: 10.26,
      join: "none",
    },
    {
      id: "dfam-nrph-1-end",
      start: 10954.01,
      end: 10978,
      strand: "-",
      family: "TAR1",
      evalue: 1.1e-103,
      divergence: 10.26,
      join: "left-join",
    },
    {
      id: "dfam-nrph-2-start",
      start: 10978.01,
      end: 10999.99,
      strand: "-",
      family: "TAR1",
      evalue: 1.1e-103,
      divergence: 10.26,
      join: "right-join",
    },
    {
      id: "dfam-nrph-2",
      start: 11000,
      end: 11463,
      strand: "-",
      family: "TAR1",
      evalue: 4.1e-165,
      divergence: 8.78,
      join: "none",
    },
    {
      id: "dfam-nrph-3",
      start: 12502,
      end: 12676,
      strand: "-",
      family: "L1MC4a_3end",
      evalue: 6.9e-16,
      divergence: 31.22,
      join: "none",
    },
  ];

  const id1 = "soda-chart-1";

  // if filterparam is virus -> render virusResults component
  // if filterparam is for returning protein structures -> render proteinStructureResults etc..

  return (
    <>
      {!isLoading && !data ? (
        <div className="min-h-screen">
          <div className="results-container flex flex-col items-center h-screen w-screen justify-center">
            <h2 className="mb-12 text-5xl text-slate-500">No Results</h2>
          </div>
        </div>
      ) : !data ? (
        <div className="min-h-screen">
          <div className="results-container flex flex-col items-center h-screen justify-center">
            <h2 className="mb-12 text-5xl text-slate-500">Searching...</h2>
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <div className="min-h-screen">
          <FeatureBrowser annotations={annotations} id={id1} />
          <div className="results-container min-h-screen mt-4 mb-4 border-0 text-5xl rounded-md drop-shadow-lg text-slate-500 bg-[#e6e6e6]">
            <div className="buttom-row flex flex-row justify-between font-light text-[#4a95c0]">
              <p className="px-8 mt-6">
                Showing {resultCount} results for "{searchParam}"
              </p>
              <Pagination
                currentPage={currentPage}
                resultCount={resultCount}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
              />
            </div>
            {filterParam !== "viruses" ? (
              <ProteinStructureResults data={data} />
            ) : (
              <VirusResults data={data} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ResultsPage;
