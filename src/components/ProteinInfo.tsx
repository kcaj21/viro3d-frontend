import React from "react";
import { useParams } from "react-router-dom";
import { useProteinsGenbank } from "../hooks/useProteinsGenbank";

const ProteinInfo: React.FC = ({ filter }) => {
  const { structureID } = useParams();
  console.log(structureID);

  return (
    <>
      <table className="border-spacing-4 text-left border-separate text-2xl text-slate-500">
        <tr>
          <td className="text-6xl ">{filter["protein_id"]}</td>
        </tr>
        {/* <hr className=' h-0.5 w-[150%]  my-4 bg-slate-500'></hr> */}
        <hr className=" w-[150%] my-1  border-0"></hr>
        <tr>
          <th className="font-light  text-5xl">plDTT Score:</th>

          <td className="text-5xl"> {filter["colabfold_log_pLDDT"]}</td>
        </tr>
        <hr className=" h-0.5 w-[150%]  my-4 bg-slate-500"></hr>
        <tr>
          <th className="font-extralight">Tax ID:</th>
          <td>{filter["taxid"]}</td>
        </tr>
        <tr>
          <th className="font-extralight">Virus Name:</th>
          <td>{filter["Virus name(s)"]}</td>
        </tr>
        <tr>
          <th className="font-extralight">Genome coverage:</th>
          <td>{filter["Genome coverage"]}</td>
        </tr>
        <tr>
          <th className="font-extralight">Genome Composition:</th>
          <td>{filter["Genome composition"]}</td>
        </tr>
        <tr>
          <th className="font-extralight">Realm:</th>
          <td>{filter["Realm"]}</td>
        </tr>
        <tr>
          <th className="font-extralight">Kingdom:</th>
          <td>{filter["Kingdom"]}</td>
        </tr>
        <tr>
          <th className="font-extralight">Species:</th>
          <td>{filter["Species"]}</td>
        </tr>
      </table>
    </>
  );
};

export default ProteinInfo;
