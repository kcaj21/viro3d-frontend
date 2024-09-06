import React, { useEffect, useRef } from "react";
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
}

interface CustomRenderParams extends soda.RenderParams {
  annotations: CustomAnnotation[];
}

const FeatureBrowser: React.FC = ({ annotations }) => {
  const featureViewerRef = useRef<Chart<P> | null>(null);

  const navigate = useNavigate()

  //NEED to replace '.' in record id with '_' so that it is valid syntax for a query selector

  const id = annotations[0].nt_acc.replace(".", "_");

  //The variable 'all' is all the gene objects, excluding the line objects for joins, hence we filter for objects where 'a.join' is 'none'
  let all = annotations.filter((a) => a.join == "none");
  let leftJoin = annotations.filter((a) => a.join == "left-join");
  let rightJoin = annotations.filter((a) => a.join == "right-join");
  let protein = all.filter((a) => a.pept_cat == "protein");
  let region = all.filter((a) => a.pept_cat == "region");
  let mat_pept = all.filter((a) => a.pept_cat == "mat_pept");

  // let colors = d3.scaleOrdinal(d3.schemeTableau10);

  useEffect(() => {
    if (!featureViewerRef.current) {
      featureViewerRef.current = new soda.Chart<CustomRenderParams>({
        selector: `div#${id}`,
        zoomable: true,
        rowHeight: 25,
        //determines the genome coordinate range that you can scroll between, i think it should really always be between 0 and the end coordinate of the last gene
        domainConstraint: () => [0, annotations[annotations.length - 1].end + 1],
        // constrains only zooming
        zoomConstraint: [0, 100],
        resizable: true,
        draw() {

          this.addAxis();
          soda.chevronRectangle({
            // soda.rectangle({
            chart: this,
            annotations: protein,
            fillColor: '#ACCBE1',
            strokeColor: "#64748b",
            orientation: (d) => d.a.strand,
            chevronWidth: 7,
            chevronSpacing: 5,
            chevronStrokeColor:'#64748b'
          });
          soda.chevronRectangle({
            chart: this,
            annotations: region,
            fillColor: '#56b3e6',
            strokeColor: "#64748b",
            orientation: (d) => d.a.strand,
            chevronWidth: 7,
            chevronSpacing: 5,
            chevronStrokeColor:'#64748b'
          });
          soda.chevronRectangle({
            chart: this,
            annotations: mat_pept,
            fillColor: '#49b8b0',
            strokeColor: "#64748b",
            orientation: (d) => d.a.strand,
            chevronSpacing: 5,
            chevronWidth: 7,
            // chevronFillColor: '#64748b',
            chevronStrokeColor:'#64748b'
          });
        },
        postRender() {
          soda.clickBehavior({
            chart: this,
            annotations: all,
            // this function is evaluated when a glyph is clicked
            click: (
              // s is a d3 Selection of the glyph in the DOM
              s: d3.Selection<any, any, any, any>,
              // d is the AnnotationDatum bound to the glyph
              d: soda.AnnotationDatum<
                CustomAnnotation,
                Chart<CustomRenderParams>
              >
            ) => navigate(`/structureindex/${d.a.virus_name}/${d.a.family}`, { state: { key: "value" } }),
          });
          soda.hoverBehavior({
            chart: this,
            annotations: all,
            // this function is evaluated when a glyph is moused over
            mouseover: (s, d) => s.style("stroke", "#e2bd9d"),
            // this function is evaluated when a glyph is no longer moused over
            mouseout: (s, d) => s.style("stroke", "#64748b"),
          });
          soda.tooltip({
            chart: this,
            textColor: '#FFFFFF',
            backgroundColor: '#64748b',
            opacity: 0.7,
            annotations: all,
            text: (d) => d.a.gene_name,
          });
          soda.line({
            chart: this,
            annotations: leftJoin,
            selector: "left-join",
            y1: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 8,
            y2: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 24,
            strokeColor: '#64748b'
          });
          soda.line({
            chart: this,
            annotations: rightJoin,
            selector: "right-join",
            y1: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 24,
            y2: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 8,
            strokeColor: '#64748b'
          });
          console.log(this.axisConfig.chart.initialDomain[1])
        },
      });
      featureViewerRef.current.render({ annotations, start: (annotations[0].start), end: (annotations[annotations.length - 1].end) + 1});
    }
  }, []);

  return (
    <>
      <div className="text-slate-500 min-w-[40vw] max-w-full ">
        <div className="" id={id}></div>
      </div>
    </>
  );
};

export default FeatureBrowser;