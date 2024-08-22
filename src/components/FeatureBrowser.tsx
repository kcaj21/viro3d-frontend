import React, { useEffect, useRef } from 'react';
import { FeatureViewer } from "feature-viewer-typescript";
import 'feature-viewer-typescript/src/styles/styles.scss';
import { FeaturesList } from 'feature-viewer-typescript/src/interfaces';
import * as soda from '@sodaviz/soda'
import { Chart } from '@sodaviz/soda';
import * as d3 from 'd3'
import '../customScrollBar.css';

interface CustomAnnotation extends soda.Annotation {
    family: string;
  }
  
  interface CustomRenderParams extends soda.RenderParams {
    annotations: CustomAnnotation[];
  }



const FeatureBrowser: React.FC = ({annotations, id}) => {
    const featureViewerRef = useRef<Chart<P> | null>(null);

    let leftJoin = annotations.filter((a) => a.join == 'left-join');
    let rightJoin = annotations.filter((a) => a.join == 'right-join');
    let gene = annotations.filter((a) => a.join == 'none');



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
                        // strokeColor: "none",
                        orientation: (d) => d.a.strand,
                        chevronSpacing: 5
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
                        d: soda.AnnotationDatum<CustomAnnotation, Chart<CustomRenderParams>>
                      ) => alert(`${d.a.id} clicked`)
                    });
                    soda.hoverBehavior({
                      chart: this,
                      annotations: gene,
                      // this function is evaluated when a glyph is moused over
                      mouseover: (s, d) => s.style("stroke", "black"),
                      // this function is evaluated when a glyph is no longer moused over
                      mouseout: (s, d) => s.style("stroke", "none")
                    });
                    soda.tooltip({
                      chart: this,
                      annotations: gene,
                      text: (d) => d.a.family
                    });
                    soda.line({
                        chart: this,
                        annotations: leftJoin,
                        selector: 'left-join',
                        y1: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 2,
                        y2: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 4,
                    });
                    soda.line({
                        chart: this,
                        annotations: rightJoin,
                        selector: 'right-join',
                        y1: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 4,
                        y2: (d) => d.c.layout.row(d) * d.c.rowHeight + d.c.rowHeight / 2,
                      });
                }
                
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
            <div className="text-slate-500 min-w-[40vh] ">
                <div className="text-center">{ id }</div>
                <div className="" id={id}></div>
          </div>   
      </>
    );
};


// const featurelist: FeaturesList = [
//     { // simple rect
//         type: 'rect',
//         id: 'useUniqueId',
//         data: [ {
//           x: 50, y: 78,
//           tooltip: '<button class="myButton">Button</button>'} ],
//       },
//       { // circles
//         type: 'rect',
//         id: 'mycircle',
//         label: 'CAX33877',
//         data: [{x: 0 , y: 11, Gen_id:'CAX33877.1.2', tooltip: 'CAX33877.1.2'}, {x: 12, y: 44}, {x: 45, y: 244, color: '#00ac8f', tooltip: 'I have different color'}, {x:255,y:300}],
//         color: '#4a95c0'
//       },
//       { // curve (height and yLim) with tooltip and subfeatures
//         type: 'curve',
//         id: 'mycurve',
//         label: 'Curve label',
//         data: [{x: 1, y: 0}, {x: 40, y: 102}, {x: 80, y: 5}, {x: 50, y: 184}, {x: 75, y: 4}],
//         height: 1,
//         yLim: 200,
//         color: '#00babd',
//         tooltip: '<b>Very</b> <span style="color: #C21F39">Stylable</span> <b><i><span style="color: #ffc520">Tooltip </span></i></b>',
//         subfeatures: [
//           {
//             type: 'rect',
//             data: [
//               {x: 20, y: 30},
//               {x: 15, y: 45},
//               {x: 70, y: 76, label: 'myRect', tooltip: 'myTooltip'}
//             ],
//             id: 'aDifferentId',
//             label: 'I am a subfeature!'
//           }
//         ]
//       }
// ];

// // featureslist where each peptide has its own track
// // const featurelist: FeaturesList = [
// //     {
// //         data: [{x:0,y:11, Gen_id:'CAX33877.1'}],
// //         id: "CAX33877",
// //         color: "#4a95c0",
// //         type: "rect",
// //         filter: "type1",
// //         tooltip: "CAX33877.1",
// //         label: "CAX33877.1"
// //     },
// //     {
// //         data: [{x:12,y:44, Gen_id:'CAX33877.1.2'}],
// //         id: "CAX33877",
// //         color: "#4a95c0",
// //         type: "rect",
// //         filter: "type1",
// //         tooltip: "CAX33877.1.2",
// //         label: "CAX33877.1.2"

// //     },
// //     {
// //         data: [{x:45,y:244, Gen_id:'CAX33877.1.3'}],
// //         id: "CAX33877",
// //         color: "#4a95c0",
// //         type: "rect",
// //         filter: "type1",
// //         tooltip: "CAX33877.1.3",
// //         label: "CAX33877.1.3"
// //     },
// //     {
// //         data: [{x:255,y:300, Gen_id:'CAX33877.1.4'}],
// //         id: "CAX33877",
// //         color: "#4a95c0",
// //         type: "rect",
// //         filter: "type1",
// //         tooltip: "CAX33877.1.4",
// //         label: "CAX33877.1.4"
// //     }
// // ];

