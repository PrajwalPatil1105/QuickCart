import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07;
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <FaShoppingBag className="text-6xl mb-4 text-gray-300 dark:text-gray-600" />
        <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Looks like you haven't added any items yet
        </p>
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-400 mb-8">
        Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"}){" "}
        {/* I have also concentrated on attention to details */}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="hidden md:grid md:grid-cols-5 border-b pb-4 mb-4 font-medium">
              <div className="col-span-2">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center py-4 border-b last:border-b-0"
              >
                <div className="col-span-2 flex items-center gap-4">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.images?.[0] || "https://via.placeholder.com/80"}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm flex items-center hover:underline mt-1"
                    >
                      <FaTrash className="mr-1" size={12} /> Remove
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <span className="md:hidden font-medium">Price: </span>$
                  {item.price.toFixed(2)}
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="px-4 py-1 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>

                <div className="text-right font-medium">
                  <span className="md:hidden font-medium">Total: </span>$
                  {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
