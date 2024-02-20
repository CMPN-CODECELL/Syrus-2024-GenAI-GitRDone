import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Component from "./pages/Component";
import PdfToSummary from "./pages/PdfToSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/pdf-to-summary" element={<PdfToSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
