import React, { useEffect, useRef } from 'react';
import { FeatureViewer } from "feature-viewer-typescript";
import 'feature-viewer-typescript/src/styles/styles.scss';
import { FeaturesList } from 'feature-viewer-typescript/src/interfaces';
import * as soda from '@sodaviz/soda'
import { Chart } from '@sodaviz/soda';
import * as d3 from 'd3'

interface CustomAnnotation extends soda.Annotation {
    family: string;
  }
  
  interface CustomRenderParams extends soda.RenderParams {
    annotations: CustomAnnotation[];
  }

const annotations = [
    {
    "id": "dfam-nrph-1",
    "start": 10464,
    "end": 10954,
    "strand": "-",
    "family": "TAR1",
    "evalue": 1.1e-103,
    "divergence": 10.26
    },
    {
    "id": "dfam-nrph-2",
    "start": 10826,
    "end": 11463,
    "strand": "-",
    "family": "TAR1",
    "evalue": 4.1e-165,
    "divergence": 8.78
    },
    {
    "id": "dfam-nrph-3",
    "start": 11502,
    "end": 11676,
    "strand": "-",
    "family": "L1MC4a_3end",
    "evalue": 6.9e-16,
    "divergence": 31.22
    },
    {
    "id": "dfam-nrph-4",
    "start": 11677,
    "end": 11780,
    "strand": "-",
    "family": "MER5B",
    "evalue": 0.000013,
    "divergence": 37.8
    },
    {
    "id": "dfam-nrph-5",
    "start": 15265,
    "end": 15353,
    "strand": "-",
    "family": "MIR1_Amn",
    "evalue": 0.00031,
    "divergence": 33.08
    },
    {
    "id": "dfam-nrph-6",
    "start": 16362,
    "end": 16459,
    "strand": "-",
    "family": "Charlie15a",
    "evalue": 0.000025,
    "divergence": 31.8
    },
    {
    "id": "dfam-nrph-7",
    "start": 18418,
    "end": 18649,
    "strand": "+",
    "family": "L1M2b_5end",
    "evalue": 4,
    "divergence": 44.07
    },
    {
    "id": "dfam-nrph-8",
    "start": 18908,
    "end": 19049,
    "strand": "+",
    "family": "L2b_3end",
    "evalue": 890,
    "divergence": 46.16
    },
    {
    "id": "dfam-nrph-9",
    "start": 18957,
    "end": 19048,
    "strand": "+",
    "family": "L2a_3end",
    "evalue": 0.076,
    "divergence": 32.8
    },
    {
    "id": "dfam-nrph-10",
    "start": 19972,
    "end": 20727,
    "strand": "+",
    "family": "L3",
    "evalue": 4.7e-67,
    "divergence": 40.77
    },
    {
    "id": "dfam-nrph-11",
    "start": 21950,
    "end": 22344,
    "strand": "+",
    "family": "MLT1K",
    "evalue": 7.1e-31,
    "divergence": 40.13
    },
    {
    "id": "dfam-nrph-12",
    "start": 23121,
    "end": 23361,
    "strand": "-",
    "family": "MIR",
    "evalue": 1.7e-29,
    "divergence": 40.43
    },
    {
    "id": "dfam-nrph-13",
    "start": 23837,
    "end": 24010,
    "strand": "+",
    "family": "L2b_3end",
    "evalue": 1.2e-10,
    "divergence": 38.21
    },
    {
    "id": "dfam-nrph-14",
    "start": 24073,
    "end": 24249,
    "strand": "+",
    "family": "MIR",
    "evalue": 5.5e-12,
    "divergence": 37.09
    },
    {
    "id": "dfam-nrph-15",
    "start": 24261,
    "end": 24447,
    "strand": "+",
    "family": "L2a_3end",
    "evalue": 0.000002,
    "divergence": 44.36
    },
    {
    "id": "dfam-nrph-16",
    "start": 25182,
    "end": 25284,
    "strand": "-",
    "family": "MIRb",
    "evalue": 30,
    "divergence": 43.76
    },
    {
    "id": "dfam-nrph-17",
    "start": 25892,
    "end": 25959,
    "strand": "+",
    "family": "MIR",
    "evalue": 530,
    "divergence": 40.24
    },
    {
    "id": "dfam-nrph-18",
    "start": 26357,
    "end": 26428,
    "strand": "+",
    "family": "MIR1_Amn",
    "evalue": 1.6,
    "divergence": 31.29
    },
    {
    "id": "dfam-nrph-19",
    "start": 26574,
    "end": 26774,
    "strand": "-",
    "family": "L2c_3end",
    "evalue": 3.6,
    "divergence": 49.01
    },
    {
    "id": "dfam-nrph-20",
    "start": 26791,
    "end": 27062,
    "strand": "+",
    "family": "AluSp",
    "evalue": 7.7e-86,
    "divergence": 5.82
    },
    {
    "id": "dfam-nrph-21",
    "start": 27058,
    "end": 27220,
    "strand": "-",
    "family": "L2c_3end",
    "evalue": 0.17,
    "divergence": 44.86
    },
    {
    "id": "dfam-nrph-22",
    "start": 27282,
    "end": 27541,
    "strand": "+",
    "family": "MER33",
    "evalue": 6.7e-53,
    "divergence": 15.37
    },
    {
    "id": "dfam-nrph-23",
    "start": 27833,
    "end": 27986,
    "strand": "-",
    "family": "MIRc",
    "evalue": 0.033,
    "divergence": 51.05
    },
    {
    "id": "dfam-nrph-24",
    "start": 28151,
    "end": 28300,
    "strand": "-",
    "family": "MIRb",
    "evalue": 0.00004,
    "divergence": 46.72
    },
    {
    "id": "dfam-nrph-25",
    "start": 29901,
    "end": 30196,
    "strand": "+",
    "family": "L1MB3_3end",
    "evalue": 3e-56,
    "divergence": 26.39
    },
    {
    "id": "dfam-nrph-26",
    "start": 30343,
    "end": 30532,
    "strand": "-",
    "family": "MER53",
    "evalue": 3.3e-34,
    "divergence": 15.64
    },
    {
    "id": "dfam-nrph-27",
    "start": 30694,
    "end": 30848,
    "strand": "+",
    "family": "MLT1A",
    "evalue": 4.4e-30,
    "divergence": 17.65
    },
    {
    "id": "dfam-nrph-28",
    "start": 30962,
    "end": 31135,
    "strand": "+",
    "family": "MLT1A",
    "evalue": 9.6e-36,
    "divergence": 24.15
    },
    {
    "id": "dfam-nrph-29",
    "start": 31259,
    "end": 31436,
    "strand": "+",
    "family": "MIRc",
    "evalue": 3.5e-9,
    "divergence": 36.07
    },
    {
    "id": "dfam-nrph-30",
    "start": 31436,
    "end": 31734,
    "strand": "+",
    "family": "AluJo",
    "evalue": 1.3e-88,
    "divergence": 10.31
    },
    {
    "id": "dfam-nrph-31",
    "start": 32841,
    "end": 33044,
    "strand": "+",
    "family": "MIR",
    "evalue": 3.6e-19,
    "divergence": 30.66
    },
    {
    "id": "dfam-nrph-32",
    "start": 33047,
    "end": 33456,
    "strand": "+",
    "family": "L1MB5_3end",
    "evalue": 6e-92,
    "divergence": 19.35
    },
    {
    "id": "dfam-nrph-33",
    "start": 33467,
    "end": 33509,
    "strand": "+",
    "family": "FLAM_C",
    "evalue": 0.067,
    "divergence": 20.54
    },
    {
    "id": "dfam-nrph-34",
    "start": 33531,
    "end": 34097,
    "strand": "-",
    "family": "L1PA6_3end",
    "evalue": 2.7e-172,
    "divergence": 8.38
    },
    {
    "id": "dfam-nrph-35",
    "start": 34115,
    "end": 34349,
    "strand": "-",
    "family": "MLT1J",
    "evalue": 7.5e-10,
    "divergence": 54.83
    },
    {
    "id": "dfam-nrph-36",
    "start": 34415,
    "end": 34562,
    "strand": "-",
    "family": "L2c_3end",
    "evalue": 0.0000074,
    "divergence": 41.02
    },
    {
    "id": "dfam-nrph-37",
    "start": 34565,
    "end": 34934,
    "strand": "-",
    "family": "MLT1J2",
    "evalue": 3.3e-46,
    "divergence": 34.22
    },
    {
    "id": "dfam-nrph-38",
    "start": 35367,
    "end": 35508,
    "strand": "+",
    "family": "FLAM_C",
    "evalue": 9.6e-38,
    "divergence": 9.72
    },
    {
    "id": "dfam-nrph-39",
    "start": 35216,
    "end": 35381,
    "strand": "-",
    "family": "MIRc",
    "evalue": 8.7e-8,
    "divergence": 44.06
    },
    {
    "id": "dfam-nrph-40",
    "start": 37045,
    "end": 37431,
    "strand": "+",
    "family": "Charlie5",
    "evalue": 6e-75,
    "divergence": 20.89
    },
    {
    "id": "dfam-nrph-41",
    "start": 37735,
    "end": 37860,
    "strand": "+",
    "family": "L2c_3end",
    "evalue": 0.096,
    "divergence": 42.64
    },
    {
    "id": "dfam-nrph-42",
    "start": 38068,
    "end": 38229,
    "strand": "+",
    "family": "L2",
    "evalue": 1.6e-16,
    "divergence": 23.56
    },
    {
    "id": "dfam-nrph-43",
    "start": 38239,
    "end": 39462,
    "strand": "+",
    "family": "MLT1F-int",
    "evalue": 2.2e-209,
    "divergence": 28.94
    },
    {
    "id": "dfam-nrph-44",
    "start": 39465,
    "end": 39572,
    "strand": "+",
    "family": "MLT1F2",
    "evalue": 1e-9,
    "divergence": 27.58
    },
    {
    "id": "dfam-nrph-45",
    "start": 39624,
    "end": 39925,
    "strand": "+",
    "family": "AluSx",
    "evalue": 5.6e-94,
    "divergence": 7.26
    },
    {
    "id": "dfam-nrph-46",
    "start": 39953,
    "end": 40296,
    "strand": "+",
    "family": "MLT1E1A",
    "evalue": 5.9e-43,
    "divergence": 32.7
    },
    {
    "id": "dfam-nrph-47",
    "start": 40340,
    "end": 40628,
    "strand": "+",
    "family": "L2a_3end",
    "evalue": 1.5e-28,
    "divergence": 37.55
    },
    {
    "id": "dfam-nrph-48",
    "start": 40637,
    "end": 40738,
    "strand": "-",
    "family": "AluSz6",
    "evalue": 1e-17,
    "divergence": 12.13
    },
    {
    "id": "dfam-nrph-49",
    "start": 40736,
    "end": 41072,
    "strand": "-",
    "family": "LTR16C",
    "evalue": 8e-26,
    "divergence": 48.4
    },
    {
    "id": "dfam-nrph-50",
    "start": 41161,
    "end": 42284,
    "strand": "-",
    "family": "ERV3-16A3_I",
    "evalue": 1.4e-107,
    "divergence": 47.28
    },
    {
    "id": "dfam-nrph-51",
    "start": 42370,
    "end": 42507,
    "strand": "+",
    "family": "MamRep1527",
    "evalue": 2.4e-9,
    "divergence": 41.98
    },
    {
    "id": "dfam-nrph-52",
    "start": 42566,
    "end": 42714,
    "strand": "+",
    "family": "MamRep1527",
    "evalue": 1e-10,
    "divergence": 44.95
    },
    {
    "id": "dfam-nrph-53",
    "start": 42994,
    "end": 43201,
    "strand": "+",
    "family": "L1M5_orf2",
    "evalue": 2.1,
    "divergence": 39.49
    },
    {
    "id": "dfam-nrph-54",
    "start": 43263,
    "end": 44966,
    "strand": "+",
    "family": "L1M3_orf2",
    "evalue": 0,
    "divergence": 20.98
    },
    {
    "id": "dfam-nrph-55",
    "start": 44793,
    "end": 45745,
    "strand": "+",
    "family": "L1MA9_3end",
    "evalue": 8.3e-185,
    "divergence": 19.28
    },
    {
    "id": "dfam-nrph-56",
    "start": 45887,
    "end": 46064,
    "strand": "+",
    "family": "L1ME4a_3end",
    "evalue": 9.3e-9,
    "divergence": 33.93
    },
    {
    "id": "dfam-nrph-57",
    "start": 46077,
    "end": 46195,
    "strand": "+",
    "family": "L1MA9_3end",
    "evalue": 1.5e-10,
    "divergence": 26.9
    },
    {
    "id": "dfam-nrph-58",
    "start": 46416,
    "end": 46493,
    "strand": "-",
    "family": "LTR12",
    "evalue": 6.8e-17,
    "divergence": 1.55
    },
    {
    "id": "dfam-nrph-59",
    "start": 46421,
    "end": 46526,
    "strand": "-",
    "family": "LTR30",
    "evalue": 9.8e-11,
    "divergence": 24.75
    },
    {
    "id": "dfam-nrph-60",
    "start": 46553,
    "end": 46715,
    "strand": "+",
    "family": "MER45A",
    "evalue": 6.4e-23,
    "divergence": 24.37
    },
    {
    "id": "dfam-nrph-61",
    "start": 46893,
    "end": 47087,
    "strand": "-",
    "family": "MER58A",
    "evalue": 2.4e-33,
    "divergence": 18.53
    },
    {
    "id": "dfam-nrph-62",
    "start": 48417,
    "end": 48761,
    "strand": "+",
    "family": "L1PREC2_orf2",
    "evalue": 2e-83,
    "divergence": 11.25
    },
    {
    "id": "dfam-nrph-63",
    "start": 48622,
    "end": 49517,
    "strand": "+",
    "family": "L1PA14_3end",
    "evalue": 1.2e-270,
    "divergence": 8.77
    }
    ]

