import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import styles from "../Styles/Header.module.css";

const Header = () => {
  const { darkMode, toggleDarkMode, cart, user, logout } =
    useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  // Calculate total items in cart
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className={`${styles.header} ${darkMode ? styles.darkMode : ""} ${
        isScrolled ? styles.scrolled : ""
      }`}
    >
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            ShopEasy
          </Link>
        </div>

        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
        </div>

        <nav
          className={`${styles.navigation} ${isMenuOpen ? styles.active : ""}`}
        >
          <ul className={styles.navLinks}>
            <li>
              <Link to="/" onClick={closeMenu} className={styles.navLink}>
                Home
              </Link>
            </li>
            <li className={styles.categoryDropdown}>
              <span className={styles.navLink}>Categories</span>
              <div className={styles.dropdownContent}>
                <Link to="/?category=clothes" onClick={closeMenu}>
                  Clothes
                </Link>
                <Link to="/?category=electronics" onClick={closeMenu}>
                  Electronics
                </Link>
                <Link to="/?category=furniture" onClick={closeMenu}>
                  Furniture
                </Link>
              </div>
            </li>
            <li>
              <Link to="/cart" onClick={closeMenu} className={styles.navLink}>
                Cart{" "}
                {cartItemsCount > 0 && (
                  <span className={styles.cartBadge}>{cartItemsCount}</span>
                )}
              </Link>
            </li>
            {user ? (
              <li className={styles.userDropdown}>
                <span className={styles.navLink}>{user.name || "Account"}</span>
                <div className={styles.dropdownContent}>
                  <Link to="/account" onClick={closeMenu}>
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={styles.logoutButton}
                  >
                    Log Out
                  </button>
                </div>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={styles.navLink}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <button
            className={styles.darkModeToggle}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <Link to="/cart" className={styles.cartIcon}>
            🛒
            {cartItemsCount > 0 && (
              <span className={styles.cartBadge}>{cartItemsCount}</span>
            )}
          </Link>

          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
