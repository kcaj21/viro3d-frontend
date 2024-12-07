import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProteinStructureResults from "../components/ProteinStructureResults";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Pagination from "../components/ui/Pagination";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";
import { useProteins } from "../hooks/useProteins";
import { isMobile } from "react-device-detect";

const ProteinResultsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { filterParam, searchParam } = useParams();

  const { coordinates, isLoading: genomeLoading } = useGenomeCoordinates(
    filterParam ?? "",
    searchParam ?? ""
  );

  const { data, isLoading } = useProteins(
    filterParam ?? "",
    searchParam ?? "",
    currentPage
  );

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="min-h-screen xs:mt-24 xs:mb-12 sm:mt-40 my-auto xs:mx-4 md:mx-24">
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
              <LoadingSpinner />
            </div>
          </div>
        ) : (
          <>
            {data.detail ? (
              <div className="flex flex-col text-center items-center h-[50vh] justify-center">
                <div className="mb-12  text-5xl text-slate-500">Error:</div>
                <div className="  text-5xl text-slate-500">
                  {JSON.stringify(data.detail)}
                </div>
              </div>
            ) : (
              <div className=" min-h-screen lg:mx-12 2xl:mx-0">
                {filterParam === "virus_name" && coordinates?.segments && !isMobile ? (
                  <FeatureBrowserContainer
                    searchParam={searchParam}
                    filterParam={filterParam}
                    coordinates={coordinates}
                    genomeLoading={genomeLoading}
                    isolate={coordinates?.segments[0]["isolate_designation"]}
                  />
                ) : null}

                <div className="results-container min-h-full mt-8 text-5xl border drop-shadow-md rounded border-slate-300 text-slate-500 bg-[#e6e6e6]">
                  <div className="button-row flex flex-row justify-between font-light text-[#4a95c0]">
                    <p className="px-8 mt-8 xs:text-lg md:text-xl xl:text-3xl break-all">
                      Showing {data.count} results for: "
                      {searchParam?.substring(0, 40)}..."
                    </p>
                  </div>
                  <div className="min-h-[50vh]">
                    <ProteinStructureResults
                      data={data}
                      filterParam={filterParam}
                      searchParam={searchParam}
                    />
                  </div>
                  {data.count > 10 && (
                    <Pagination
                      currentPage={currentPage}
                      resultCount={data.count}
                      handleNextPage={handleNextPage}
                      handlePrevPage={handlePrevPage}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProteinResultsPage;
