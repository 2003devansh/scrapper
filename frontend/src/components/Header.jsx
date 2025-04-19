import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="bg-black text-white shadow-md sticky top-0 z-50 p-4 border-b border-green-600"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Name */}
        <h1 className="text-2xl font-bold text-green-500 tracking-wide">
          ThreadVibe
        </h1>

        {/* Placeholder for future nav */}
        <nav className="hidden md:flex gap-6 text-sm text-orange-400">
          {/* <a href="#home">Home</a>
          <a href="#about">About</a> */}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
