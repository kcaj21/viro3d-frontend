import React, { useRef, useEffect, useState } from "react";
import Konva from "konva";
import { useGraphData } from "../../hooks/useGraphData";
import d3 from "d3";

const ClusterVisualisation = ({ setHoveredVirus, handleViewStructurePopUpClick }) => {
  const konvaContainerRef = useRef(null);
  const stageRef = useRef(null);
  const selectedNodeRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const colourKeys = {
    "Riboviria": "#5cb7a8",
    "Monodnaviria": "#b87795",
    "Unclassified": "gray",
    "Varidnaviria": "#ddc454",
    "Ribozyviria": "#117733",
    "Duplodnaviria": "#8b81b9"
  };

  const { data } = useGraphData();

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
    const initialRadius = 3; // Initial node size, will be scaled with zoom

    const node = new Konva.Circle({
      x: obj.x,
      y: obj.y,
      radius: initialRadius,
      fill: colourKeys[obj.Realm],
      id: obj.id,
      stroke: 'black',
      strokeWidth: 0.015,
    });

    node.on("click", () => handleNodeClick(node, layer));

    // Mouseover event to display tooltip
    node.on("mouseover", () => {
      node.moveToTop();
      setHoveredVirus(node.id());
    });

    // Mouseout event to hide tooltip
    node.on("mouseout", () => {
      setHoveredVirus(null);
    });

    layer.add(node);
  }

  const handleNodeClick = (node, layer) => {
    if (selectedNodeRef.current) {
      selectedNodeRef.current.strokeWidth(0.015);
      selectedNodeRef.current.stroke('black');

      selectedNodeRef.current.zIndex(0);
    }

    node.stroke("orange");
    node.strokeWidth(0.015);
    node.moveToTop();
    selectedNodeRef.current = node;
    layer.batchDraw();
    handleViewStructurePopUpClick(selectedNodeRef.current.attrs.id);
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

      const layer = new Konva.Layer();
      data?.nodes.forEach((nodeData) => addNode(nodeData, layer));
      layer.draw();

      stage.add(layer);

      // Set initial view to the center of the nodes
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

      const centerPoint = getCenterPoint(data?.nodes);
      stage.position({
        x: containerSize.width / 2 - centerPoint.x,
        y: containerSize.height / 2 - centerPoint.y,
      });

      // Define min and max radius values for nodes
      const minRadius = 0.08; // Minimum size for nodes
      const maxRadius = 3;   // Maximum size for nodes

      // Wheel event for zooming with constrained node size
      stage.on("wheel", (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.175;
        const oldScale = stage.scaleX();
        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

        // Update scale of stage
        stage.scale({ x: newScale, y: newScale });

        // Dynamically adjust node sizes based on zoom level, with min and max limits
        let scaledRadius = 12 / newScale; // Adjust the divisor to change sensitivity
        scaledRadius = Math.max(minRadius, Math.min(scaledRadius, maxRadius)); // Constrain radius

        layer.getChildren().forEach((node) => {
          if (node.className === 'Circle') {
            node.radius(scaledRadius);
          }
        });

        // Maintain position based on zoom
        const mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };
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
    <div ref={konvaContainerRef} style={{ width: "100%", height: "100%", backgroundColor: "#f2f2f2" }} />
  );
};

export default ClusterVisualisation;
