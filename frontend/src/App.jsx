// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";
import Wish from "./pages/Wish"
const App = () => {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  return (
    <>
      {/* Scroll Progress Bar */}
      

      {/* Animate Page Transitions */}
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/collection" element={<Layout><Collection /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/product/:productId" element={<Layout><Product /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/place-order" element={<Layout><PlaceOrder /></Layout>} />
          <Route path="/orders" element={<Layout><Orders /></Layout>} />
          <Route path="/wishlist" element={<Layout><Wish/></Layout>} />
          <Route path="/verify" element={<Layout><Verify /></Layout>} />
        </Routes>
      </AnimatePresence>
        
    </>
  );
};

export default App;
