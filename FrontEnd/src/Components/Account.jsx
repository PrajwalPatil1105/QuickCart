import { useState, useEffect } from "react";
import {
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";

function Account() {
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userinfo");

    if (storedUserInfo) {
      try {
        setUserInfo(JSON.parse(storedUserInfo));
      } catch (error) {
        console.error("Failed to parse user info:", error);
        setUserInfo({
          name: "UserName",
          email: "ABC@gmail.com",
          password: "555@555",
        });
      }
    } else {
      setUserInfo({
        name: "UserName",
        email: "ABC@gmail.com",
        password: "555@555",
      });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div>
          <p className="text-xl font-bold text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", name: "Profile", icon: <FaUser /> },
    { id: "orders", name: "Order History", icon: <FaHistory /> },
  ];

  // I have creaked mock order history data here
  const orderHistory = [
    {
      id: "ORD-12345",
      date: "2025-04-01",
      total: 129.99,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-12344",
      date: "2025-03-15",
      total: 79.5,
      status: "Shipped",
      items: 2,
    },
    {
      id: "ORD-12343",
      date: "2025-02-28",
      total: 240.75,
      status: "Delivered",
      items: 4,
    },
  ];

  return (
    <div className="pb-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-400 mb-8">
        My Account
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-200 dark:bg-gray-700">
                {/* Default profile image */}
                <img
                  src="./Images/User.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{userInfo.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {userInfo.email}
              </p>
            </div>

            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}

              <button className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 rounded-lg transition-colors">
                <FaSignOutAlt className="mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-start mb-4">
                      <FaIdCard className="mt-1 mr-3 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Full Name
                        </p>
                        <p className="font-medium">{userInfo.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <FaEnvelope className="mt-1 mr-3 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Email Address
                        </p>
                        <p className="font-medium">{userInfo.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaPhone className="mt-1 mr-3 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Phone Number
                        </p>
                        <p className="font-medium">+91 9876543210</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="mt-1 mr-3 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Default Shipping Address
                        </p>
                        <p className="font-medium">123 Main Street</p>
                        <p className="text-gray-500 dark:text-gray-400">
                          Bangalore, Karnataka 560001
                          <br />
                          India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Order History</h2>

                {orderHistory.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">
                    You haven't placed any orders yet.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b dark:border-gray-700">
                          <th className="pb-3 text-left">Order ID</th>
                          <th className="pb-3 text-left">Date</th>
                          <th className="pb-3 text-left">Items</th>
                          <th className="pb-3 text-right">Total</th>
                          <th className="pb-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderHistory.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <td className="py-4">{order.id}</td>
                            <td className="py-4">{order.date}</td>
                            <td className="py-4">{order.items} items</td>
                            <td className="py-4 text-right">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="py-4 text-right">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
