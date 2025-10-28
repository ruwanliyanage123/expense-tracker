import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Categories from "./pages/Categories";

function App() {
  return (
      <BrowserRouter>
        <nav className="p-4 bg-gray-800 text-white flex gap-4">
          <Link to="/">Dashboard</Link>
          <Link to="/history">History</Link>
          <Link to="/categories">Categories</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
