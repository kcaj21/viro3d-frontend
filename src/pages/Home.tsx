import React from "react";
import ClusterVisualization from "../components/ui/ClusterVisualisation";
import "/src/customScrollBar.css";

const data = [
  {
    x: 2,
    y: 4,
  },
  {
    x: 3,
    y: 5,
  },
  {
    x: 1,
    y: 2,
  },
  {
    x: 5,
    y: 5,
  },
  {
    x: 7,
    y: 8,
  },
  {
    x: 9,
    y: 9,
  },
  {
    x: 6,
    y: 8,
  },
  {
    x: 5,
    y: 4,
  },
  {
    x: 7,
    y: 5,
  },
  {
    x: 8,
    y: 9,
  },
  {
    x: 6,
    y: 9,
  },
  {
    x: 3,
    y: 6,
  },
  {
    x: 2,
    y: 1,
  },
];

let navHeight = document.getElementById("navbar")?.offsetHeight;
let footerHeight = document.getElementById("footer")?.offsetHeight;

let height = window.innerHeight - (navHeight + footerHeight);
let width = window.innerWidth;

const Home: React.FC = () => {

  return (
    <>
      <div className="custom-no-scrollbar min-height-full overflow-x-auto overflow-y-auto border-2 rounded-md text-[#4a95c0]">
        <ClusterVisualization data={data} width={width} height={height} />
      </div>
    </>
  );
};

export default Home;
