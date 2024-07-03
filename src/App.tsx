// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
// import Counter from "./components/Counter";
import MolstarPlugin from './components/MolstarPlugin';


function App() {
  return (
    <>
        <h1>Molecular Structure Viewer</h1>
        <MolstarPlugin modelUrl="https://files.rcsb.org/download/3PTB.pdb" />
    </>
  );
}

export default App;
