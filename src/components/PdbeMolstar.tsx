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
      landscape: true,
      reactive: true,

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
      <div className='border-2 border-black rounded-lg' ref={viewerContainerRef} style={{ width: '800px', height: '600px', position: 'relative', float: 'left' }}>
      </div>
      <button onClick={handleClick}>Toggle Sequence Panel</button>
    </>
  );
};

export default MolstarViewer;
