import { Routes, Route } from "react-router-dom"
import { Toaster as HotToaster } from "react-hot-toast"

import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Sectors from "./pages/Sectors"
import Roles from "./pages/Roles"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/roles" element={<Roles />} />
      </Routes>

      <HotToaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  )
}