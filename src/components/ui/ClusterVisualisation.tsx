import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ForceGraph2D } from "react-force-graph";
import LoadingSpinner from "./LoadingSpinner";

const ClusterVisualisation = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_URL' with the actual URL of your JSON file
        const response = await fetch(
          "http://viro3d-dev.cvr.gla.ac.uk/api/graph_data/graph_data.json"
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

  const navigate = useNavigate();
  const handleNodeClick = (e) => {
    // navigate(
    //   `/structureindex/human%20parainfluenza%20virus%203/ABY47605.1_8839`
    // );
    console.log(e)
  };

  if (data === null) {
    return (
      <div className="cluster-container flex flex-col items-center h-screen justify-center">
        <h2 className="mb-12 text-5xl text-slate-500">Loading...</h2>
        <LoadingSpinner size={"5"} />
      </div>
    );
  }

  return (
    <div>
      <ForceGraph2D graphData={data} onNodeClick={(e)=>window.open(`/structureindex/${e['Virus name(s)']}/${e.id}`,'_blank', 'rel=noopener noreferrer')} nodeAutoColorBy={d => d['Virus name(s)']} />
    </div>
  );
};

export default ClusterVisualisation;
