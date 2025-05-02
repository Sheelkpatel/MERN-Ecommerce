// src/components/Layout.jsx
import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
      >
        <ToastContainer />
        <SearchBar />
        {children}
      </motion.div>
      <Footer />
    </>
  );
};

export default Layout;
