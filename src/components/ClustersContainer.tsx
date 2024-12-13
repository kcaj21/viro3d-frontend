import React from "react";
import { Link } from "react-router-dom";
import { ClustersData } from "../types/clustersdata";
import LoadingSpinner from "./ui/LoadingSpinner";

type ClustersContainerProps = {
  clusters: ClustersData;
  clustersLoading: boolean;
};

const ClustersContainer: React.FC<ClustersContainerProps> = ({
  clusters,
  clustersLoading,
}) => {
  const clusterItems = clusters.clusters[0].cluster_members.map((member) => {
    return (
      <tr key={member.member_record_id}>
        <Link to={`/proteinresultspage/genbankid/${member.member_record_id.slice(0, 10)}`}>{member.member_record_id.slice(0, 10)}</Link>
        <td>{member.species}</td>
        <td>{member.plDDT_score}</td>
        <td>{member.protein_length}</td>
      </tr>
    );
  });

  return clustersLoading ? (
    <>
      <LoadingSpinner />
    </>
  ) : (
    <>
      <div>Cluster of Similar Structures</div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Genbank ID</th>
            <th>Species</th>
            <th>pLDDT Score</th>
            <th>Length (No. of Residues):</th>
          </tr>
        </thead>
        <tbody>{clusterItems}</tbody>
      </table>
    </>
  );
};

export default ClustersContainer;
