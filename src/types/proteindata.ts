import { ProteinStructure } from "./proteinstructure";

export type ProteinData = {
  virus_name: string;
  viruses: Virus[];
  count: number;
  protein_structures: ProteinStructure[];
  detail?: string;
};

export type Virus = {
  _id: string;
};
