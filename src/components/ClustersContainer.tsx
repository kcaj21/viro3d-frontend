import React from "react";
import { useNavigate } from "react-router-dom";
import { ClustersData } from "../types/clustersdata";
import LoadingSpinner from "./ui/LoadingSpinner";

type ClustersContainerProps = {
  clusters: ClustersData;
  clustersLoading: boolean;
  searchParam: string;
};

const ClustersContainer: React.FC<ClustersContainerProps> = ({
  clusters,
  clustersLoading,
  searchParam,
}) => {
  const navigate = useNavigate();

  const clusterItems = clusters.clusters[0].cluster_members.map((member) => {
    const isSelected = member.member_record_id === searchParam.toString();
    return (
      <tr
        key={member.member_record_id}
        onClick={() =>
          navigate(`/structureindex/${encodeURIComponent(member.virus_name)}/${member.member_record_id}`)
        }
        className={`cursor-pointer ${
          isSelected ? "bg-[#4a95c0] text-white" : "hover:bg-[#e6e6e6]"
        }`}
      >
        <td className="text-left pl-2">{member.member_record_id.slice(0, 10)}</td>
        <td className="text-left">{member.genbank_name_curated}</td>
        <td className="text-left">{member.virus_name}</td>
        <td className="text-left">{member.plDDT_score}</td>
        <td className="text-left">{member.protein_length}</td>
      </tr>
    );
  });

  return clustersLoading ? (
    <>
      <LoadingSpinner />
    </>
  ) : (
    <>
      <div className="border border-[#64748b] bg-[#f9f9f9]">
        <div className="overflow-hidden">
          <table className="w-full table-fixed border-collapse border-b border-[#64748b]  ">
          <caption className="p-5 text-xl font-semibold text-left rtl:text-right bg-[#e6e6e6] text-[#636262]">
            Similar Structures
            <p className="mt-1 text-lg font-normal text-gray-500">
            Clustered Based on FoldSeek Similarity Scores
            </p>
          </caption>
            <thead className="bg-[#e6e6e6] text-[#636262]  ">
              <tr className="">
                <th className=" pl-2 w-1/5 text-left">Genbank ID</th>
                <th className="w-1/5 text-left">Protein Name</th>
                <th className="w-1/5 text-left">Virus Name</th>
                <th className="w-1/5 text-left">pLDDT Score</th>
                <th className="w-1/5 text-left">Length (No. of Residues)</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="max-h-[50vh] clusters-custom-scrollbar overflow-y-auto">
          <table className="w-full  text-slate-500 table-fixed border-collapse">
            <tbody>{clusterItems}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ClustersContainer;
