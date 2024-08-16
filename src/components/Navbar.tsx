import React, { useState } from "react";
import { Link } from "react-router-dom";

type Link = {
  title: string;
  href: string;
};

type NavbarProps = {
  links: Link[];
};

const Navbar: React.FC = () => {
  const [searchParam, setSearchParam] = useState("");
  const [filterParam, setFilterParam] = useState("species");

  //change onChanges to onSubmits - bug where entering a new term in the searchbar on the results page wont update the state

  const handleText = (e) => {
    setSearchParam(e.target.value);
    console.log(searchParam);
  };

  const handleFilter = (e) => {
    setFilterParam(e.target.value);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-20 border-b-2 border-[#d6d5d5] text-[#4a95c0] drop-shadow-md bg-[#e6e6e6]">
        <div className="flex items-center md:justify-around sm: justify-end mx-auto px-4 py-2">
          <Link to={`/`}>
            <img src="src/assets/CVR_RGB.png" width="200"></img>
          </Link>
          {/* <label for="search-filter">Search by...</label> */}

          <form className="flex flex-col-1 w-[50%] border-none rounded-md text-2xl bg-[#f9f9f9]">
            <select
              id="search-filter"
              onChange={handleFilter}
              className="bg-[#f9f9f9] text-slate-500 rounded border-r-2 text-center"
            >
              <option value="species">Species</option>
              <option value="gene">Gene</option>
              <option value="genbankid">GenbankID</option>
              <option value="refseq">RefSeq</option>
              <option value="taxid">TaxID</option>
            </select>
            <input
              onChange={handleText}
              className=" text-slate-500 pl-4 outline-none h-12 w-full border-none rounded-md text-2xl  bg-[#f9f9f9]"
              type="text"
              placeholder="Search by GenbankID, Species, Gene or Sequence..."
            ></input>
            <Link to={`resultspage/${filterParam}/${searchParam}`}>
              <svg
                className="mr-4 mt-2"
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
              >
                <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
              </svg>
            </Link>
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
