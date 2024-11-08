import React, { useState, useTransition } from "react";
import ViewStructuresPopUp from "../components/ui/ViewStructuresPopUp";
import ClusterVisualisationLegend from "../components/ui/ClusterVisualisationLegend";
import ClusterVisualisation from "../components/ui/ClusterVisualisation";
import TabButton from "../components/ui/TabButton";

const About: React.FC = () => {
  const TAB_DATA = [
    {
      title: "Data Collection and Structure Prediction",
      id: "Data Collection and Structure Prediction",
      content: (
        <p className="text-2xl text-[#6d828d]">
          Viro3D’s dataset includes 6,721 GenBank nucleotide sequences from
          4,407 virus isolates (representing 3,106 virus species). This
          constitutes all viruses with invertebrate and/or vertebrate host
          annotations from the ICTV Virus Metadata Resource VMR MSL38 v2
          (Lefkowitz et al. 2018). From these genomes, 71,269 protein records
          were extracted, including 4,070 mature peptides from polyproteins and
          11,786 protein regions from larger proteins, ensuring broad and
          detailed representation.
        </p>
      ),
    },

    {
      title: "Modeling Approaches",
      id: "Modeling Approaches",
      content: (
        <div className="flex flex-col text-2xl text-[#6d828d] justify-evenly gap-8">
          <h2>
            To predict protein structures, we applied two cutting-edge
            computational methods to the same sequence set:
          </h2>
          <dl className="flex flex-col gap-4">
            <dt className="text-[#4a95c0] font-bold">
              1. AlphaFold2-ColabFold:{" "}
            </dt>
            <dd className="">
              {" "}
              We generated moltiple sequence alignments (MSAs) using MMseqs2
              (Steinegger and Soeding 2017) run against diverse databases
              including colabfold_envdb_202108, pdb100_230517 and uniref30_2302.
              These MSAs were used as input to LocalColabFold v.1.5.2 (Mirdita
              et al. 2022, Jumper et al. 2021) allowing structural prediction
              for 85,162 protein sequences. For each sequence, five models were
              produced, and the highest-ranked structure was refined using Amber
              force field relaxation (Case et al. 2023) to ensure structural{" "}
            </dd>
            <dt className="text-[#4a95c0] font-bold">2. ESMFold </dt>
            <dd>
              {" "}
              We generated multiple sequence alignments (MSAs) using MMseqs2
              (Steinegger and Soeding 2017) run against diverse databases
              including colabfold_envdb_202108, pdb100_230517 and uniref30_2302.
              These MSAs were used as input to LocalColabFold v.1.5.2 (Mirdita
              et al. 2022, Jumper et al. 2021) allowing structural prediction
              for 85,162 protein sequences. For each sequence, five models were
              produced, and the highest-ranked structure was refined using Amber
              force field relaxation (Case et al. 2023) to ensure structural{" "}
            </dd>
          </dl>
          <p>
            This dual modeling approach maximized the number of accurate
            predictions and yielded a final set of 85,162 reliable protein
            structures. The Viro3D database contains all AlphaFold2-ColabFold
            models and the ESMFold models that achieved higher confidence than
            their AlphaFold2-ColabFold counterparts.{" "}
          </p>
        </div>
      ),
    },

    {
      title: "Web resource implementation",
      id: "Web resource implementation",
      content: (
        <ul className="flex flex-col gap-2 text-2xl text-[#6d828d]">
          <li>React</li>
          <li>Typescript</li>
          <li>FastAPI</li>
          <li>Python</li>
          <li>MongoDB</li>
          <li>PDBE-Molstar Molecular Viewer</li>
          <li>Sodaviz - Genomic Annotation Visualizer</li>
        </ul>
      ),
    },

    {
      title: "Enabling New Research",
      id: "Enabling New Research",
      content: (
        <p className="text-2xl text-[#6d828d]">
          Viro3D provides a vital resource for virology research, addressing a
          gap in structural coverage and supporting functional annotation,
          evolutionary studies, and educational applications. With extensive
          protein models derived from state-of-the-art methods, the Viro3D web
          resource provides structural context for lab-based investigations and
          empowers computational investigations on the distribution of form and
          function across human and animal virology.
        </p>
      ),
    },

    {
      title: "Limitations and Feedback",
      id: "Limitations and Feedback",
      content: (
        <div className="flex flex-col gap-4 text-2xl text-[#6d828d]">
          <p>
            We regard Viro3D as a work in progress. The 4,407 viruses included
            in phase one represent only a fraction of the virosphere and do not
            include any viruses of plants, bacteria or archaea. We anticipate
            expanding the Viro3D in the coming months and years. The structural
            models are derived from sequence annotations, which are sometimes
            incorrect and incomplete, and can come with outdated or
            non-informative labels. We have done our best to eliminate these
            problems, but inevitably some remain. It is important to remember
            that the structures are predictions and need to be interpreted with
            care. Each model comes with confidence metrics and are shown in the
            molecular viewer color coded by pLDDT score. Any comments or
            feedback on Viro3D should be sent to:
          </p>
          <a
            href="mailto:Joe.Grove@glasgow.ac.uk"
            target="_blank"
            rel="noreferrer"
            className=" hover:text-[#50bde5] underline"
          >
            joe.grove@glasgow.ac.uk
          </a>
        </div>
      ),
    },
    {
      title: "Funding",
      id: "Funding",
      content: (
        <p className="text-2xl text-[#6d828d]">
          Viro3D is supported by UKRI MRC core funding to the MRC-University of
          Glasgow Centre for Virus Research, and by grants from the Wellcome
          Trust and Medical Research Foundation.
        </p>
      ),
    },
  ];

  const [tab, setTab] = useState("Data Collection and Structure Prediction");
  const [isPending, startTransition] = useTransition();

  const handeTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="" id="/">
      <div className="mt-32 mx-36 min-h-screen px-24 py-24 bg-[#f2f2f2] border drop-shadow-md rounded border-slate-300">
        <div className="mt-4 md:mt-0 flex flex-col gap-8 h-full">
          <h1 className="text-6xl text-[#4a95c0] font-bold  mb-8">About</h1>
          <p className="text-3xl text-[#6d828d]">
            Viro3D is a comprehensive, searchable and browsable database of
            viral protein structure predictions, containing over 85,000
            structural models from more than 4,400 human and animal viruses. The
            database is designed to support fundamental research into viral
            protein structure, function, and evolution, as well as to explore
            the contribution of viruses to overall protein structure diversity.
          </p>
          <div className="flex text-xl flex-row justify-evenly mt-8 mb-8">
            <TabButton
              selectTab={() =>
                handeTabChange("Data Collection and Structure Prediction")
              }
              active={tab === "Data Collection and Structure Prediction"}
            >
              Data Collection and Structure Prediction
            </TabButton>
            <TabButton
              selectTab={() => handeTabChange("Modeling Approaches")}
              active={tab === "Modeling Approaches "}
            >
              Modeling Approaches
            </TabButton>
            <TabButton
              selectTab={() => handeTabChange("Web resource implementation")}
              active={tab === "Web resource implementation"}
            >
              Web resource implementation
            </TabButton>
            <TabButton
              selectTab={() => handeTabChange("Enabling New Research")}
              active={tab === "Enabling New Research"}
            >
              Enabling New Research
            </TabButton>
            <TabButton
              selectTab={() => handeTabChange("Limitations and Feedback")}
              active={tab === "Limitations and Feedback"}
            >
              Limitations and Feedback
            </TabButton>
            <TabButton
              selectTab={() => handeTabChange("Funding")}
              active={tab === "Funding"}
            >
              Funding
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA?.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
