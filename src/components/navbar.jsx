import Link from 'next/link';
import Button23 from './button23';
export default function Navbar() {
    return (
      <nav className="bg-white border-b border-gray-200">
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
            <Button23 />
          </div>
        </div>
      </nav>
    );
  }