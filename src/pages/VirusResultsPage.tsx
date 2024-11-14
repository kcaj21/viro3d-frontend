import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useResultsPageData } from "../hooks/useResultsPageData";
import VirusResults from "../components/VirusResults";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Pagination from "../components/ui/Pagination";

const VirusResultsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { filterParam, searchParam } = useParams();

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

  return (
    <div className="min-h-[80vh] xs:mt-24 xs:mb-12 md:mb-12 md:mt-32 xs:mx-4 sm:mt-24 xl:mb-8 2xl:mb-0 2xl:mt-40     md:mx-24 xs:text-xl 2xl:text-5xl">
      {!isLoading && !data ? (
        <div className="results-container flex flex-col items-center h-screen w-screen justify-center">
          <h2 className="mb-12 text-5xl text-slate-500">No Results</h2>
        </div>
      ) : !data ? (
        <div className="results-container flex flex-col items-center h-screen justify-center">
          <h2 className="mb-12 text-5xl text-slate-500">Searching...</h2>
          <LoadingSpinner size={"5"} />
        </div>
      ) : (
        <>
          {!data.viruses ? (
            <div className="flex flex-col text-center items-center h-[50vh] justify-center">
              <div className="mb-12  text-5xl text-slate-500">Error:</div>
              <div className="  text-5xl text-slate-500">
                {JSON.stringify(data.detail)}
              </div>
            </div>
          ) : (
            <div className="results-container  flex flex-col justify-between mt-8 border drop-shadow-md rounded border-slate-300 text-slate-500 bg-[#e6e6e6]">
              <div>
                <div className="button-row flex flex-row justify-between xs:text-xl lg:text-2xl 2xl:text-3xl font-light text-[#4a95c0]">
                  <p className="px-8 py-8 break-words">
                    Showing {resultCount} results for: "
                    {searchParam?.substring(0, 40)}..."
                  </p>
                </div>
                <div className="min-h-[50vh]">
                  <VirusResults data={data} />
                </div>
              </div>
              {data.count > 10 && (
                <Pagination
                  currentPage={currentPage}
                  resultCount={resultCount}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VirusResultsPage;
