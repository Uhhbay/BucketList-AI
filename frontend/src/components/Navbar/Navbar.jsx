import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

const links = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVars = {
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] } },
    exit: { scaleY: 0, transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <header className="z-[999] relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="origin-top fixed left-0 top-16 w-full h-screen sm:hidden bg-white text-gray-800 pb-20"
          >
            <div className="flex flex-col h-full justify-center items-center gap-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`text-4xl ${activeSection === link.name ? "text-blue-600" : "text-gray-800"} hover:text-blue-400`}
                  onClick={() => {
                    setActiveSection(link.name);
                    setIsOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div 
        className="flex items-center justify-between fixed top-0 left-0 h-16 w-full bg-white shadow-md px-4 sm:px-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Link to="/" className="flex items-center text-xl font-bold text-gray-800">
          BucketList AI
        </Link>
        <button className="sm:hidden" onClick={toggleMenu}>
          <FontAwesomeIcon
            className={`w-6 h-6 transition ${isOpen ? "text-blue-600" : "text-gray-800"}`}
            icon={faBars} 
          />
        </button>
        <nav className="hidden sm:flex items-center">
          <ul className="flex space-x-4">
            {links.map((link) => (
              <motion.li key={link.path} className="relative">
                <Link
                  to={link.path}
                  className={`px-3 py-2 rounded-md ${
                    activeSection === link.name ? "text-blue-600 font-semibold" : "text-gray-800"
                  } hover:text-blue-400`}
                  onClick={() => setActiveSection(link.name)}
                >
                  {link.name}
                  {link.name === activeSection && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="hidden sm:block">
          {isLoggedIn ? (
            <Link to="/profile" className="text-gray-800 hover:text-blue-600">
              <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
            </Link>
          ) : (
            <Link to="/login" className="px-4 text-sm font-medium py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-400 ease-in duration-100">
              Login
            </Link>
          )}
        </div>
      </motion.div>
    </header>
  );
}