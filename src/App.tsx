import "./App.css";
import MolstarPlugin from "./components/MolstarPlugin";
import GenomeBrowser from "./components/GenomeBrowser";

function App() {
  return (
    <>
      <div className="AppContainer flex flex-col-2">
          <div className="MolstarContainer w-3/6">
          <MolstarPlugin modelUrl="https://alphafold.ebi.ac.uk/files/AF-Q5VSL9-F1-model_v4.pdb" />
          </div>     
          <div className="GenomeBroswerContainer w-2">
            <GenomeBrowser />
          </div>
        </div>
    </>
  );
}

export default App;
