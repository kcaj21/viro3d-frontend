import { useEffect, useState } from "react";
import { api_url } from "../utils/api";
import { NodeData } from "../types/nodedata";

type GraphData = {
  nodes: NodeData[]; // Adjust based on the structure of nodes
};

export function useGraphData() {
  const [data, setData] = useState<GraphData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${api_url}/api/graph_data/graph_data_decoded.json`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      }
    };

    fetchData();
  }, []);

  return { data };
}
