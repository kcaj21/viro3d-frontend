import React, { useState, useEffect } from "react";
import "./App.css";
import MolstarPlugin from "./components/MolstarPlugin";
import GenomeBrowser from "./components/GenomeBrowser";
import PdbeMolstar from "./components/PdbeMolstar";
import ProteinInfo from "./components/ProteinInfo";
import Navbar from "./components/Navbar";
import FeatureBrowser from "./components/FeatureBrowser";
import Footer from "./components/Footer";


function App() {

  return (
    <>
      <Navbar />
      
      <div className="IndexContainer mt-24 mx-12 flex min-h-screen flex-col gap-4  ">
      {/* <Searchbar /> */}
        <div className="GenomeBrowserContainer  ">
          <FeatureBrowser />
        </div>
        <div className='mt-12 mx-12 flex gap-48 flex-col-1 min-h-full '>
          <div className='basis-1/2 '>
                <PdbeMolstar />
          </div>
          <div className='basis-1/3 font-extralight'>
            <ProteinInfo />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}



export default App;
