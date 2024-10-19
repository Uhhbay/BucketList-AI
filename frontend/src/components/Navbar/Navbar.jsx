import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const links = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const navigate = useNavigate();

  const handleDashboard = () => {
    const isLoggedIn = localStorage.getItem('bucketlist-token');

    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }

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
                <button
                  key={index}
                  className={`text-4xl ${activeSection === link.name ? "text-sky-600" : "text-gray-800"} hover:text-sky-400`}
                  onClick={() => {
                    if (link.path === "/dashboard") {
                      handleDashboard();
                    } else {
                      setActiveSection(link.name);
                      navigate(link.path);

                    }
                    setIsOpen(false);
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div 
        className="flex items-center justify-between fixed top-0 left-0 h-16 w-full bg-white/70 backdrop-blur-sm shadow-md px-4 sm:px-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Link to="/" className="flex flex-col text-gray-800">
          <h1 className="text-xl font-bold">
            BucketList AI
          </h1>
          <h3 className="text-xs -mt-1">
            Powered by fetch.ai
          </h3>
        </Link>
        <button className="sm:hidden" onClick={toggleMenu}>
          <FontAwesomeIcon
            className={`w-6 h-6 transition ${isOpen ? "text-sky-600" : "text-gray-800"}`}
            icon={faBars} 
          />
        </button>
        <nav className="hidden sm:flex items-center">
          <ul className="flex space-x-3">
            {links.map((link) => (
              <motion.li key={link.path} className="relative">
                <button
                  className={`px-1 rounded-md ${
                    activeSection === link.name ? "text-sky-600 font-semibold" : "text-gray-800"
                  } hover:text-sky-400`}
                  onClick={(e) => {
                    if (link.path === "/dashboard") {
                      e.preventDefault();
                      handleDashboard();
                    } else {
                      setActiveSection(link.name);
                      navigate(link.path);
                    }
                  }}
                >
                  {link.name}
                  {link.name === activeSection && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}