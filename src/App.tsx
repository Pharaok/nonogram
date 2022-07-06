import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./components/routes/Root";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
