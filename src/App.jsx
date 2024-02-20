import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Component from "./pages/Component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Component />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
