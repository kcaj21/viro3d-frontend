import "./App.css";
import MolstarPlugin from "./components/MolstarPlugin";
import GenomeBrowser from "./components/GenomeBrowser";
import PdbeMolstar from "./components/PdbeMolstar";
import ProteinInfo from "./components/ProteinInfo";
import Navbar from "./components/Navbar";
import FeatureBrowser from "./components/FeatureBrowser";





function App() {
  return (
    <>
      <Navbar />
      <div className="IndexContainer my-24 mx-12 flex min-h-screen flex-col gap-4  ">
        <div className="GenomeBrowserContainer  ">
              <FeatureBrowser />
        </div>
        <div className='my-12 mx-12 flex gap-48 flex-col-1 min-h-full '>
          <div className='basis-1/2 '>
                <PdbeMolstar />
          </div>
          <div className='basis-1/3 font-extralight'>
            <ProteinInfo />
          </div>
        </div>
      </div>
    </>
  );
}



export default App;
