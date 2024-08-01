import "./App.css";
import MolstarPlugin from "./components/MolstarPlugin";
import GenomeBrowser from "./components/GenomeBrowser";

function App() {
  return (
    <>
      <div className="AppContainer flex flex-col-1 ">
          <div className="MolstarContainer basis-2/6 my-12 mx-12  ">
          <MolstarPlugin modelUrl="https://alphafold.ebi.ac.uk/files/AF-Q5VSL9-F1-model_v4.pdb" />
          </div>     
          <div className="GenomeBroswerContainer basis-4/6">
            <GenomeBrowser />
          </div>
        </div>
    </>
  );
}



export default App;
