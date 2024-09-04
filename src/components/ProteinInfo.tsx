import React, {  } from "react";
import { useStructureIndexData } from "../hooks/useStructureIndexData";



const ProteinInfo: React.FC = ({ recordID }) => {

  const { proteinInfo } = useStructureIndexData(recordID);

  return !proteinInfo
  ? (<>Loading...</>) : (
    <>
      <table className="border-spacing-4 text-left border-separate text-2xl text-slate-500">
        <tr>
          <td className="text-6xl ">{proteinInfo["_id"]}</td>
        </tr>
        {/* <hr className=' h-0.5 w-[150%]  my-4 bg-slate-500'></hr> */}
        <hr className=" w-[150%] my-1  border-0"></hr>
        <tr>
          <th className="font-light  text-5xl">plDTT Score:</th>
          <td className="text-5xl"> {proteinInfo["colabfold_json_pLDDT"]}</td>
        </tr>
        <hr className=" h-0.5 w-[150%]  my-4 bg-slate-500"></hr>
        <tr>
          <th className="font-extralight">Protein Name:</th>
          <td>{proteinInfo["genbank_name"]}</td>
        </tr>
        <tr>
          <th className="font-extralight">Peptide Category:</th>
          <td>{proteinInfo["pept_cat"]}</td>
        </tr>
        <tr>
          <th className="font-extralight">Uniprot ID:</th>
          <td>{proteinInfo["uniprot_id"]}</td>
        </tr>
        <tr>
          <th className="font-extralight">Genbank ID:</th>
          <td>{proteinInfo["protein_id"]}</td>
        </tr>
        <tr>
          <th className="font-extralight">Nucleotide Accession Number:</th>
          <td>{proteinInfo["nt_acc"]}</td>
          </tr>
          <tr>
          <th className="font-extralight">Virus Name:</th>
          <td>{proteinInfo["Virus name(s)"]}</td>
        </tr>
        <tr>
          <th className="font-extralight">Species:</th>
          <td>{proteinInfo["Species"]}</td>
        </tr>
      </table>
    </>
  );
};

export default ProteinInfo;