// const FeatureBrowser: React.FC = () => {
//     const featureViewerRef = useRef<FeatureViewer | null>(null);


//     useEffect(() => {
//         if (!featureViewerRef.current) { // Check if FeatureViewer has already been initialized
//             const seq = 'MQTITKTRTSKYLKSILNPASGPCHIPDDIVTRCSLRSETTTYNITAPGSGQGIFIFYPNSPFGWCGYHYTFDGTKYLYDNITGPLDTAQNLDQNYNYSRLVSQLLTLRSSTLPAGVYALNGTFNAITYDGCVSEANLPTTQYGQLLSLNSDVIDKVGNVLVGDGVAILSLPNRFDVPFCRMNDPAPSTGNTGALFRSSIVDATANLRYEMQMAPIAIGAMPAYNTILASINVDNVRSISVRGNIPLINSSRLNVTSVITYNVLYQDFTGATIYQETKAAPITIDPNYATGPNNQGGCSFMVESTFSAMPAGAKHTQPVAAVAFSIANIVQPTVSSWDVNEFGFAPFSNVSTESTSSITLTVEAVSAAFPGMNSPVTVVAYQGLAGGSVLTLSGVSNYELIPNPSLKKNLPTSYGRHDPAELNYVKMVLANREELGVKTVFALPEYKQLLTRLEEFYNLDTNTYAEAFDWGKLLRTIKDIAVPTLSTIFPQFGPLIGAGSALGDELLKSFAASGTAIAASGTPITRASAVTPGVDLVDLRNYAMDNWDIVNMDLQNLTYNSQMLYTKKLYVGERLSSEGPPRGVLFPTITMRNNALMSHMIYLAVPGNWSSRLPMNVRDNYSETANGKRIWGIANTYLGHIMTNQDITLLPILSIQGGFAIIPDEAPILEGTSCVSAILCAYRGDFQGIPPALVTGNAKLIEGRYVVMPNPAQQMKKQIAAQKELKFIGADLSGPLLTIFHVINELSGLETKNKTFDTVKHDQDHSRSVNLCADDDTMQQWQDLSAQISTQDDGFRKLIHILNWTNRNGLADMLYNFAETDPDGNRLYKTIAPLTAEYKARNPESKTPYEAQRAKAERISANLRKQYGEAFTPEWVEQHGYRGPTSEEIRALTSQVARPEKIEAIIAATIKNNGGDKLSPDQRSEIEVAIRNKGKGLNPDELMRALGREGTNLGSKAENFIINSGIKDEELKQRIREEIMTSGKGLSADRLRELMGVNRVEPRKPTPAVRKLVGALQAAPKATAQKQIQAPTPRARQPQRPQAEQTPLQKLLMRTMEEES';
//             featureViewerRef.current = new FeatureViewer(seq, '#parent', {
//                 toolbar: true,
//                 showSequence: false,
//                 brushActive: false,
//                 zoomMax: 10,
//                 backgroundcolor: '#f9f9f9',
//                 flagColor: '#4a95c0',                 
//             }, featurelist);
//             featureViewerRef.current?.onRegionSelected(handleClick)

//         }

//         // Cleanup function (if needed)

//     }, []);

//     const handleClick = (e) => {
//         console.log('hello', e.detail)
//     }

//     return (
//       <>
//           <div className="font-extralight">
//                 <div id='parent'></div>
//           </div>   
//       </>
//     );
// };

export default FeatureBrowser;

// // fv.addFeatures(
// //     [
// //       { // simple rect
// //         type: 'rect',
// //         id: 'useUniqueId',
// //         data: [ {
// //           x: 50, y: 78,
// //           tooltip: '<button class="myButton">Button</button>'} ],
// //       },
// //       { // circles
// //         type: 'circle',
// //         id: 'mycircle',
// //         label: 'Circle feature',
// //         data: [{x: 10 , y: 100}, {x: 50, y: 70}, {x: 40, y: 60, color: '#00ac8f', tooltip: 'I have different color'}],
// //         color: '#61795e'
// //       },
// //       { // curve (height and yLim) with tooltip and subfeatures
// //         type: 'curve',
// //         id: 'mycurve',
// //         label: 'Curve label',
// //         data: [{x: 1, y: 0}, {x: 40, y: 102}, {x: 80, y: 5}, {x: 50, y: 184}, {x: 75, y: 4}],
// //         height: 1,
// //         yLim: 200,
// //         color: '#00babd',
// //         tooltip: '<b>Very</b> <span style="color: #C21F39">Stylable</span> <b><i><span style="color: #ffc520">Tooltip </span></i></b>',
// //         subfeatures: [
// //           {
// //             type: 'rect',
// //             data: [
// //               {x: 20, y: 30},
// //               {x: 15, y: 45},
// //               {x: 70, y: 76, label: 'myRect', tooltip: 'myTooltip'}
// //             ],
// //             id: 'aDifferentId',
// //             label: 'I am a subfeature!'
// //           }
// //         ]
// //       }
// //     ]
// //   )