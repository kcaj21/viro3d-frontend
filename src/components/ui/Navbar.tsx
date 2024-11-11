import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useAutocomplete } from "../../hooks/useAutocomplete";

type Link = {
  title: string;
  href: string;
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [filterParam, setFilterParam] = useState("viruses");
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  const { data } = useAutocomplete(filterParam, suggestion, 0);

  const ref = useRef();

  const checkIfClickedOutside = (e) => {
    if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [checkIfClickedOutside]);

  const navigate = useNavigate();

  const clearSuggestion = () => {
    setSuggestion("");
  };

  const handleText = (e) => {
    setSearchParam(encodeURIComponent(e.target.value));
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = debounce((search) => {
    if (
      (search.length > 4 && filterParam === "proteinname") ||
      (search.length > 2 && filterParam === "viruses")
    ) {
      setSuggestion(search);
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, 0);

  const handleFilter = (e) => {
    setFilterParam(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchParam.length > 0) {
    clearSuggestion();

    if (filterParam === "viruses") {
      navigate(`/resultspage/${filterParam}/${searchParam}`);
    } else {
      navigate(`/proteinresultspage/${filterParam}/${searchParam}`);
    }
  }
  };

  // New function to clear the search input
  const clearSearch = () => {
    setSearchParam("");
    setSuggestion("");
  };

  return (
    <>
      <nav
        id="navbar"
        className={`xs:block sm:fixed top-0 left-0 right-0 z-20 border-b-2 border-[#d6d5d5] text-[#4a95c0] drop-shadow-md bg-[#e6e6e6e7] transition-transform duration-300 transform ${
          show ? "translate-y-0" : "-translate-y-full"
        } `}
      >
        <div className="flex items-center md:justify-around sm:justify-end mx-auto px-4 sm:py-2 xs:py-0">
          <Link onClick={clearSuggestion} to={`/`}>
            <img className="xs:hidden sm:block" src="/cvrbioinformatics.png" width="150"></img>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col-1 xl:w-[50%] border-0 border-[#f9f9f9] rounded-full divide-x-4 xs:text-xs sm:text-2xl bg-[#f9f9f9]"
          >
            <select
              id="search-filter"
              onChange={handleFilter}
              className="bg-[#f9f9f9] rounded-full text-slate-500 px-2 text-center"
            >
              <option value="viruses">Virus Name</option>
              <option value="proteinname">Protein Name</option>
              <option value="sequencematch">Sequence</option>
              <option value="genbankid">Protein ID</option>
            </select>
            <div className="input-container relative w-full">
              <div className="w-full flex items-center">
                <input
                  value={decodeURIComponent(searchParam)}
                  onChange={handleText}
                  className="text-slate-500 pl-4 outline-none sm:h-12 xs:h-8 w-full border-none xs:text-xs sm:text-2xl bg-[#f9f9f9]"
                  type="text"
                />
                {searchParam && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mr-2 text-[#9ca3af] text-3xl hover:text-[#777d88] border-0 rounded-full hover:bg-[#4343431e]"
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
                )}
                <button className="border-0 px-2 py-1 mr-2 text-[#9ca3af] hover:text-[#777d88] rounded-full  hover:bg-[#4343431e]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
                  </svg>
                </button>
              </div>
              {isMenuOpen && filterParam === "viruses" && suggestion && data ? (
                <ul
                  key={`${filterParam}-${suggestion}`}
                  ref={ref}
                  className="autocomplete w-full absolute z-50 max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto"
                >
                  {data.viruses?.map((virus) => (
                    <Link
                      onClick={clearSuggestion}
                      to={{
                        pathname: `/proteinresultspage/virus_name/${encodeURIComponent(
                          virus._id
                        )}`,
                      }}
                      key={virus._id}
                    >
                      <li className="hover:bg-slate-100 border-0 rounded-lg">
                        {virus._id}
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : null}
              {isMenuOpen &&
              filterParam === "proteinname" &&
              suggestion &&
              data ? (
                <ul
                  key={`${filterParam}-${suggestion}`}
                  ref={ref}
                  className="autocomplete w-full absolute z-50 max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto"
                >
                  {data.protein_structures?.map((protein) => (
                    <Link
                      onClick={clearSuggestion}
                      to={{
                        pathname: `/structureindex/${encodeURIComponent(
                          protein["Virus name(s)"]
                        )}/${protein._id}`,
                      }}
                      key={protein._id}
                    >
                      <li className="hover:bg-slate-100 border-0 rounded-lg">
                        {protein["Virus name abbreviation(s)"] !== ""
                          ? `${protein["Virus name abbreviation(s)"]}: `
                          : `${protein["Virus name(s)"]}: `}
                        {protein.genbank_name}
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : null}
            </div>
          </form>
          <ul className=" flex p-4 md:p-0 md:flex-row 2xl:space-x-32 xl:space-x-18 md:space-x-8 font-extralight xs:text-sm sm:text-3xl text-[#4a95c0]">
            <button className="hover:text-[#50bde5]">
              <a href="/about">About</a>
            </button>
            <button className="hover:text-[#50bde5]">
              <a href="api/docs">API</a>
            </button>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
