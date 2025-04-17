import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

function Navbar({ cartItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function Logout() {
    if (confirm("You want to logout?")) {
      toast.success("Logout Successfull");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md dark:bg-gray-800"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              QuickCart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className={`font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                location.pathname === "/dashboard"
                  ? "text-blue-600 dark:text-blue-400"
                  : ""
              }`}
            >
              Home
            </Link>
            <button
              className={`font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                location.pathname === "/products"
                  ? "text-blue-600 dark:text-blue-400"
                  : ""
              }`}
              onClick={Logout}
            >
              Log out
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 mr-12">
            <Link
              to="/account"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaUser />
            </Link>

            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative "
            >
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2 space-y-2 bg-gray-50 dark:bg-gray-900">
          <Link
            to="/"
            className={`block py-2 ${
              location.pathname === "/"
                ? "text-blue-600 dark:text-blue-400"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`block py-2 ${
              location.pathname === "/products"
                ? "text-blue-600 dark:text-blue-400"
                : ""
            }`}
          >
            Products
          </Link>
          <Link
            to="/contact"
            className={`block py-2 ${
              location.pathname === "/contact"
                ? "text-blue-600 dark:text-blue-400"
                : ""
            }`}
          >
            Contact
          </Link>
          <hr className="border-gray-200 dark:border-gray-700" />
          <Link to="/account" className="flex items-center py-2">
            <FaUser className="mr-3" /> My Account
          </Link>
          <Link to="/cart" className="flex items-center py-2">
            <FaShoppingCart className="mr-3" /> Cart ({totalItems})
          </Link>
          <div className="pt-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
        <Toaster
          position="top-right" // Positions the toast at the top-right corner
          toastOptions={{
            style: {
              zIndex: 9999, // Ensures it appears above other elements
              color: "#aaa",
              backgroundColor: "transparent",
              border: "2px solid #aaa",
              fontFamily: "Poppins",
              fontSize: "0.8em",
              fontWeight: "400",
            },
          }}
        />
      </div>
    </header>
  );
}

export default Navbar;
