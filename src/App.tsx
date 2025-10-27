import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Research from "./pages/Research";
import Contact from "./pages/Contact";

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname || "/";

    function nameFromPath(p: string) {
      if (p === "/") return "Home";
      const parts = p.split("/").filter(Boolean);
      const last = parts[parts.length - 1] || "";
      // replace dashes with spaces and capitalize words
      return last
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }

    const pageName = nameFromPath(path);
    document.title = `WOA -> ${pageName}`;
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <TitleUpdater />

      <nav className="flex justify-center gap-6 py-4 bg-white shadow-md opacity-0">
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
        <Route path="*" element={<h1 className="text-center text-4xl mt-20">404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
