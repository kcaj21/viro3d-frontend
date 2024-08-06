import React, { useEffect, useRef } from 'react';
import { FeatureViewer } from "feature-viewer-typescript";
import 'feature-viewer-typescript/src/styles/styles.scss';
import { FeaturesList } from 'feature-viewer-typescript/src/interfaces';

//adding an id to the featureslist breaks the app for some reason

const featurelist: FeaturesList = [
    {
        data: [{x:0,y:11},{x:12,y:44},{x:45,y:244}, {x:255,y:300}],
        id: "CAX33877",
        color: "#4a95c0",
        type: "rect",
        filter: "type1"
    }
];

const FeatureBrowser: React.FC = () => {
    const featureViewerRef = useRef<FeatureViewer | null>(null);

    useEffect(() => {
        if (!featureViewerRef.current) { // Check if FeatureViewer has already been initialized
            const seq = 'MQTITKTRTSKYLKSILNPASGPCHIPDDIVTRCSLRSETTTYNITAPGSGQGIFIFYPNSPFGWCGYHYTFDGTKYLYDNITGPLDTAQNLDQNYNYSRLVSQLLTLRSSTLPAGVYALNGTFNAITYDGCVSEANLPTTQYGQLLSLNSDVIDKVGNVLVGDGVAILSLPNRFDVPFCRMNDPAPSTGNTGALFRSSIVDATANLRYEMQMAPIAIGAMPAYNTILASINVDNVRSISVRGNIPLINSSRLNVTSVITYNVLYQDFTGATIYQETKAAPITIDPNYATGPNNQGGCSFMVESTFSAMPAGAKHTQPVAAVAFSIANIVQPTVSSWDVNEFGFAPFSNVSTESTSSITLTVEAVSAAFPGMNSPVTVVAYQGLAGGSVLTLSGVSNYELIPNPSLKKNLPTSYGRHDPAELNYVKMVLANREELGVKTVFALPEYKQLLTRLEEFYNLDTNTYAEAFDWGKLLRTIKDIAVPTLSTIFPQFGPLIGAGSALGDELLKSFAASGTAIAASGTPITRASAVTPGVDLVDLRNYAMDNWDIVNMDLQNLTYNSQMLYTKKLYVGERLSSEGPPRGVLFPTITMRNNALMSHMIYLAVPGNWSSRLPMNVRDNYSETANGKRIWGIANTYLGHIMTNQDITLLPILSIQGGFAIIPDEAPILEGTSCVSAILCAYRGDFQGIPPALVTGNAKLIEGRYVVMPNPAQQMKKQIAAQKELKFIGADLSGPLLTIFHVINELSGLETKNKTFDTVKHDQDHSRSVNLCADDDTMQQWQDLSAQISTQDDGFRKLIHILNWTNRNGLADMLYNFAETDPDGNRLYKTIAPLTAEYKARNPESKTPYEAQRAKAERISANLRKQYGEAFTPEWVEQHGYRGPTSEEIRALTSQVARPEKIEAIIAATIKNNGGDKLSPDQRSEIEVAIRNKGKGLNPDELMRALGREGTNLGSKAENFIINSGIKDEELKQRIREEIMTSGKGLSADRLRELMGVNRVEPRKPTPAVRKLVGALQAAPKATAQKQIQAPTPRARQPQRPQAEQTPLQKLLMRTMEEES';
            featureViewerRef.current = new FeatureViewer(seq, '#parent', {
                toolbar: false,
                showSequence: false,
                // brushActive: true,
                zoomMax: 20,
                flagColor: '#4a95c0'
            }, featurelist);

        }

        // Cleanup function (if needed)

    }, [featurelist]);

    return (
      <>
          <div className="">
                <div id='parent'></div>
          </div>   
      </>
    );
};

export default FeatureBrowser;
