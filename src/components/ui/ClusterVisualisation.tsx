import React, { useRef, useEffect, useState } from "react";
import Konva from "konva";
import { useGraphData } from "../../hooks/useGraphData";

const ClusterVisualisation = ( {setHoveredVirus, handleViewStructurePopUpClick} ) => {
  const konvaContainerRef = useRef(null);
  const stageRef = useRef(null);
  const selectedNodeRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const colourKeys = {"Riboviria": "#5cb7a8", "Monodnaviria": "#b87795", "Unclassified": "gray", "Varidnaviria": "#ddc454", "Ribozyviria": "#117733", "Duplodnaviria": "#8b81b9" }

  const { data } = useGraphData();

  // Function to calculate the center point of the nodes
  const getCenterPoint = (nodes) => {
    if (!nodes || nodes.length === 0) return { x: 0, y: 0 };

    const sum = nodes.reduce(
      (acc, node) => {
        acc.x += node.x;
        acc.y += node.y;
        return acc;
      },
      { x: 0, y: 0 }
    );

    return {
      x: sum.x / nodes.length,
      y: sum.y / nodes.length,
    };
  };

  // Set initial size
  useEffect(() => {
    if (konvaContainerRef.current) {
      const { clientWidth, clientHeight } = konvaContainerRef.current;
      setContainerSize({ width: clientWidth, height: clientHeight });
    }

    const handleResize = () => {
      if (konvaContainerRef.current) {
        const { clientWidth, clientHeight } = konvaContainerRef.current;
        setContainerSize({ width: clientWidth, height: clientHeight });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function addNode(obj, layer) {
    const node = new Konva.Circle({
      x: obj.x,
      y: obj.y,
      radius: 2,
      // fill: "#89b717",
      fill: colourKeys[obj.Realm],
      id: obj.id,
      stroke: 'black',
      strokeWidth: 0.15,
    });

    node.on("click", () => handleNodeClick(node, layer));
    layer.add(node);
    

  }

  const handleNodeClick = (node, layer) => {
    if (selectedNodeRef.current) {
      selectedNodeRef.current.strokeWidth(0);
      selectedNodeRef.current.zIndex(0);
    console.log(selectedNodeRef.current.attrs.id)

    }

    node.stroke("orange");
    node.strokeWidth(0.3);
    node.moveToTop();

    selectedNodeRef.current = node;
    layer.batchDraw();
    handleViewStructurePopUpClick(selectedNodeRef.current.attrs.id)
  };

  useEffect(() => {
    if (!stageRef.current && containerSize.width && containerSize.height) {
      const initialScale = 1; 
      const stage = new Konva.Stage({
        container: konvaContainerRef.current,
        width: containerSize.width,
        height: containerSize.height,
        draggable: true,
        scale: { x: initialScale, y: initialScale },
      });
      stageRef.current = stage;

      const tooltipLayer = new Konva.Layer();
      const layer = new Konva.Layer();

      const tooltip = new Konva.Label({
        x: 10,
        y: 10,
        opacity: 0.75,
        visible: false,
        listening: false,
      });

      tooltip.add(
        new Konva.Tag({
          fill: "black",
          pointerDirection: "down",
          pointerWidth: 10,
          pointerHeight: 10,
          lineJoin: "round",
        })
      );

      tooltip.add(
        new Konva.Text({
          text: "",
          fontFamily: "Calibri",
          fontSize: 18,
          padding: 5,
          fill: "white",
        })
      );

      tooltipLayer.add(tooltip);

      data?.nodes.forEach((nodeData) => addNode(nodeData, layer));
      layer.draw();

      stage.add(layer);
      stage.add(tooltipLayer);

      // Set initial view to the center of the nodes
      const centerPoint = getCenterPoint(data?.nodes);
      stage.position({
        x: containerSize.width / 2 - centerPoint.x,
        y: containerSize.height / 2 - centerPoint.y,
      });

      stage.on("mouseover mousemove", function (evt) {
        const node = evt.target;
        if (node) {
          setHoveredVirus(node.id())
        }
      });

      stage.on("mouseout", () => {
        tooltip.hide();
        tooltipLayer.batchDraw();
      });

      stage.on("wheel", (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.1;
        const oldScale = stage.scaleX();
        const mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };
        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
        stage.scale({ x: newScale, y: newScale });
        const newPos = {
          x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
          y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
        };
        stage.position(newPos);
        stage.batchDraw();
      });
    }
    return () => {
      stageRef.current?.destroy();
      stageRef.current = null;
    };
  }, [containerSize, data]);

  return (
  <div ref={konvaContainerRef} style={{ width: "100%", height: "100%", backgroundColor: "#f2f2f2" }} />);
};

export default ClusterVisualisation;
