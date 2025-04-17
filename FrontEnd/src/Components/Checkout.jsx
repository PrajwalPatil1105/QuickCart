import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";
import Confetti from "react-confetti";
import ConfettiExplosion from "react-confetti-explosion";

function Checkout({ cartItems, clearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "India",
    paymentMethod: "creditCard",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07;
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  {
    /*Here is have checked input validation */
  }
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.zipCode) errors.zipCode = "ZIP code is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setOrderComplete(true);
        clearCart();

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 6000);
      }, 1500);
    } else {
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const paymentMethods = [
    { id: "creditCard", name: "Credit Card", icon: <FaCreditCard /> },
    { id: "paypal", name: "PayPal", icon: <FaPaypal /> },
    { id: "applePay", name: "Apple Pay", icon: <FaApplePay /> },
    { id: "googlePay", name: "Google Pay", icon: <FaGooglePay /> },
  ];

  {
    /*Celebration animation for best user interface */
  }
  if (orderComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Confetti numberOfPieces={600} />

        <div className="resultOverlay">
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 1010,
            }}
          >
            <ConfettiExplosion
              width={window.innerWidth / 2}
              height={window.innerHeight}
              numberOfPieces={1500}
              recycle={false}
              gravity={0.3}
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: 1010,
            }}
          >
            <ConfettiExplosion
              width={window.innerWidth / 2}
              height={window.innerHeight}
              numberOfPieces={500}
              recycle={false}
              gravity={0.3}
            />
          </div>
        </div>

        <div className="text-green-500 mb-4">
          <FaCheckCircle size={64} />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Thank You for Your Order!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          Your order has been placed successfully. We'll send you a confirmation
          email shortly.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-medium mb-4 text-gray-900 dark:text-white">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/dasboard")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-400 mb-4">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-gray-800 dark:text-gray-200">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white ${
                      formErrors.firstName ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {formErrors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-gray-800 dark:text-gray-200">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white ${
                      formErrors.lastName ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {formErrors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-gray-800 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white ${
                      formErrors.email ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-gray-800 dark:text-gray-200">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white ${
                      formErrors.phone ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Shipping Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-800 dark:text-gray-200">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white ${
                      formErrors.address ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {formErrors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1 text-gray-800 dark:text-gray-200">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white ${
                        formErrors.city ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-sm mt-1 error-message">
                        {formErrors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-gray-800 dark:text-gray-200">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white ${
                        formErrors.zipCode ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.zipCode && (
                      <p className="text-red-500 text-sm mt-1 error-message">
                        {formErrors.zipCode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-gray-800 dark:text-gray-200">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Payment Method
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {paymentMethods.map((method) => (
                  <div key={method.id}>
                    <label
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.paymentMethod === method.id
                          ? "bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span
                        className={`text-2xl mb-2 ${
                          formData.paymentMethod === method.id
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      >
                        {method.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {method.name}
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              {formData.paymentMethod === "creditCard" && (
                <div className="space-y-4 mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <label className="block mb-1 text-gray-800 dark:text-gray-200">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-600 dark:border-gray-500 text-gray-800 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-gray-800 dark:text-gray-200">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-600 dark:border-gray-500 text-gray-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-gray-800 dark:text-gray-200">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-600 dark:border-gray-500 text-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Order Summary
            </h2>

            <div className="max-h-56 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center py-3 border-b last:border-b-0"
                >
                  <div className="w-16 h-16 mr-4">
                    <img
                      src={item.images?.[0] || "https://via.placeholder.com/64"}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium line-clamp-1 text-gray-800 dark:text-gray-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-800 dark:text-gray-200">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-800 dark:text-gray-200">
                <span>Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-800 dark:text-gray-200">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`block w-full py-3 text-white text-center rounded-lg transition-colors ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  Processing...
                </span>
              ) : (
                "Confirm Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
