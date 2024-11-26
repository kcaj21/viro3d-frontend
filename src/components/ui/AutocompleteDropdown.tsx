import React, { useRef } from "react";
import { ProteinData } from "../../types/proteindata";
import { VirusData } from "../../types/virusdata";
import { Link } from "react-router-dom";

type AutocompleteDropdownProps = {
  data: VirusData | ProteinData;
  isAutoCompleteOpen: boolean;
  filterParam: string;
  suggestion: string;
  clearSuggestion: () => void;
};

const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({
  data,
  isAutoCompleteOpen,
  filterParam,
  suggestion,
  clearSuggestion,
}) => {
  const ref = useRef<HTMLUListElement | null>(null);

  return (
    <>
      {isAutoCompleteOpen && filterParam === "viruses" && suggestion && data ? (
        <ul
          key={`${filterParam}-${suggestion}`}
          ref={ref}
          className="autocomplete w-full lg:text-2xl xs:text-lg absolute z-50 max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto"
        >
          {"viruses" in data &&
            data.viruses?.map((virus) => (
              <Link
                onClick={clearSuggestion}
                to={{
                  pathname: `/proteinresultspage/virus_name/${encodeURIComponent(
                    virus._id
                  )}`,
                }}
                key={virus._id}
              >
                <li className="hover:bg-slate-100 border-0 border-b">
                  {virus._id}
                </li>
              </Link>
            ))}
        </ul>
      ) : null}

      {isAutoCompleteOpen &&
      filterParam === "proteinname" &&
      suggestion &&
      data ? (
        <ul
          key={`${filterParam}-${suggestion}`}
          ref={ref}
          className="autocomplete w-full absolute z-50 max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto"
        >
          {"protein_structures" in data &&
            data.protein_structures?.map((protein) => (
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
                  {protein.genbank_name_curated}
                </li>
              </Link>
            ))}
        </ul>
      ) : null}
    </>
  );
};

export default AutocompleteDropdown;
