import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import { useGraphData } from '../../hooks/useGraphData';

const VanillaTest = () => {
  const konvaContainerRef = useRef(null); // Reference for the div container
  const stageRef = useRef(null); // Reference for Konva Stage instance

  const { data } = useGraphData();

  const width = window.innerWidth;
  const height = window.innerHeight;

  function addNode(obj, layer) {
    const node = new Konva.Circle({
      x: obj.x,
      y: obj.y,
      radius: 4,
      fill: 'red',
      id: obj.id,
    });
    layer.add(node);
  }

  useEffect(() => {
    if (!stageRef.current) {
      const stage = new Konva.Stage({
        container: konvaContainerRef.current,
        width: width,
        height: height,
        draggable: true, // Enable panning by dragging
      });
      stageRef.current = stage;

      const tooltipLayer = new Konva.Layer();
      const layer = new Konva.Layer();

      const tooltip = new Konva.Label({
        opacity: 0.75,
        visible: false,
        listening: false,
      });

      tooltip.add(
        new Konva.Tag({
          fill: 'black',
          pointerDirection: 'down',
          pointerWidth: 10,
          pointerHeight: 10,
          lineJoin: 'round',
        })
      );

      tooltip.add(
        new Konva.Text({
          text: '',
          fontFamily: 'Calibri',
          fontSize: 18,
          padding: 5,
          fill: 'white',
        })
      );

      tooltipLayer.add(tooltip);

      // Render nodes
      data?.nodes.forEach((nodeData) => addNode(nodeData, layer));
      layer.draw();

      // Add layers to the stage
      stage.add(layer);
      stage.add(tooltipLayer);

      // Tooltip event listeners
      stage.on('mouseover mousemove', function (evt) {
        const node = evt.target;
        if (node) {
          const mousePos = node.getStage().getPointerPosition();
          tooltip.position({
            x: mousePos.x,
            y: mousePos.y - 5,
          });
          tooltip.getText().text('node: ' + node.id() + ', color: ' + node.fill());
          tooltip.show();
          tooltipLayer.batchDraw();
        }
      });

      stage.on('mouseout', () => {
        tooltip.hide();
        tooltipLayer.batchDraw();
      });

      // Zooming and panning
      stage.on('wheel', (e) => {
        e.evt.preventDefault();

        const scaleBy = 1.1;
        const oldScale = stage.scaleX();

        const mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        stage.scale({ x: newScale, y: newScale });

        const newPos = {
          x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
          y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
        };
        stage.position(newPos);
        stage.batchDraw();
      });
    }

    // Cleanup function to destroy stage on unmount
    return () => {
      stageRef.current?.destroy();
      stageRef.current = null;
    };
  }, [width, height, data]);

  return <div ref={konvaContainerRef} style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }} />;
};

export default VanillaTest;
