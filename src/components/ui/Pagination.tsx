import React from "react";

const Pagination: React.FC = ({currentPage, resultCount, handleNextPage, handlePrevPage}) => {
  return (
    <>
        <div className="pagination flex flex-col-2 gap-4 xs:justify-between sm:justify-end font-light px-8 py-4 xs:text-2xl sm:text-3xl text-[#4a95c0]">
        {currentPage > 1 && (
            <button
            onClick={handlePrevPage}
            className="border-2 drop-shadow-md rounded-md bg-[#f9f9f9] hover:border-[#4a95c0] px-2 py-2"
            >
            Prev
            </button>
        )}
        <p className="py-2">
            {currentPage} of {Math.ceil(resultCount / 10)}
        </p>
        {currentPage < Math.ceil(resultCount / 10) && (
            <button
            onClick={handleNextPage}
            className="border-2 drop-shadow-md rounded-md bg-[#f9f9f9] hover:border-[#4a95c0] px-2 py-2"
            >
            Next
            </button>
        )}
        </div>
    </>
  );
};

export default Pagination;
