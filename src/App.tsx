import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Research from "./pages/Research";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <nav className="flex justify-center gap-6 py-4 bg-white shadow-md">
        <Link to="/" className="text-gray-700 hover:text-black font-medium">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-black font-medium">About</Link>
        <Link to="/research" className="text-gray-700 hover:text-black font-medium">Research</Link>
        <Link to="/contact" className="text-gray-700 hover:text-black font-medium">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
