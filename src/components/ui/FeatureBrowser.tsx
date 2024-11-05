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

interface CustomRenderParams extends soda.RenderParams {
  annotations: CustomAnnotation[];
  recordID: string;
}

const FeatureBrowser: React.FC<CustomRenderParams> = ({
  annotations,
  recordID,
}) => {
  const [highlightedGene, setHighlightedGene] = useState([]);

  const featureViewerRef = useRef<Chart<P> | null>(null);

  const navigate = useNavigate();

  //NEED to replace '.' in record id with '_' so that it is valid syntax for a query selector

  const id = annotations[0].nt_acc.replace(".", "_");

  //The variable 'all' is all the gene objects, excluding the line objects for joins, hence we filter for objects where 'a.join' is 'none'
  let all = annotations.filter((a) => a.join == "none");
  let leftJoin = annotations.filter((a) => a.join == "left-join");
  let rightJoin = annotations.filter((a) => a.join == "right-join");
  let protein = all.filter((a) => a.pept_cat == "protein");
  let region = all.filter((a) => a.pept_cat == "region");
  let mat_pept = all.filter((a) => a.pept_cat == "mat_pept");
  let selectedProtein = annotations.find(({ family }) => family === recordID);

  const highestEndCoordinate = annotations.reduce((prev, current) => {
    return prev.end > current.end ? prev : current;
  });

  const lowestStartCoordinate = annotations.reduce((prev, current) => {
    return prev.start < current.start ? prev : current;
  });

  const domainConstraint = [
    lowestStartCoordinate.start,
    highestEndCoordinate.end,
  ];

  async function highlightSelectedGene() {

    //check to see if there is already a gene highlighted and stored in state
    
    if (highlightedGene) {
       highlightedGene.forEach((gene) => {
        // console.log(gene["oldStyle"]);
        gene["rect"]?.setAttribute("style", `${gene["oldStyle"]}`);
      });
    }

    let glyphs = [];

    //the next line needs to be more efficient, its instantiaiting a null variable as a way of checking if the gene is spliced or not which is too expensive
    let glyph = document.getElementById(recordID);

    //checking if glyph is null and if so, assuming it is spliced and now getting all the genes in the spliced gene by ID
    if (!glyph) {
      let splicedGenes = annotations
        .filter((a) => a.family === recordID)
        .filter((a) => a.join === "none");
      splicedGenes.forEach(async (gene) => {
        let tmp = document.getElementById(gene["id"]);
        let rect = tmp?.querySelector("rect");
        let oldStyle = await rect?.getAttribute(`style`);
        rect?.setAttribute("style", `fill: #41d3a2; `);
        glyphs.push({
          rect: rect,
          oldStyle: oldStyle,
        });
      });
    } else {
      let rect = glyph?.querySelector("rect");
      let oldStyle = await rect?.getAttribute(`style`);
      rect?.setAttribute("style", `fill: #41d3a2; `);
      glyphs.push({
        rect: rect,
        oldStyle: oldStyle,
      });
    }
    setHighlightedGene(glyphs);
  }

  //function zooms in on selected proteins if the genome exceeds 30kb in length
  const autoZoom = () => {
    //finds selected protein by taking the recordID and filtering annotations for objetcs that match by the family property
    //it subtracts the start coordinate from the end coordinate and divides it by 2
    // console.log(selectedProtein?.end)

    let boundary = (30000 - (selectedProtein?.end - selectedProtein?.start)) / 2

    // the boundary variable is calculated this way so that the genome browser wont be fully zoomed in on just the selected protein, it acts as a buffer zone to ensure some other annotations are still visible on either side
    let start = selectedProtein?.start - boundary
    let end = selectedProtein?.end + boundary
    // if the start coordinate is < 30000, it will result in a negative number, so in this case start is set to 0

    // if (end > domainConstraint[1]) {end = domainConstraint[1]}

    if (start < 0) {
      return {
        annotations,
        start: 0,
        end: end
      }
    } else {
      return {
        annotations,
        start: start,
        end: end
      }
    }
  }

  useEffect(() => {

    if (!featureViewerRef.current) {
      featureViewerRef.current = new soda.Chart<CustomRenderParams>({
        selector: `div#${id}`,
        zoomable: true,
        rowHeight: 25,
        //determines the genome coordinate range that you can scroll between, i think it should really always be between 0 and the end coordinate of the last gene
        domainConstraint: () => domainConstraint,
        // constrains only zooming
        zoomConstraint: [0, 100],
        resizable: true,
        draw() {
          this.addAxis();
          soda.chevronRectangle({
            // soda.rectangle({
            chart: this,
            annotations: protein,
            fillColor: "#ACCBE1",
            strokeColor: "#64748b",
            orientation: (d) => d.a.strand,
            chevronWidth: 7,
            chevronSpacing: 5,
            chevronStrokeColor: "#64748b",
          });
          soda.chevronRectangle({
            chart: this,
            annotations: region,
            fillColor: "#56b3e6",
            strokeColor: "#64748b",
            orientation: (d) => d.a.strand,
            chevronWidth: 7,
            chevronSpacing: 5,
            chevronStrokeColor: "#64748b",
          });
          soda.chevronRectangle({
            chart: this,
            annotations: mat_pept,
            fillColor: "#91a8eb",
            strokeColor: "#64748b",
            orientation: (d) => d.a.strand,
            chevronSpacing: 5,
            chevronWidth: 7,
            // chevronFillColor: '#64748b',
            chevronStrokeColor: "#64748b",
          });
          soda.line({
            chart: this,
            annotations: leftJoin,
            selector: "left-join",
            y1: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 8,
            y2: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 24,
            strokeColor: "#64748b",
          });
          soda.line({
            chart: this,
            annotations: rightJoin,
            selector: "right-join",
            y1: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 24,
            y2: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 8,
            strokeColor: "#64748b",
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
            ) =>
              navigate(`/structureindex/${encodeURIComponent(d.a.virus_name)}/${d.a.family}`, {
                state: { key: "value" },
              }),
          });
          // soda.getAnnotationById("")
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
            textColor: "#FFFFFF",
            backgroundColor: "#64748b",
            opacity: 0.7,
            annotations: all,
            text: (d) => d.a.gene_name,
          });
        },
      });

      // remove comment marks to use autoZoom
      if (recordID && domainConstraint[1] > 60000 && selectedProtein) {
        featureViewerRef.current.render(autoZoom())
      } else {
        featureViewerRef.current.render({
          annotations,
          start: domainConstraint[0],
          end: domainConstraint[1],
        });
      }

          //     featureViewerRef.current.render({
          // annotations,
          // start: domainConstraint[0],
          // end: domainConstraint[1],
          //     });
    }

  }, [annotations]);

  //check if recordID matches the family property of any of the annotations
  // if true, take start and end coords and pass to highlight function

  useEffect(() => {
    highlightSelectedGene();

  }, [recordID]);

  return (
    <>
      <div className="text-slate-500 min-w-[40vw] max-w-full ">
        <div className="" id={id}></div>
      </div>
    </>
  );
};

export default FeatureBrowser;
