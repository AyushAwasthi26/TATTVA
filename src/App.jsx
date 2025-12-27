import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About"; // You'll create this next

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Main Tool Page */}
        <Route path="/" element={<Home />} />
        
        {/* The About / Mission Page */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}