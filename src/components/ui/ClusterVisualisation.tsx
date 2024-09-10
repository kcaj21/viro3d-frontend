import * as d3 from 'd3';

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

type ScatterplotProps = {
  width: number;
  height: number;
  data: { x: number; y: number }[];
};

const ClusterVisualisation = ({ width, height, data }: ScatterplotProps) => {
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Scales
  const yScale = d3.scaleLinear().domain([0, 100]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([0, 100]).range([0, boundsWidth]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={13}
        cx={xScale(d.y)}
        cy={yScale(d.x)}
        opacity={1}
        stroke="#ACCBE1"
        fill="#ACCBE1"
        fillOpacity={0.2}
        strokeWidth={1}
      />
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        >
          <g transform={`translate(0, ${boundsHeight})`}>
          </g>
          {allShapes}
        </g>
      </svg>
    </div>
  );
};


export default ClusterVisualisation;
