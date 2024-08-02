import "./App.css";
import MolstarPlugin from "./components/MolstarPlugin";
import GenomeBrowser from "./components/GenomeBrowser";
import PdbeMolstar from "./components/PdbeMolstar";


function App() {
  return (
    <>
      <div className="AppContainer my-12 mx-12 flex min-h-screen flex-col gap-4 ">
        <div className="GenomeBroswerContainer ">
              <GenomeBrowser />
        </div>
        <div className='flex gap-12 flex-col-1 min-h-screen '>
          <div className='basis-2/3 '>
                <PdbeMolstar />
            </div>
          <div className='basis-1/3'>
            <h1 className='text-6xl mb-2'>info</h1>
            <p className='text-4xl'>GenbankID: 123</p>
            <p className='text-4xl'>TaxID: 55012</p>
            <p className='text-4xl'>Sequence: AAURKMGISUWCCJAORJFLLGH</p>
            <p className='text-4xl'>Protein Length: 41</p>
            <p className='text-4xl'>Genome Composition: dsRNA</p>
          </div>
        </div>
      </div>
    </>
  );
}



export default App;
