import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useAutocomplete } from "../../hooks/useAutocomplete";

type Link = {
  title: string;
  href: string;
};

type NavbarProps = {
  links: Link[];
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [filterParam, setFilterParam] = useState("viruses");
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // if scrolling down, hide the navbar
        setShow(false);
      } else {
        // if scrolling up, show the navbar
        setShow(true);
      }

      // remember the current page location for the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const { data } = useAutocomplete(filterParam, suggestion, 0);

  const ref = useRef();

  const checkIfClickedOutside = (e) => {
    // If the menu is open and the clicked target is not within the menu,
    // then close the menu
    if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
    console.log("clicked");
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
    // setSearchParam((e.target.value.replace(/\//g, '%2F')));
    setSearchParam(encodeURIComponent(e.target.value))
    console.log(searchParam)
    debouncedSearch(e.target.value);
    setIsMenuOpen(true);
  };

  const debouncedSearch = debounce((search) => {
    setSuggestion(search);
    console.log(suggestion);
  }, 100);

  const handleFilter = (e) => {
    setFilterParam(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearSuggestion();

    if (filterParam === "viruses") {
      navigate(`/resultspage/${filterParam}/${searchParam}`);
    } else {
      navigate(`/proteinresultspage/${filterParam}/${searchParam}`);
    }
  };

  return (
    <>
      <nav
        id="navbar"

        className={`fixed top-0 left-0 right-0 z-20 border-b-2 border-[#d6d5d5] text-[#4a95c0] drop-shadow-md bg-[#e6e6e6] transition-transform duration-300 transform ${show ? 'translate-y-0' : '-translate-y-full'} `}
      >
        <div className="flex items-center   md:justify-around sm: justify-end mx-auto px-4 py-2">
          <Link onClick={clearSuggestion} to={`/`}>
            <img src="/cvrbioinformatics.png" width="200"></img>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col-1 xl:w-[50%] border-0 border-[#f9f9f9] rounded  divide-x-4 text-2xl bg-[#f9f9f9]"
          >
            <select
              id="search-filter"
              onChange={handleFilter}
              className="bg-[#f9f9f9] rounded text-slate-500 text-center"
            >
              <option value="viruses">Virus Name</option>
              <option value="proteinname">Protein Name</option>
              <option value="sequencematch">Sequence</option>
              <option value="genbankid">Protein ID</option>
              </select>
            <div className="input-container relative w-full">
              <div className="w-full flex justify-between">
                <input
                  onChange={handleText}
                  className=" text-slate-500 pl-4 outline-none h-12 w-full border-none  text-2xl  bg-[#f9f9f9]"
                  type="text"
                  // placeholder="Search Virus Name or Sequence..."
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
              {isMenuOpen && filterParam === "viruses" && suggestion && data ? (
                <ul
                  ref={ref}
                  className="autocomplete w-full  absolute z-50 max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto"
                >
                  {data.viruses?.map((virus) => (
                    <Link
                      onClick={clearSuggestion}
                      to={{
                        pathname: `/proteinresultspage/virus_name/${virus.virus_name}`,
                      }}
                      key={virus.virus_name}
                    >
                      <li className="hover:bg-slate-100 border-0 rounded-lg">
                        {virus.virus_name}
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : null}
              {isMenuOpen && filterParam === "proteinname" && suggestion && data ? (
                <ul
                  ref={ref}
                  className="autocomplete w-full  absolute z-50 max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto"
                >
                  {data.protein_structures?.map((protein) => (
                    <Link
                    onClick={clearSuggestion}
                      to={{
                        pathname:`/structureindex/${protein['Virus name(s)']}/${protein._id}`,
                      }}
                      key={protein.genbank_name}
                    >
                      <li className="hover:bg-slate-100 border-0 rounded-lg">
                      {protein['Virus name abbreviation(s)']}: {protein.genbank_name}
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : null}
            </div>
          </form>
          <ul className="flex  p-4 md:p-0 md:flex-row 2xl:space-x-32 xl:space-x-18 md:space-x-8 font-extralight text-4xl text-[#4a95c0]">
            <button className="hover:text-[#50bde5]">About</button>
            <button className="hover:text-[#50bde5]">Downloads</button>
            <button className="hover:text-[#50bde5]">
              <a href="http://viro3d-dev.cvr.gla.ac.uk/api/docs">API</a></button>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
