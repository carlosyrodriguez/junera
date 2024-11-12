"use client";
import Link from 'next/link';
import Button23 from './button23';
import { Button } from "@/components/ui/button"
const { useState } = require("react");
import {
    Info,
    BriefcaseBusiness,
  } from "lucide-react"
  
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Home } from 'lucide-react';
import { User } from 'lucide-react';
import { UserPlus } from 'lucide-react';

  export function DropdownMenuDemo() {
    const [open, setOpen] = useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
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
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-4 mt-3">
          <DropdownMenuGroup>
          <Link href="/">
          <DropdownMenuItem>
              <Home />
              <span>Home</span>
            </DropdownMenuItem>
            </Link>
            <Link href="/about">
          <DropdownMenuItem>
              <Info />
              <span>About</span>
            </DropdownMenuItem>
            </Link>
            <Link href="/job-postings">
            <DropdownMenuItem>
            <BriefcaseBusiness />
              <span>Job Postings</span>
            </DropdownMenuItem>
            </Link>
            <Link href="/login">
            <DropdownMenuItem>
            <User />
              <span>Login</span>
            </DropdownMenuItem>
            </Link>
            <Link href="/register">
            <DropdownMenuItem>
            <UserPlus />
              <span>Register</span>
            </DropdownMenuItem>
            </Link>
            </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
export default function Navbar() {
    return (
      <nav className="bg-background border-b border-muted-accent">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/">
            <span className="text-2xl">🌳</span>
            </Link>
            <span className="text-sm font-mono">junera</span>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <a href="/about" className="text-gray-700 hover:text-gray-900">About</a>
            <a href="/contact" className="text-gray-700 hover:text-gray-900">Contact</a>
          </div>
          <div className="md:hidden">
<DropdownMenuDemo />
          </div>
        </div>
      </nav>
    );
  }