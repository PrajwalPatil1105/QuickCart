import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaShoppingCart, FaTimes, FaStar } from "react-icons/fa";

function Dashboard({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const modalRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category?.name)),
        ].filter(Boolean);
        setCategories(uniqueCategories);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category?.name === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div>
          <p className="text-xl font-bold text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">Error!</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-400">
          Products
        </h1>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/*Here I have applied catigory Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Sorting is done here */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="default">Default Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium">No products found</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try changing your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/300"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                    {product.category?.name === "Updated Category Name"
                      ? "Wearable"
                      : product.category?.name}
                  </span>
                </div>
                <h3 className="font-medium text-lg mb-1 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 text-sm">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* This is popup modal to show product data */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleClickOutside}
        >
          <div
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaTimes size={24} />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6">
                <div className="h-80 overflow-hidden rounded-lg mb-4">
                  <img
                    src={
                      selectedProduct.images?.[0] ||
                      "https://via.placeholder.com/500"
                    }
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto py-2">
                  {selectedProduct.images?.map((img, idx) => (
                    <div key={idx} className="w-20 h-20 flex-shrink-0">
                      <img
                        src={img}
                        alt={`${selectedProduct.title} view ${idx + 1}`}
                        className="w-full h-full object-cover rounded border-2 border-transparent hover:border-blue-500 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:w-1/2 p-6">
                <span className="inline-block px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-3">
                  {selectedProduct.category?.name || "Uncategorized"}
                </span>
                <h2 className="text-2xl font-bold mb-2">
                  {selectedProduct.title}
                </h2>

                <div className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                  ${selectedProduct.price.toFixed(2)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedProduct.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(selectedProduct);
                    closeModal();
                  }}
                  className="flex items-center justify-center w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
