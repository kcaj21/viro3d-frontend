import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useResultsPageData } from "../hooks/useResultsPageData";

import FeatureBrowser from "../components/FeatureBrowser";

const ResultsPage: React.FC<{
  setFilter: React.Dispatch<React.SetStateAction<any[]>>;
}> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { filterParam, searchParam } = useParams();

  const { proteinInfo, resultCount, isLoading } = useResultsPageData(
    filterParam,
    searchParam,
    currentPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParam]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const annotations = [
    // {
    // "id": "dfam-nrph-111",
    // "start": 5000,
    // "end": 9999,
    // "strand": "-",
    // "family": "TAR1",
    // "evalue": 1.1e-103,
    // "divergence": 10.26
    // },
    // {
    //     "id": "dfam-nrph-112",
    //     "start": 6000,
    //     "end": 9999,
    //     "strand": "-",
    //     "family": "TAR1",
    //     "evalue": 1.1e-103,
    //     "divergence": 10.26
    // },
    // {
    //     "id": "dfam-nrph-113",
    //     "start": 7000,
    //     "end": 9999,
    //     "strand": "-",
    //     "family": "TAR1",
    //     "evalue": 1.1e-103,
    //     "divergence": 10.26
    // },
    // {
    //     "id": "dfam-nrph-114",
    //     "start": 7200,
    //     "end": 9999,
    //     "strand": "-",
    //     "family": "TAR1",
    //     "evalue": 1.1e-103,
    //     "divergence": 10.26
    // },
    // {
    //     "id": "dfam-nrph-115",
    //     "start": 6900,
    //     "end": 9999,
    //     "strand": "-",
    //     "family": "TAR1",
    //     "evalue": 1.1e-103,
    //     "divergence": 10.26
    // },
    // {
    //     "id": "dfam-nrph-116",
    //     "start": 7000,
    //     "end": 9999,
    //     "strand": "-",
    //     "family": "TAR1",
    //     "evalue": 1.1e-103,
    //     "divergence": 10.26
    // },
    // {
    //     "id": "dfam-nrph-117",
    //     "start": 7200,
    //     "end": 9999,
    //     "strand": "-",
    //     "family": "TAR1",
    //     "evalue": 1.1e-103,
    //     "divergence": 10.26
    // },
    // {
    //     "id": "dfam-nrph-118",
    //     "start": 7800,
    //     "end": 9999,
    //     "strand": "-",
    //     "family": "TAR1",
    //     "evalue": 1.1e-103,
    //     "divergence": 10.26
    // },
    // {
    //     "id": "dfam-nrph-119",
    //     "start": 8000,
    //     "end": 9999,
    //     "strand": "-",
    //     "family": "TAR1",
    //     "evalue": 1.1e-103,
    //     "divergence": 10.26
    // },
    // {
    //     "id": "dfam-nrph-120",
    //     "start": 9000,
    //     "end": 9999,
    //     "strand": "-",
    //     "family": "TAR1",
    //     "evalue": 1.1e-103,
    //     "divergence": 10.26
    //     },
    {
        "id": "dfam-nrph-1",
        "start": 10464,
        "end": 10954,
        "strand": "-",
        "family": "TAR1",
        "evalue": 1.1e-103,
        "divergence": 10.26
    },
    {
    "id": "dfam-nrph-2",
    "start": 10826,
    "end": 11463,
    "strand": "-",
    "family": "TAR1",
    "evalue": 4.1e-165,
    "divergence": 8.78
    },
    {
    "id": "dfam-nrph-3",
    "start": 11502,
    "end": 11676,
    "strand": "-",
    "family": "L1MC4a_3end",
    "evalue": 6.9e-16,
    "divergence": 31.22
    },
    {
    "id": "dfam-nrph-4",
    "start": 11677,
    "end": 11780,
    "strand": "-",
    "family": "MER5B",
    "evalue": 0.000013,
    "divergence": 37.8
    },
    {
    "id": "dfam-nrph-5",
    "start": 15265,
    "end": 15353,
    "strand": "-",
    "family": "MIR1_Amn",
    "evalue": 0.00031,
    "divergence": 33.08
    },
    {
    "id": "dfam-nrph-6",
    "start": 16362,
    "end": 16459,
    "strand": "-",
    "family": "Charlie15a",
    "evalue": 0.000025,
    "divergence": 31.8
    },
    {
    "id": "dfam-nrph-7",
    "start": 18418,
    "end": 18649,
    "strand": "+",
    "family": "L1M2b_5end",
    "evalue": 4,
    "divergence": 44.07
    },
    {
    "id": "dfam-nrph-8",
    "start": 18908,
    "end": 19049,
    "strand": "+",
    "family": "L2b_3end",
    "evalue": 890,
    "divergence": 46.16
    },
    {
    "id": "dfam-nrph-9",
    "start": 18957,
    "end": 19048,
    "strand": "+",
    "family": "L2a_3end",
    "evalue": 0.076,
    "divergence": 32.8
    },
    {
    "id": "dfam-nrph-10",
    "start": 19972,
    "end": 20727,
    "strand": "+",
    "family": "L3",
    "evalue": 4.7e-67,
    "divergence": 40.77
    },
    {
    "id": "dfam-nrph-11",
    "start": 21950,
    "end": 22344,
    "strand": "+",
    "family": "MLT1K",
    "evalue": 7.1e-31,
    "divergence": 40.13
    },
    {
    "id": "dfam-nrph-12",
    "start": 23121,
    "end": 23361,
    "strand": "-",
    "family": "MIR",
    "evalue": 1.7e-29,
    "divergence": 40.43
    },
    {
    "id": "dfam-nrph-13",
    "start": 23837,
    "end": 24010,
    "strand": "+",
    "family": "L2b_3end",
    "evalue": 1.2e-10,
    "divergence": 38.21
    },
    {
    "id": "dfam-nrph-14",
    "start": 24073,
    "end": 24249,
    "strand": "+",
    "family": "MIR",
    "evalue": 5.5e-12,
    "divergence": 37.09
    },
    {
    "id": "dfam-nrph-15",
    "start": 24261,
    "end": 24447,
    "strand": "+",
    "family": "L2a_3end",
    "evalue": 0.000002,
    "divergence": 44.36
    },
    {
    "id": "dfam-nrph-16",
    "start": 25182,
    "end": 25284,
    "strand": "-",
    "family": "MIRb",
    "evalue": 30,
    "divergence": 43.76
    },
    {
    "id": "dfam-nrph-17",
    "start": 25892,
    "end": 25959,
    "strand": "+",
    "family": "MIR",
    "evalue": 530,
    "divergence": 40.24
    },
    {
    "id": "dfam-nrph-18",
    "start": 26357,
    "end": 26428,
    "strand": "+",
    "family": "MIR1_Amn",
    "evalue": 1.6,
    "divergence": 31.29
    },
    {
    "id": "dfam-nrph-19",
    "start": 26574,
    "end": 26774,
    "strand": "-",
    "family": "L2c_3end",
    "evalue": 3.6,
    "divergence": 49.01
    },
    {
    "id": "dfam-nrph-20",
    "start": 26791,
    "end": 27062,
    "strand": "+",
    "family": "AluSp",
    "evalue": 7.7e-86,
    "divergence": 5.82
    },
    {
    "id": "dfam-nrph-21",
    "start": 27058,
    "end": 27220,
    "strand": "-",
    "family": "L2c_3end",
    "evalue": 0.17,
    "divergence": 44.86
    },
    {
    "id": "dfam-nrph-22",
    "start": 27282,
    "end": 27541,
    "strand": "+",
    "family": "MER33",
    "evalue": 6.7e-53,
    "divergence": 15.37
    },
    {
    "id": "dfam-nrph-23",
    "start": 27833,
    "end": 27986,
    "strand": "-",
    "family": "MIRc",
    "evalue": 0.033,
    "divergence": 51.05
    },
    {
    "id": "dfam-nrph-24",
    "start": 28151,
    "end": 28300,
    "strand": "-",
    "family": "MIRb",
    "evalue": 0.00004,
    "divergence": 46.72
    },
    {
    "id": "dfam-nrph-25",
    "start": 29901,
    "end": 30196,
    "strand": "+",
    "family": "L1MB3_3end",
    "evalue": 3e-56,
    "divergence": 26.39
    },
    {
    "id": "dfam-nrph-26",
    "start": 30343,
    "end": 30532,
    "strand": "-",
    "family": "MER53",
    "evalue": 3.3e-34,
    "divergence": 15.64
    },
    {
    "id": "dfam-nrph-27",
    "start": 30694,
    "end": 30848,
    "strand": "+",
    "family": "MLT1A",
    "evalue": 4.4e-30,
    "divergence": 17.65
    },
    {
    "id": "dfam-nrph-28",
    "start": 30962,
    "end": 31135,
    "strand": "+",
    "family": "MLT1A",
    "evalue": 9.6e-36,
    "divergence": 24.15
    },
    {
    "id": "dfam-nrph-29",
    "start": 31259,
    "end": 31436,
    "strand": "+",
    "family": "MIRc",
    "evalue": 3.5e-9,
    "divergence": 36.07
    },
    {
    "id": "dfam-nrph-30",
    "start": 31436,
    "end": 31734,
    "strand": "+",
    "family": "AluJo",
    "evalue": 1.3e-88,
    "divergence": 10.31
    },
    {
    "id": "dfam-nrph-31",
    "start": 32841,
    "end": 33044,
    "strand": "+",
    "family": "MIR",
    "evalue": 3.6e-19,
    "divergence": 30.66
    },
    {
    "id": "dfam-nrph-32",
    "start": 33047,
    "end": 33456,
    "strand": "+",
    "family": "L1MB5_3end",
    "evalue": 6e-92,
    "divergence": 19.35
    },
    {
    "id": "dfam-nrph-33",
    "start": 33467,
    "end": 33509,
    "strand": "+",
    "family": "FLAM_C",
    "evalue": 0.067,
    "divergence": 20.54
    },
    {
    "id": "dfam-nrph-34",
    "start": 33531,
    "end": 34097,
    "strand": "-",
    "family": "L1PA6_3end",
    "evalue": 2.7e-172,
    "divergence": 8.38
    },
    {
    "id": "dfam-nrph-35",
    "start": 34115,
    "end": 34349,
    "strand": "-",
    "family": "MLT1J",
    "evalue": 7.5e-10,
    "divergence": 54.83
    },
    {
    "id": "dfam-nrph-36",
    "start": 34415,
    "end": 34562,
    "strand": "-",
    "family": "L2c_3end",
    "evalue": 0.0000074,
    "divergence": 41.02
    },
    {
    "id": "dfam-nrph-37",
    "start": 34565,
    "end": 34934,
    "strand": "-",
    "family": "MLT1J2",
    "evalue": 3.3e-46,
    "divergence": 34.22
    },
    {
    "id": "dfam-nrph-38",
    "start": 35367,
    "end": 35508,
    "strand": "+",
    "family": "FLAM_C",
    "evalue": 9.6e-38,
    "divergence": 9.72
    },
    {
    "id": "dfam-nrph-39",
    "start": 35216,
    "end": 35381,
    "strand": "-",
    "family": "MIRc",
    "evalue": 8.7e-8,
    "divergence": 44.06
    },
    {
    "id": "dfam-nrph-40",
    "start": 37045,
    "end": 37431,
    "strand": "+",
    "family": "Charlie5",
    "evalue": 6e-75,
    "divergence": 20.89
    },
    {
    "id": "dfam-nrph-41",
    "start": 37735,
    "end": 37860,
    "strand": "+",
    "family": "L2c_3end",
    "evalue": 0.096,
    "divergence": 42.64
    },
    {
    "id": "dfam-nrph-42",
    "start": 38068,
    "end": 38229,
    "strand": "+",
    "family": "L2",
    "evalue": 1.6e-16,
    "divergence": 23.56
    },
    {
    "id": "dfam-nrph-43",
    "start": 38239,
    "end": 39462,
    "strand": "+",
    "family": "MLT1F-int",
    "evalue": 2.2e-209,
    "divergence": 28.94
    },
    {
    "id": "dfam-nrph-44",
    "start": 39465,
    "end": 39572,
    "strand": "+",
    "family": "MLT1F2",
    "evalue": 1e-9,
    "divergence": 27.58
    },
    {
    "id": "dfam-nrph-45",
    "start": 39624,
    "end": 39925,
    "strand": "+",
    "family": "AluSx",
    "evalue": 5.6e-94,
    "divergence": 7.26
    },
    {
    "id": "dfam-nrph-46",
    "start": 39953,
    "end": 40296,
    "strand": "+",
    "family": "MLT1E1A",
    "evalue": 5.9e-43,
    "divergence": 32.7
    },
    {
    "id": "dfam-nrph-47",
    "start": 40340,
    "end": 40628,
    "strand": "+",
    "family": "L2a_3end",
    "evalue": 1.5e-28,
    "divergence": 37.55
    },
    {
    "id": "dfam-nrph-48",
    "start": 40637,
    "end": 40738,
    "strand": "-",
    "family": "AluSz6",
    "evalue": 1e-17,
    "divergence": 12.13
    },
    {
    "id": "dfam-nrph-49",
    "start": 40736,
    "end": 41072,
    "strand": "-",
    "family": "LTR16C",
    "evalue": 8e-26,
    "divergence": 48.4
    },
    {
    "id": "dfam-nrph-50",
    "start": 41161,
    "end": 42284,
    "strand": "-",
    "family": "ERV3-16A3_I",
    "evalue": 1.4e-107,
    "divergence": 47.28
    },
    {
    "id": "dfam-nrph-51",
    "start": 42370,
    "end": 42507,
    "strand": "+",
    "family": "MamRep1527",
    "evalue": 2.4e-9,
    "divergence": 41.98
    },
    {
    "id": "dfam-nrph-52",
    "start": 42566,
    "end": 42714,
    "strand": "+",
    "family": "MamRep1527",
    "evalue": 1e-10,
    "divergence": 44.95
    },
    {
    "id": "dfam-nrph-53",
    "start": 42994,
    "end": 43201,
    "strand": "+",
    "family": "L1M5_orf2",
    "evalue": 2.1,
    "divergence": 39.49
    },
    {
    "id": "dfam-nrph-54",
    "start": 43263,
    "end": 44966,
    "strand": "+",
    "family": "L1M3_orf2",
    "evalue": 0,
    "divergence": 20.98
    },
    {
    "id": "dfam-nrph-55",
    "start": 44793,
    "end": 45745,
    "strand": "+",
    "family": "L1MA9_3end",
    "evalue": 8.3e-185,
    "divergence": 19.28
    },
    {
    "id": "dfam-nrph-56",
    "start": 45887,
    "end": 46064,
    "strand": "+",
    "family": "L1ME4a_3end",
    "evalue": 9.3e-9,
    "divergence": 33.93
    },
    {
    "id": "dfam-nrph-57",
    "start": 46077,
    "end": 46195,
    "strand": "+",
    "family": "L1MA9_3end",
    "evalue": 1.5e-10,
    "divergence": 26.9
    },
    {
    "id": "dfam-nrph-58",
    "start": 46416,
    "end": 46493,
    "strand": "-",
    "family": "LTR12",
    "evalue": 6.8e-17,
    "divergence": 1.55
    },
    {
    "id": "dfam-nrph-59",
    "start": 46421,
    "end": 46526,
    "strand": "-",
    "family": "LTR30",
    "evalue": 9.8e-11,
    "divergence": 24.75
    },
    {
    "id": "dfam-nrph-60",
    "start": 46553,
    "end": 46715,
    "strand": "+",
    "family": "MER45A",
    "evalue": 6.4e-23,
    "divergence": 24.37
    },
    {
    "id": "dfam-nrph-61",
    "start": 46893,
    "end": 47087,
    "strand": "-",
    "family": "MER58A",
    "evalue": 2.4e-33,
    "divergence": 18.53
    },
    {
    "id": "dfam-nrph-62",
    "start": 48417,
    "end": 48761,
    "strand": "+",
    "family": "L1PREC2_orf2",
    "evalue": 2e-83,
    "divergence": 11.25
    },
    {
    "id": "dfam-nrph-63",
    "start": 48622,
    "end": 49517,
    "strand": "+",
    "family": "L1PA14_3end",
    "evalue": 1.2e-270,
    "divergence": 8.77
    }
  ]
  
  const id1 = 'id1'

  return (
    <>
      {!isLoading && !proteinInfo ? (
        <div className="min-h-screen">
          <div className="results-container flex flex-col items-center h-screen w-screen justify-center">
            <h2 className="mb-12 text-5xl text-slate-500">No Results</h2>
          </div>
        </div>
      ) : !proteinInfo ? (
        <div className="min-h-screen">
          <div className="results-container flex flex-col items-center h-screen justify-center">
            <h2 className="mb-12 text-5xl text-slate-500">Searching...</h2>
            <svg
              aria-hidden="true"
              className="w-[15%] h-[15%] text-[#e6e6e6] animate-spin dark:text-gray-[#f9f9f9] fill-[#4a95c0]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="min-h-screen">
              <FeatureBrowser annotations={annotations} id={id1} />
          <div className="results-container min-h-screen mt-4 mb-4 border-0 text-5xl rounded-md drop-shadow-lg text-slate-500 bg-[#e6e6e6]">
            <div className="buttom-row flex flex-row justify-between font-light text-[#4a95c0]">
              <p className="px-8 mt-6">
                Showing {resultCount} results for "{searchParam}"
              </p>
              <div className="pagination flex flex-col-2 gap-4 justify-end font-light px-8 py-4 text-[#4a95c0]">
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
            </div>
            <ul className="px-8 py-2">
              {proteinInfo.map((protein) => (
                <Link
                  to={{ pathname: `/structureindex/${protein._id}` }}
                  key={protein._id}
                >
                  <div className="result-card drop-shadow-md min-h-[10%] flex flex-col-2 gap-8 border-2 hover:border-[#4a95c0] rounded-md  mb-4 bg-[#f9f9f9]">
                    <div className="basis-1/4 py-4">
                      <li className=" px-6 py-2 text-[#4a95c0] font-light">
                        {protein.protein_id}
                      </li>
                    </div>
                    <div className="basis-3/4 py-4 text-3xl font-thin">
                      <li className="px-8">
                        plDDT Score: {protein.colabfold_log_pLDDT}
                      </li>
                      <li className="px-8"> Product: {protein.product}</li>
                      <li className="px-8"> Species: {protein.Species}</li>
                    </div>
                  </div>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultsPage;
