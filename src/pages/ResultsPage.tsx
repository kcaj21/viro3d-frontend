import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useResultsPageData } from "../hooks/useResultsPageData";
import ProteinStructureResults from "../components/ProteinStructureResults";
import VirusResults from "../components/VirusResults";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Pagination from "../components/ui/Pagination";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";

const ResultsPage: React.FC = ({ setFilterParam, setSearchParam }) => {
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
    setFilterParam(filterParam);
    setSearchParam(searchParam);
  }, [filterParam, searchParam]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    // document.documentElement.scrollTop = 0
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
            <LoadingSpinner color={"#4a95c0"} size={"15"} />
          </div>
        </div>
      ) : (
        <div className="">
          {/* {filterParam !== "viruses" && filterParam !== "sequencematch" ? (
            <FeatureBrowserContainer
              filterParam={filterParam}
              searchParam={searchParam}
            />
          ) : null} */}
          <div className="results-container mt-8  border-0 text-5xl rounded-md drop-shadow-lg text-slate-500 bg-[#e6e6e6]">
            <div className="button-row flex flex-row  justify-between font-light text-[#4a95c0]">
              <p className="px-8 py-8 break-words">
                Showing {resultCount} results for: "
                {searchParam?.substring(0, 40)}..."
              </p>
            </div>
            <div className="">
              {filterParam !== "viruses" ? (
                <ProteinStructureResults
                  data={data}
                  filterParam={filterParam}
                  setFilterParam={setFilterParam}
                  setSearchParam={setSearchParam}
                />
              ) : (
                <VirusResults data={data} />
              )}
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
