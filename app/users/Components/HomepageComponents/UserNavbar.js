'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP NAVBAR */}
        <div className="flex justify-between items-center h-16">

          {/* LEFT - LOGO */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Alvionz
            </Link>
          </div>

          {/* CENTER - NAVIGATION */}
          <div className="flex-1 hidden md:flex justify-center items-center space-x-8">
            <NavLink href="/" active>Home</NavLink>

            <DropdownMenu title="Shop">
              <DropdownItem href="/shop/all">All Products</DropdownItem>
              <DropdownItem href="/shop/new">New Arrivals</DropdownItem>
              <DropdownItem href="/shop/featured">Featured</DropdownItem>
            </DropdownMenu>

            <DropdownMenu title="Products">
              <DropdownItem href="/products/electronics">Electronics</DropdownItem>
              <DropdownItem href="/products/fashion">Fashion</DropdownItem>
              <DropdownItem href="/products/home">Home & Garden</DropdownItem>
              <DropdownItem href="/products/sports">Sports</DropdownItem>
            </DropdownMenu>

            <DropdownMenu title="Blogs">
              <DropdownItem href="/blog/tech">Tech Blog</DropdownItem>
              <DropdownItem href="/blog/lifestyle">Lifestyle</DropdownItem>
              <DropdownItem href="/blog/news">News</DropdownItem>
            </DropdownMenu>
          </div>

          {/* RIGHT - SESSION BUTTONS */}
          <div className="flex-1 flex justify-end space-x-4">
            {session ? (
              <div className="flex items-center space-x-3">
                <span className="hidden sm:block text-sm text-gray-700">
                  Welcome, {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE NAV MENU */}
        {isMenuOpen && <MobileMenu />}
      </div>
    </nav>
  );
};

/* -------------------------------
   DESKTOP COMPONENTS
--------------------------------*/

function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`font-medium transition-colors duration-200 ${
        active ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
      }`}
    >
      {children}
    </Link>
  );
}

function DropdownMenu({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center font-medium text-gray-700 hover:text-blue-600">
        {title}
        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 z-50">
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ href, children }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    >
      {children}
    </Link>
  );
}

/* -------------------------------
   MOBILE COMPONENTS
--------------------------------*/

function MobileMenu() {
  return (
    <div className="md:hidden py-4 border-t border-gray-200">
      <div className="flex flex-col space-y-3">
        <MobileNavLink href="/" active>Home</MobileNavLink>

        <MobileDropdown title="Shop">
          <MobileDropdownItem href="/shop/all">All Products</MobileDropdownItem>
          <MobileDropdownItem href="/shop/new">New Arrivals</MobileDropdownItem>
          <MobileDropdownItem href="/shop/featured">Featured</MobileDropdownItem>
        </MobileDropdown>

        <MobileDropdown title="Products">
          <MobileDropdownItem href="/products/electronics">Electronics</MobileDropdownItem>
          <MobileDropdownItem href="/products/fashion">Fashion</MobileDropdownItem>
          <MobileDropdownItem href="/products/home">Home & Garden</MobileDropdownItem>
          <MobileDropdownItem href="/products/sports">Sports</MobileDropdownItem>
        </MobileDropdown>

        <MobileDropdown title="Blogs">
          <MobileDropdownItem href="/blog/tech">Tech Blog</MobileDropdownItem>
          <MobileDropdownItem href="/blog/lifestyle">Lifestyle</MobileDropdownItem>
          <MobileDropdownItem href="/blog/news">News</MobileDropdownItem>
        </MobileDropdown>
      </div>
    </div>
  );
}

function MobileNavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`font-medium py-2 px-4 rounded-lg ${
        active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileDropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 pb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full font-medium text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100"
      >
        {title}
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && <div className="ml-4 mt-2 space-y-2">{children}</div>}
    </div>
  );
}

function MobileDropdownItem({ href, children }) {
  return (
    <Link
      href={href}
      className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
    >
      {children}
    </Link>
  );
}

export default UserNavbar;
