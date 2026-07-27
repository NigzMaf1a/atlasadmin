import { Routes, Route } from "react-router-dom";

//pages
import Home from "../pages/Home";
import About from "../pages/About";


export default function Navigation() {
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
    </Routes>
}
