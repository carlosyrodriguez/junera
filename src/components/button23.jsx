"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Button23() {
    const [open, setOpen] = useState(false);
  
    return (
      <div className="relative">
        <Button
          className="group"
          variant="outline"
          size="icon"
          onClick={() => setOpen((prevState) => !prevState)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg
            className="pointer-events-none"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L20 12"
              className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
            />
            <path
              d="M4 12H20"
              className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
            />
            <path
              d="M4 12H20"
              className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
            />
          </svg>
        </Button>
  
{open && (
  <div className="absolute top-full mt-2 w-48 max-w-[90vw] bg-white shadow-md rounded-md right-0 sm:left-0">
    <ul className="flex flex-col p-2 gap-2">
      <li>
        <a href="#home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          Home
        </a>
      </li>
      <li>
        <a href="#about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          About
        </a>
      </li>
      <li>
        <a href="#contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          Contact
        </a>
      </li>
    </ul>
  </div>
)}

      </div>
    );
  }