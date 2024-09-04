import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useResultsPageData } from "../hooks/useResultsPageData";
import ProteinStructureResults from "../components/ProteinStructureResults";
import VirusResults from "../components/VirusResults";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Pagination from "../components/ui/Pagination";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";

const ResultsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { filterParam, searchParam } = useParams();

  const { data, resultCount, isLoading } = useResultsPageData(
    filterParam,
    searchParam,
    currentPage
  );

  useEffect(() => {
    if (filterParam !== "sequencematch") {
      setCurrentPage(1);
    } else {
      setCurrentPage(0);
    }
  }, [filterParam, searchParam]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

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
            <LoadingSpinner color={""} size={"15"} />
          </div>
        </div>
      ) : (
        <div className="min-h-screen">
          {filterParam !== "viruses" && filterParam !== "sequencematch" ? (
            <FeatureBrowserContainer
              filterParam={filterParam}
              searchParam={searchParam}
            />
          ) : null}
          <div className="results-container min-h-screen mt-4 mb-4 border-0 text-5xl rounded-md drop-shadow-lg text-slate-500 bg-[#e6e6e6]">
            <div className="buttom-row flex flex-row justify-between font-light text-[#4a95c0]">
              <p className="px-8 mt-6 break-all">
                Showing {resultCount} results for "{searchParam}"
              </p>
              {currentPage > 0 ? (
                <Pagination
                  currentPage={currentPage}
                  resultCount={resultCount}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                />
              ) : null}
            </div>
            {filterParam !== "viruses" ? (
              <ProteinStructureResults data={data} filterParam={filterParam} />
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
