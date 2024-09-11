import React, { useEffect } from "react";
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

const Home: React.FC = ({setSearchParam, setFilterParam}) => {

  useEffect(() => {
    setSearchParam('')
    setFilterParam('')
  }, []);

  return (
    <>
      <div className="min-h-screen text-[#4a95c0]">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          height="3em"
          width="3m"
        >
          <path d="M3 6 H21 A1 1 0 0 1 22 7 V13 A1 1 0 0 1 21 14 H3 A1 1 0 0 1 2 13 V7 A1 1 0 0 1 3 6 z" />
          <path d="M17 14v7M7 14v7M17 3v3M7 3v3M10 14L2.3 6.3M14 6l7.7 7.7M8 6l8 8" />
        </svg>
        <p className="text-slate-500 text-3xl">Homepage under construction</p>
      </div>
    </>
  );
};

export default Home;
