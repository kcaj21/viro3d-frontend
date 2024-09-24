import React, { useEffect } from "react";

type ProteinInfoProps = {
  recordID: string;
};

const ProteinInfo: React.FC<ProteinInfoProps> = ({
  proteinInfo,
  defaultModel,
  nt_acc
}) => {
  async function autoScroll() {
    const cont = await document.getElementById("segment-container");
    console.log(nt_acc)
    const element = await document.getElementById(proteinInfo.nt_acc);
    const rect = await element?.getBoundingClientRect();

      cont?.scrollTo({
        top: 0,
        left: rect?.x - 500,
        behavior: "smooth",
      });
  }

  useEffect(() => {
    autoScroll();
  }, []);

  return !proteinInfo ? (
    <>Loading...</>
  ) : (
    <>
      <div className="table-container min-h-[60vh] ml-8">
        <div className="heading-container min-h-[10vh]">
          <h1 className=" mb-12 text-slate-500 text-6xl">
            {proteinInfo["genbank_name"]}
          </h1>
        </div>
        {defaultModel === "CF" ? (
          <dl className="grid grid-cols-2 gap-16">
            <dt className="font-light text-slate-500  text-5xl">
              ColabFold plDTT Score:
            </dt>
            <dd className="font-extralight text-slate-500  text-5xl">
              {proteinInfo["colabfold_json_pLDDT"]}
            </dd>
          </dl>
        ) : (
          <dl className="grid grid-cols-2 gap-16">
            <dt className="font-light text-slate-500  text-5xl">
              ESMFold plDTT Score:
            </dt>
            <dd className="font-extralight text-slate-500  text-5xl">
              {proteinInfo["esmfold_log_pLDDT"]}
            </dd>
          </dl>
        )}
        <hr className=" h-0.5 my-8 bg-slate-500"></hr>
        <dl className="grid grid-cols-2 text-2xl text-slate-500 gap-16">
          <dt className="font-extralight">Uniprot ID:</dt>
          <dd>{proteinInfo["uniprot_id"]}</dd>
          <dt className="font-extralight">Genbank ID:</dt>
          <dd>{proteinInfo["protein_id"]}</dd>
          <dt className="font-extralight">Nucleotide Accession Number:</dt>
          <dd>{proteinInfo["nt_acc"]}</dd>
          <dt className="font-extralight">Virus Name:</dt>
          <dd>{proteinInfo["Virus name(s)"]}</dd>
          <dt className="font-extralight">Species:</dt>
          <dd>{proteinInfo["Species"]}</dd>
        </dl>
      </div>
    </>
  );
};

export default ProteinInfo;
