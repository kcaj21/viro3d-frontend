import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useResultsPageData } from "../hooks/useResultsPageData";
import ProteinStructureResults from "../components/ProteinStructureResults";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Pagination from "../components/ui/Pagination";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";

const ResultsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { filterParam, searchParam } = useParams();

  const { coordinates, isLoading: genomeLoading } = useGenomeCoordinates(
    filterParam,
    searchParam
  );

  const { data, resultCount, isLoading } = useResultsPageData(
    filterParam,
    searchParam,
    currentPage
  );

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
        <div className="">
          <div className="results-container flex flex-col items-center h-screen w-screen justify-center">
            <h2 className="mb-12 text-5xl text-slate-500">No Results</h2>
          </div>
        </div>
      ) : !data ? (
        <div className="min-h-screen">
          <div className="results-container flex flex-col items-center h-screen justify-center">
            <h2 className="mb-12 text-5xl text-slate-500">Searching...</h2>
            <LoadingSpinner size={'5'}  />
          </div>
        </div>
      ) : (
        <div className="min-h-screen lg:mx-12 2xl:mx-0">
          {filterParam === "virus_name" ? (
                <FeatureBrowserContainer
                  searchParam={searchParam}
                  filterParam={filterParam}
              coordinates={coordinates}
              genomeLoading={genomeLoading}
            />
          ) : null}
          <div className="results-container min-height-max mt-8 border-0 text-5xl rounded-md drop-shadow-lg text-slate-500 bg-[#e6e6e6]">
            <div className="button-row flex flex-row  justify-between font-light text-[#4a95c0]">
              <p className="px-8 py-8 break-words">
                Showing {resultCount} results for: "
                {searchParam?.substring(0, 40)}..."
              </p>
            </div>
            <div className="min-h-[50vh]">
              <ProteinStructureResults data={data} filterParam={filterParam} />
            </div>
            {data.count > 10 ? (
              <Pagination
                currentPage={currentPage}
                resultCount={resultCount}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default ResultsPage;
