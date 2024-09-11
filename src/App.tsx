import React, { useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import StructureIndex from "./pages/StructureIndex";
import Footer from "./components/ui/Footer";
import ResultsPage from "./pages/ResultsPage";
import FeatureBrowserContainer from "./components/FeatureBrowserContainer";

function App() {

  const [filterParam, setFilterParam] = useState("");
  const [searchParam, setSearchParam] = useState("");

  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container mt-36 my-auto mx-auto">
          {filterParam === "virus_name" ? (
            <FeatureBrowserContainer
              filterParam={filterParam}
              searchParam={searchParam}
            />
          ) : null}
          <Routes>
            <Route path="/" element={<Home setFilterParam={setFilterParam} setSearchParam={setSearchParam} />} />
            <Route
              path="/structureindex/:virus_name/:recordID"
              element={<StructureIndex />}
            />
            <Route
              path="/resultspage/:filterParam/:searchParam"
              element={<ResultsPage setSearchParam={setSearchParam} setFilterParam={setFilterParam} />}
            />
          </Routes>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
