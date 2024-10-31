import { useEffect, useState } from "react";

export function useGraphData() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://viro3d-dev.cvr.gla.ac.uk/api/graph_data/graph_data_viruses_with_realm.json"
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