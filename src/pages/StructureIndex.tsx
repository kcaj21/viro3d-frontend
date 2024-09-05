import React, { } from "react";
import { useParams } from "react-router-dom";
import PdbeMolstar from "../components/ui/PdbeMolstar";
import ProteinInfo from "../components/ProteinInfo";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";

const StructureIndex: React.FC = ({ }) => {
  
  document.documentElement.scrollTop = 0

  const { virus_name, recordID } = useParams();

  return (
    <>
      <div className="IndexContainer flex flex-col gap-4 text-slate-500 ">
        <FeatureBrowserContainer filterParam={'virus_name'} searchParam={virus_name} />
        </div>
        <div className="mt-12 flex gap-16 flex-col-1 ">
          <div className="basis-1/2">
            <PdbeMolstar model={recordID} />
          </div>
          <div className="basis-1/2 font-extralight">
            <ProteinInfo recordID={recordID} />
          </div>
        </div>
    </>
  );
};

export default StructureIndex;
