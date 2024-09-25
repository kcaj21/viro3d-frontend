import React, { useEffect, useState } from "react";
import Tooltip from "./ui/Tooltip";

type ProteinInfoProps = {
  recordID: string;
};

const ProteinInfo: React.FC<ProteinInfoProps> = ({
  proteinInfo,
  defaultModel,
  nt_acc,
}) => {
  const autoScroll = () => {
    const cont = document.getElementById("segment-container");
    const element = document.getElementById(proteinInfo?.nt_acc);

    if (!cont || !element) return;

    const rect = element.getBoundingClientRect();
    const containerRect = cont.getBoundingClientRect();

    cont.scrollTo({
      top: 0,
      left: rect.left - containerRect.left + cont.scrollLeft - 500,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    autoScroll();
  }, [proteinInfo]);

  return !proteinInfo ? (
    <>Loading...</>
  ) : (
    <>
      <div className="table-container min-h-[60vh] ml-8">
        <div className="heading-container relative  min-h-[10vh]">
          {proteinInfo["genbank_name"].length < 60 ? (
            <h1 className="mb-6  text-slate-500 text-5xl">
              {proteinInfo["genbank_name"]}
            </h1>
          ) : (
            <Tooltip text={proteinInfo["genbank_name"]} />
          )}

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
        </div>

        <hr className=" h-0.5 my-8 bg-slate-500"></hr>
        <dl className="grid grid-cols-2 text-xl text-slate-500 gap-8">
          <dt className="font-extralight">Uniprot ID:</dt>
          <dd className="underline">
            <a
              className=""
              target="blank"
              rel="noopener noreferrer"
              href={`https://www.uniprot.org/uniprotkb/${proteinInfo["uniprot_id"]}/entry`}
            >
              {proteinInfo["uniprot_id"]}
            </a>
          </dd>
          <dt className="font-extralight">Genbank ID:</dt>
          <dd className="underline">
            <a
              target="blank"
              rel="noopener noreferrer"
              href={`https://www.ncbi.nlm.nih.gov/protein/${proteinInfo["uniprot_id"]}`}
            >
              {proteinInfo["protein_id"]}
            </a>
          </dd>
          <dt className="font-extralight">Tax ID:</dt>
          <dd className="underline">
            <a
              target="blank"
              rel="noopener noreferrer"
              href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id= ${proteinInfo["taxid"]}`}
            >
              {proteinInfo["taxid"]}
            </a>
          </dd>
          <dt className="font-extralight">Nucleotide Accession Number:</dt>
          <dd className="underline">
            <a
              target="blank"
              rel="noopener noreferrer"
              href={`https://www.ncbi.nlm.nih.gov/nuccore/${proteinInfo["nt_acc"]}`}
            >
              {proteinInfo["nt_acc"]}
            </a>
          </dd>
          <dt className="font-extralight">Virus Name:</dt>
          <dd>{proteinInfo["Virus name(s)"]}</dd>
          <dt className="font-extralight">Species:</dt>
          <dd>{proteinInfo["Species"]}</dd>
          <dt className="font-extralight">Family:</dt>
          <dd>{proteinInfo["Family"]}</dd>
          {proteinInfo["host"] !== "" ? (
            <>
              <dt className="font-extralight">Host:</dt>
              <dd>{proteinInfo["host"]}</dd>
            </>
          ) : null}
        </dl>
      </div>
    </>
  );
};

export default ProteinInfo;
