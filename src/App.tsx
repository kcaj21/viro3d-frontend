import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import StructureIndex from "./pages/StructureIndex";
import Footer from "./components/ui/Footer";
import ProteinResultsPage from "./pages/ProteinResultsPage";
import VirusResultsPage from "./pages/VirusResultsPage";
import About from "./pages/About";

function App() {
  return (
    <>
      <main className="">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/resultspage/:filterParam/:searchParam"
            element={<VirusResultsPage />}
          ></Route>
          <Route
            path="/proteinresultspage/:filterParam/:searchParam"
            element={<ProteinResultsPage />}
          ></Route>
          <Route
            path="/structureindex/:filterParam/:searchParam"
            element={<StructureIndex />}
          ></Route>
        </Routes>
        <p className="fixed z-50 2xl:text-4xl lg:text-xl  text-[#b6b6b6] bottom-0 left-0 my-2 mx-4">
          Viro3D Beta
        </p>
        <Footer />
      </main>
    </>
  );
}

export default App;
