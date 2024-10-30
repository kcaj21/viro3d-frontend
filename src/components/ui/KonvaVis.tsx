import React, { useState } from 'react';
import { Stage, Layer, Circle, Text, FastLayer } from 'react-konva';
import { useGraphData } from '../../hooks/useGraphData';

const KonvaVis = () => {

    const { data } = useGraphData();

    let navHeight = document.getElementById("navbar")?.offsetHeight;
    let footerHeight = document.getElementById("footer")?.offsetHeight;
    
    let height = window.innerHeight - (navHeight + footerHeight);
    let width = window.innerWidth;

    const [zoomState, setZoomState] = useState({
        stageScale: 1,
        stageX: 0,
        stageY: 0
      });

    const handleWheel = (e) => {
        e.evt.preventDefault();
    
        const scaleBy = 1.2;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };
    
        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    
        setZoomState({
          stageScale: newScale,
          stageX:
            -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
          stageY:
            -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        });
    }
    
  return (
    <>
    {!data ? (
      <div className="results-container flex flex-col items-center h-screen w-screen justify-center">
        <h2 className="mb-12 text-5xl text-slate-500">Loading</h2>
      </div>
    ) : (
    <Stage width={width} height={height}
    width={window.innerWidth}
    height={window.innerHeight}
    onWheel={handleWheel}
    scaleX={zoomState.stageScale}
    scaleY={zoomState.stageScale}
    x={zoomState.stageX}
    y={zoomState.stageY}
    draggable>
      <Layer>
        {data.nodes.map((node) => (
          <Circle
            key={node.id}
            id={node.id}
            x={node.x}
            y={node.y}
            radius={1}
            fill="#89b717"
          />
        ))}
      </Layer>
    </Stage>
        )}
  </>
  );
};

export default KonvaVis;