const FeatureBrowser: React.FC = () => {
    const featureViewerRef = useRef<Chart<P> | null>(null);

    let colors = d3.scaleOrdinal(d3.schemeTableau10);

        useEffect(() => {
        if (!featureViewerRef.current) {
            featureViewerRef.current = new soda.Chart<CustomRenderParams>({
                selector: "div#soda-chart",
                // rowColors: ['#f9f9f9', '#4a95c0'],
                // rowOpacity: 0.5,
                zoomable: true,
                rowHeight: 25,
                zoomConstraint: [1, 100],
                resizable: true,
                draw(params) {
                    this.addAxis();
                    // soda.chevronRectangle({
                    soda.rectangle({
                        chart: this,
                        annotations: params.annotations,
                        fillColor: (d) => colors(d.a.family),
                        strokeColor: "none"
                    });
                
                },
                postRender(params) {
                    soda.clickBehavior({
                      chart: this,
                      annotations: params.annotations,
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
                      annotations: params.annotations,
                      // this function is evaluated when a glyph is moused over
                      mouseover: (s, d) => s.style("stroke", "black"),
                      // this function is evaluated when a glyph is no longer moused over
                      mouseout: (s, d) => s.style("stroke", "none")
                    });
                    soda.tooltip({
                      chart: this,
                      annotations: params.annotations,
                      text: (d) => d.a.family
                    });
                  }
                
            });

            //             fetch("https://sodaviz.org/data/examples/default")
            // .then(response => response.json())
            // .then(annotations => featureViewerRef.current.render({ annotations }));
            featureViewerRef.current.render({ annotations });
            // featureViewerRef.current.render({ });

        }


    }, []);


    


    return (
      <>
          <div className="">
                <div className='text-slate-500' id='soda-chart'></div>
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