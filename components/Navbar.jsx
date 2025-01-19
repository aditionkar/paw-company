"use client"; 
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true); 

  // Check login status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/users/check-auth");
        setIsLoggedIn(response.data.isLoggedIn); 
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false); 
      }
    };
    checkAuth(); 
  }, []);

  

  const logout = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("/api/users/logout");
      if (response.data.success) {
        setIsLoggedIn(false);  
        router.push("/login"); 
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="relative h-fit bg-[#B5C6FF] hidden md:flex items-center pb-3 pt-5 px-6">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <SlideTabs />
        </div>
        <div className="ml-auto flex gap-4">
          {isLoggedIn ? (
            <NavButton href="" onClick={logout}>
              Logout
            </NavButton>
          ) : (
            <>
              <NavButton href="/login">Log in</NavButton>
              <NavButton href="/signup">Sign up</NavButton>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="bg-[#B5C6FF] flex md:hidden items-center justify-end px-6 py-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="text-[#370EA3] focus:outline-none"
        >
          <div className="w-6 h-1 bg-[#370EA3] mb-1 rounded"></div>
          <div className="w-6 h-1 bg-[#370EA3] mb-1 rounded"></div>
          <div className="w-6 h-1 bg-[#370EA3] rounded"></div>
        </button>
      </nav>

      {/* Drawer */}
      {isDrawerOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed inset-0 z-50 bg-[#B5C6FF] flex flex-col items-center justify-center gap-6"
        >
          <button
            onClick={() => setDrawerOpen(false)}
            className="absolute top-5 right-5 text-[#370EA3] text-2xl font-bold"
          >
            ×
          </button>
          <DrawerLink href="/">Home</DrawerLink>
          <DrawerLink href="/petProfile">Profile</DrawerLink>
          <DrawerLink href="/track">Track</DrawerLink>
          <DrawerLink href="/book">Book</DrawerLink>
          {isLoggedIn ? (
            <DrawerLink href="" onClick={logout}>
              Logout
            </DrawerLink>
          ) : (
            <>
              <DrawerLink href="/login">Log in</DrawerLink>
              <DrawerLink href="/signup">Sign up</DrawerLink>
            </>
          )}
        </motion.div>
      )}
    </>
  );
}

const NavButton = ({ href, children, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-[#370EA3] text-sm font-semibold md:text-base"
  >
    {children}
  </Link>
);

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() =>
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }))
      }
      className="relative flex w-fit rounded-full gap-3 bg-[#370EA3] p-1 text-white"
    >
      <Tab setPosition={setPosition} href="/">
        Home
      </Tab>
      <Tab setPosition={setPosition} href="/petProfile">
        Profile
      </Tab>
      <Tab setPosition={setPosition} href="/track">
        Track
      </Tab>
      <Tab setPosition={setPosition} href="/book">
        Book
      </Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, href }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1 text-xs font-poppins text-white mix-blend-difference md:px-5 md:py-1 md:text-base"
    >
      <Link href={href} className="text-white">
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }) => (
  <motion.li
    animate={{
      ...position,
    }}
    className="absolute z-0 h-7 rounded-full bg-white md:h-8"
  />
);

const DrawerLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-[#370EA3] text-xl font-bold hover:text-[#370EA3]/80 transition duration-300 ease-in-out"
  >
    {children}
  </Link>
);

export default Navbar;
