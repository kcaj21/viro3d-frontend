import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useAutocomplete, useViruses } from "../../hooks/useAutocomplete";
import { useCallback } from "react";

type Link = {
  title: string;
  href: string;
};

type NavbarProps = {
  links: Link[];
};

const Navbar: React.FC = () => {
  const [searchParam, setSearchParam] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [filterParam, setFilterParam] = useState("viruses");

  const { data } = useAutocomplete(suggestion, 0);

  const navigate = useNavigate();

  // const autoComplete = debounce((search) => {
  //   const {data} = useViruses(search, 0)
  //   setSuggestion(data)
  //   console.log(suggestion)
  // }, 300)

  const handleText = (e) => {
    setSearchParam(e.target.value);
    // debounce(autoComplete(searchParam), 300)
    // autoComplete(e.target.value)
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = debounce((search) => {
    setSuggestion(search);
    console.log(suggestion);
  }, 300);

  const handleFilter = (e) => {
    setFilterParam(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filterParam === "viruses") {
      navigate(`/resultspage/${filterParam}/${searchParam}`);
    } else {
      navigate(`/proteinresultspage/${filterParam}/${searchParam}`);
    }
  };

  // useCallback(
  //   debounce((searchParam) => {
  //     let data = useViruses(searchParam, 0)
  //     setSuggestion(data)
  //   console.log(suggestion)

  //   }, 300), // Debounce for 300 milliseconds
  //   [searchParam]
  // );

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 z-20 border-b-2 border-[#d6d5d5] text-[#4a95c0] drop-shadow-md bg-[#e6e6e6]"
      >
        <div className="flex items-center md:justify-around sm: justify-end mx-auto px-4 py-2">
          <Link to={`/`}>
            <img src="/cvrbioinformatics.png" width="200"></img>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col-1 w-[50%] border-none rounded-md text-2xl bg-[#f9f9f9]"
          >
            <select
              id="search-filter"
              onChange={handleFilter}
              className="bg-[#f9f9f9] text-slate-500 pr-6 rounded border-r-2 text-center"
            >
              <option value="viruses">Virus Name</option>
              <option value="sequencematch">Sequence</option>
            </select>
            <div className="input-container relative w-full">
              <div className="w-full flex justify-between">
                <input
                  onChange={handleText}
                  className=" text-slate-500 pl-4 outline-none h-12 w-full border-none rounded-md text-2xl  bg-[#f9f9f9]"
                  type="text"
                  placeholder="Search Virus Name or Sequence..."
                ></input>
                <button>
                  <svg
                    className="mr-4"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    onClick={handleSubmit}
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
                  </svg>
                </button>
              </div>
              {suggestion ? (
                
                <ul className="autocomplete w-full  absolute z-50 max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto">
                  {data.viruses?.map((virus) => (
                              <Link
                              to={{ pathname: `/proteinresultspage/virus_name/${virus.virus_name}` }} 
                              key={virus.virus_name}
                            >
                      <li>{virus.virus_name}</li>
                      </Link>
                  ))}
                </ul>
              ) : null}
            </div>
          </form>
          <ul className="flex  p-4 md:p-0 md:flex-row md:space-x-32 font-extralight text-4xl text-[#4a95c0]">
            <button className="hover:text-[#50bde5]">About</button>
            <button className="hover:text-[#50bde5]">Downloads</button>
            <button className="hover:text-[#50bde5]">API</button>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
