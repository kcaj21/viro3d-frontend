export type ClustersData = {
    genbank_id: string;
    clusters: Cluster[];
  };

type Cluster = {
    cluster_representative: string;
    cluster_members: ClusterMember[];
}

type ClusterMember = {
    cluster_rep_id: string;
    member_record_id: string;
    protein_length: number;
    tax_id: number;
    species: string;
    plDDT_score: number;
}