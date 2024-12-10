import React, { useEffect } from "react";
import { Virus } from "../../types/proteindata";

type ResultsFilterProps = {
  viruses: Virus[];
  setAdvancedSearch: React.Dispatch<React.SetStateAction<string>>;
};



const ResultsFilter: React.FC<ResultsFilterProps> = ({ viruses, setAdvancedSearch }) => {

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setAdvancedSearch(e.target.value)
    }
    
  return (
    <>
      <form className="w-full mx-auto">
        <select
          id="countries"
          className=" text-slate-500 text-center text-lg rounded-full w-full p-2.5"
          onChange={handleChange}
        >
          <option disabled selected>Filter by virus</option>
          {viruses?.map((virus) => (
            <option key={virus._id} value={virus._id}>
              {virus._id}
            </option>
          ))}
        </select>
      </form>
    </>
  );
};

export default ResultsFilter;
