import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Component from "./pages/Component";
import PdfToSummary from "./pages/PdfToSummary";
import Mindmap from "./pages/Mindmap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/pdf-to-summary" element={<PdfToSummary />} />
        <Route path="/mindmap" element={<Mindmap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
