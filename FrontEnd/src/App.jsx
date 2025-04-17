import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Account from "./Components/Account";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import toast, { Toaster } from "react-hot-toast";
import { FaMoon, FaSun } from "react-icons/fa";

function MainLayout({ children, darkMode, toggleDarkMode, cartItems }) {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/";

  return (
    <div
      className={`min-h-screen font-poppins ${
        darkMode ? "dark bg-gray-900 text-gray-400" : "bg-white text-white"
      }`}
    >
      {!isAuthPage && <Navbar cartItems={cartItems} />}

      {!isAuthPage && (
        <button
          onClick={toggleDarkMode}
          className="fixed bottom-5 right-5 p-3 rounded-full bg-blue-500 text-white shadow-lg z-50"
        >
          {darkMode ? (
            <FaSun className="text-xl" />
          ) : (
            <FaMoon className="text-xl" />
          )}
        </button>
      )}

      <div className={!isAuthPage ? "container mx-auto px-4 pt-20 pb-10" : ""}>
        {children}
      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            zIndex: 9999,
            color: "white",
            backgroundColor: "gray",
            border: "3px solid white",
            fontFamily: "Poppins",
            fontSize: "0.8em",
            fontWeight: "400",
          },
        }}
      />
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : true;
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      toast.success("Item added to cart");
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <MainLayout
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        cartItems={cartItems}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route
            path="/dashboard"
            element={<Dashboard addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cartItems={cartItems} clearCart={clearCart} />}
          />
          <Route path="/account" element={<Account />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
