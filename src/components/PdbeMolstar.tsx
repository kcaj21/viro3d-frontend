import React, { useState, useEffect, useRef } from 'react';
import { PDBeMolstarPlugin } from 'pdbe-molstar/lib';

const MolstarViewer = () => {
  const viewerContainerRef = useRef<HTMLDivElement>(null);

  const [options, setOptions] = useState({
    customData: {
      url: 'https://alphafold.ebi.ac.uk/files/AF-Q5VSL9-F1-model_v4.pdb',
          format: 'pdb',
      binary: false
    },
    alphafoldView: true,
    bgColor: { r: 0, g: 0, b: 0 },
    hideCanvasControls: [
      'selection',
      'animation',
    ],
    sequencePanel: true,
      landscape: false,
      reactive: true,
      controlsDisplay: "reactive",

      hideControls: false
  });

  useEffect(() => {
    const viewerInstance = new PDBeMolstarPlugin();
    viewerInstance.render(viewerContainerRef.current!, options);
    viewerInstance.visual.toggleSpin(true)
      
  }, [options]);

  const handleClick = () => {
    setOptions(({
      ...options,
      sequencePanel: !options.sequencePanel
    }));
  };
    


  return (
    <>
        <div className="relative h-[80%] w-full max-height-full max-width-full  ">
              <div ref={viewerContainerRef} >  
              </div>
        </div>
      
    </>
  );
};

export default MolstarViewer;
