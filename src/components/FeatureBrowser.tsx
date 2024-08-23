import React, { useEffect, useRef } from "react";
import { FeatureViewer } from "feature-viewer-typescript";
import "feature-viewer-typescript/src/styles/styles.scss";
import { FeaturesList } from "feature-viewer-typescript/src/interfaces";
import * as soda from "@sodaviz/soda";
import { Chart } from "@sodaviz/soda";
import * as d3 from "d3";
import "../customScrollBar.css";

interface CustomAnnotation extends soda.Annotation {
  family: string;
}

interface CustomRenderParams extends soda.RenderParams {
  annotations: CustomAnnotation[];
}

const FeatureBrowser: React.FC = ({ annotations, id }) => {
  const featureViewerRef = useRef<Chart<P> | null>(null);

  let leftJoin = annotations.filter((a) => a.join == "left-join");
  let rightJoin = annotations.filter((a) => a.join == "right-join");
  let gene = annotations.filter((a) => a.join == "none");

  let colors = d3.scaleOrdinal(d3.schemeTableau10);

  useEffect(() => {
    if (!featureViewerRef.current) {
      featureViewerRef.current = new soda.Chart<CustomRenderParams>({
        selector: `div#${id}`,
        // rowColors: ['#f9f9f9', '#4a95c0'],
        // rowOpacity: 0.5,
        zoomable: true,
        rowHeight: 25,
        zoomConstraint: [1, 100],
        resizable: true,
        draw(params) {
          this.addAxis();
          soda.chevronRectangle({
            // soda.rectangle({
            chart: this,
            annotations: gene,
            fillColor: (d) => colors(d.a.family),
            strokeColor: "none",
            orientation: (d) => d.a.strand,
            chevronSpacing: 5,
          });
        },
        postRender(params) {
          soda.clickBehavior({
            chart: this,
            annotations: gene,
            // this function is evaluated when a glyph is clicked
            click: (
              // s is a d3 Selection of the glyph in the DOM
              s: d3.Selection<any, any, any, any>,
              // d is the AnnotationDatum bound to the glyph
              d: soda.AnnotationDatum<
                CustomAnnotation,
                Chart<CustomRenderParams>
              >
            ) => alert(`${d.a.id} clicked`),
          });
          soda.hoverBehavior({
            chart: this,
            annotations: gene,
            // this function is evaluated when a glyph is moused over
            mouseover: (s, d) => s.style("stroke", "#17a8e1"),
            // this function is evaluated when a glyph is no longer moused over
            mouseout: (s, d) => s.style("stroke", "none"),
          });
          soda.tooltip({
            chart: this,
            annotations: gene,
            text: (d) => d.a.family,
          });
          soda.line({
            chart: this,
            annotations: leftJoin,
            selector: "left-join",
            y1: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 8,
            y2: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 24,
          });
          soda.line({
            chart: this,
            annotations: rightJoin,
            selector: "right-join",
            y1: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 24,
            y2: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 8,
          });
        },
      });
      // console.log(featureViewerRef.current.layout)

      //             fetch("https://sodaviz.org/data/examples/default")
      // .then(response => response.json())
      // .then(annotations => featureViewerRef.current.render({ annotations }));
      featureViewerRef.current.render({ annotations });
      // featureViewerRef.current.render({ });
    }
  }, []);

  return (
    <>
      <div className="text-slate-500 min-w-[40vh] border-r-2 border-[#bec4cc] ">
        <div className="text-center">{id}</div>
        <div className="" id={id}></div>
      </div>
    </>
  );
};

export default FeatureBrowser;