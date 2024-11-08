import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "feature-viewer-typescript/src/styles/styles.scss";
import * as soda from "@sodaviz/soda";
import { Chart } from "@sodaviz/soda";
import * as d3 from "d3";
import "/src/customScrollBar.css";

interface CustomAnnotation extends soda.Annotation {
  family: string;
  gene_name: string;
  virus_name: string;
  pept_cat: string;
  nt_acc: string;
  segment: string;
  join: string;
  strand: string;
}

interface AnnotationGroupConfig extends soda.Annotation {
    annotations: CustomAnnotation []
  }

interface CustomRenderParams extends soda.RenderParams {
  group: soda.AnnotationGroup [];

}

const TestGenomeBrowser: React.FC<CustomRenderParams> = ({
  group,
}) => {

  const featureViewerRef = useRef<Chart<P> | null>(null);


  //NEED to replace '.' in record id with '_' so that it is valid syntax for a query selector

  useEffect(() => {

    if (!featureViewerRef.current) {
      featureViewerRef.current = new soda.Chart<CustomRenderParams>({
        selector: `div#test`,
        zoomable: true,
        rowHeight: 25,
        //determines the genome coordinate range that you can scroll between, i think it should really always be between 0 and the end coordinate of the last gene
        resizable: true,
        draw() {
          this.addAxis();
          soda.chevronRectangle({
            // soda.rectangle({
            chart: this,
            annotations: group,
            fillColor: "#ACCBE1",
            strokeColor: "#64748b",
            orientation: (d) => d.a.strand,
            chevronWidth: 7,
            chevronSpacing: 5,
            chevronStrokeColor: "#64748b",
          });
        },
      });

        featureViewerRef.current.render({
          group
        });
      

          //     featureViewerRef.current.render({
          // annotations,
          // start: domainConstraint[0],
          // end: domainConstraint[1],
          //     });
    }

  }, []);

  //check if recordID matches the family property of any of the annotations
  // if true, take start and end coords and pass to highlight function

  return (
    <>
      <div className="text-slate-500 min-w-[50vw] max-w-full ">
        <div className="" id="test"></div>
      </div>
    </>
  );
};

export default TestGenomeBrowser;
