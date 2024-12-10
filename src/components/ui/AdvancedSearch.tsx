import React, { useState, useEffect } from "react";

type AdvancedSearchProps = {
  advancedSearch: string;
  setAdvancedSearch: React.Dispatch<React.SetStateAction<string>>;
  clearAdvancedSearch: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  advancedSearch,
  setAdvancedSearch,
  clearAdvancedSearch,
  setCurrentPage
}) => {
  const [inputValue, setInputValue] = useState<string>(advancedSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      setAdvancedSearch(encodeURIComponent(inputValue));
      setCurrentPage(1)
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setAdvancedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    setInputValue("");
    clearAdvancedSearch(event);
  };

  return (
    <form className="hidden sm:flex flex-col-1 xs:w-[100%] sm:w-[55%] lg:w-[100%] border-0 border-[#f9f9f9] rounded-full xs:text-lg sm:text-base lg:text-2xl bg-[#f9f9f9]">
      <div className="input-container relative w-full">
        <div className="flex items-center">
          <input
            placeholder="Filter by virus..."
            value={inputValue}
            onChange={handleInputChange}
            className="text-slate-500 pl-4 outline-none sm:h-12 w-full border-0 rounded-full xs:text-lg lg:text-2xl bg-[#f9f9f9]"
            type="text"
          />
          {inputValue ? (
            <button
              type="button"
              onClick={handleClear}
              className="mr-2 text-[#9ca3af] xs:text-sm md:text-xl hover:text-[#777d88] border-0 rounded-full hover:bg-[#4343431e]"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                height="1.5em"
                width="1.5em"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9.293l3.646-3.647a.5.5 0 11.708.708L10.707 10l3.647 3.646a.5.5 0 01-.708.708L10 10.707l-3.646 3.647a.5.5 0 11-.708-.708L9.293 10 5.646 6.354a.5.5 0 11.708-.708L10 9.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default AdvancedSearch;
