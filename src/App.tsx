import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Root from "./components/routes/Root";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
