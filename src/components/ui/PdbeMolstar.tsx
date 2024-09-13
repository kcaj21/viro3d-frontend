import React, { useEffect, createRef, } from 'react';
import { PDBeMolstarPlugin } from 'pdbe-molstar/lib';
import { InitParams } from 'pdbe-molstar/lib/spec';

type Model = {
  modelID: String;
}

const PDBeMolStar: React.FC<Model> = ({modelID}) => {

  // const {recordID} = useParams()

  const viewerContainerRef = createRef<HTMLDivElement>()

  // In debug mode of react's strict mode, this code will
  // be called twice in a row, which might result in unexpected behavior.
  
  useEffect(() => {
    function init() {
      const url = `http://localhost:8000/pdb/CF-${modelID}_relaxed.pdb`

      const pluginInstance = new PDBeMolstarPlugin()

      //Set options (Checkout available options list in the documentation)
      const options: Partial<InitParams> = {
        customData: {
          url: url,
          format: "pdb",
          binary: false,
        },
        hideCanvasControls: [
          'selection',
          'animation',
          'expand',
          'controlToggle',
          'controlInfo'
        ],
        alphafoldView: true,
        bgColor: { r: 242, g: 242, b: 242 },
        hideControls: true,
        sequencePanel: true,
        reactive: true,
        hideStructure: ['het', 'water', 'nonStandard', 'carbs', 'coarse'],
        //remove comment-out on line below to disable ball and stick from showing when you select a residue
        granularity: 'residueInstances'
      }

      if (viewerContainerRef.current === null) return

      //Call render method to display the 3D view
      pluginInstance.render(viewerContainerRef.current, options)

    }
    init()
  }, [modelID])

  return (
    <>
        <div className="relative h-[100%] w-full max-height-full max-width-full  ">
              <div ref={viewerContainerRef} style={{border: "0px"}}  >  
              </div>
        </div>   
    </>
  );
};

export default PDBeMolStar;
