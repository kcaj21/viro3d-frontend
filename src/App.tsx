import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import StructureIndex from "./pages/StructureIndex";
import Footer from "./components/ui/Footer";
import ProteinResultsPage from "./pages/ProteinResultsPage";
import VirusResultsPage from "./pages/VirusResultsPage";
import Test from "./pages/Test";

function App() {
  return (
    <>
      <main className="flex flex-col">
        <Navbar />

          <Routes>
            <Route path="/" element={<Home />}></Route>
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

        <Footer />
      </main>
    </>
  );
}

export default App;
