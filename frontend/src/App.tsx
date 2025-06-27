// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Stats } from "./pages/Stats";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Shorten</Link> | <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

