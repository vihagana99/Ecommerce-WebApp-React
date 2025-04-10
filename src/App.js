import React from "react";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { Addproducts } from "./Components/Addproducts";
import { Cart } from "./Components/Cart";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addproducts" element={<Addproducts/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
