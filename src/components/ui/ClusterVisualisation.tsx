import { useEffect, useRef } from "react";
import { useGraphData } from "../../hooks/useGraphData";
import * as d3 from "d3";

const ClusterVisualisation = () => {


  const { data } = useGraphData();
  const canvasRef = useRef();
  
let navHeight = document.getElementById("navbar")?.offsetHeight;
let footerHeight = document.getElementById("footer")?.offsetHeight;

let height = window.innerHeight - (navHeight + footerHeight);
let width = window.innerWidth;
  
  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const canvas = d3.select(canvasRef.current);
    const context = canvas.node().getContext("2d");

    // Calculate data bounds
    const xExtent = d3.extent(data.nodes, d => d.x);
    const yExtent = d3.extent(data.nodes, d => d.y);

    const x = d3.scaleLinear().domain(xExtent).range([0, width]);
    const y = d3.scaleLinear().domain(yExtent).range([height, 0]);

    // Calculate scale extent so all points are visible at minimum zoom level
    const minScale = Math.min(width / (x(xExtent[1]) - x(xExtent[0])), height / (y(yExtent[1]) - y(yExtent[0])));
    
    const drawPoints = (transform) => {
      // Set the background color to black
      context.fillStyle = "black";
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(transform.x, transform.y);
      context.scale(transform.k, transform.k);

      // Set the circle color to blue
      context.fillStyle = "#4a95c0";
      data.nodes.forEach((d) => {
        context.beginPath();
        context.arc(x(d.x), y(d.y), 0.15, 0, 2 * Math.PI); // Draw small circles for each node
        context.fill();
      });
      context.restore();
    };

    // Adjust zoom to allow viewing the full dataset
    const zoom = d3.zoom()
      .scaleExtent([minScale, 100]) // Allow zooming out to see all points
      .on("zoom", (event) => {
        drawPoints(event.transform);
      });

    d3.select(canvasRef.current).call(zoom);

    // Initial draw with identity transform
    drawPoints(d3.zoomIdentity);

  }, [data]);

  return (
    <>
      {!data ? (
        <div className="results-container flex flex-col items-center h-screen w-screen justify-center">
          <h2 className="mb-12 text-5xl text-slate-500">Loading</h2>
        </div>
      ) : (
        <canvas ref={canvasRef} width={width} height={height} />
      )}
    </>
  );
};

export default ClusterVisualisation;
