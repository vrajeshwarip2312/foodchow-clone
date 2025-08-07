import React, { useState } from "react";
import BookingModal from "./BookingModal";

const Header = () => {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowServiceModal(false);
    console.log("Service Selected:", service);
  };

  const toggleServiceModal = () => {
    setShowServiceModal(true);
    setShowBooking(false);
  };

  const toggleBookingModal = () => {
    setShowBooking(true);
    setShowServiceModal(false);
  };

  return (
    <header className="bg-white shadow-md p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Left Section */}
      <div className="text-center md:text-left">
        <h1 className="text-xl font-bold text-gray-800">FoodChow Demo India</h1>
        <p className="text-sm text-gray-600">📍 Surat, Gujarat, India</p>
      </div>

      {/* Center Section */}
      <div className="text-center">
        <p className="text-green-600 font-semibold">Restaurant Is Open</p>
        <p className="text-sm text-gray-600">Timing - Open 24 Hours ⓘ</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Language Selector */}
        <select className="border rounded px-2 py-1 text-sm">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="gu">Gujarati</option>
        </select>

        {/* Choose Service Button */}
        <button
          onClick={toggleServiceModal}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Choose Service
        </button>

        {/* Book Now Button */}
        <button
          onClick={toggleBookingModal}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
        >
          Book Now
        </button>

        {/* Phone */}
        <a
          href="tel:+918849784382"
          className="text-sm text-blue-500 underline"
        >
          📞 8849784382
        </a>
      </div>

      {/* Booking Modal */}
      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}

      {/* Choose Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Choose A Service</h2>
              <button
                onClick={() => setShowServiceModal(false)}
                className="text-gray-600 hover:text-black text-lg"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {["Pick Up", "Dine In", "Delivery"].map((service) => (
                <div
                  key={service}
                  onClick={() => handleServiceSelect(service)}
                  className="flex flex-col items-center p-2 cursor-pointer border rounded hover:bg-gray-100"
                >
                  <div className="text-2xl">
                    {service === "Pick Up"
                      ? "📦"
                      : service === "Dine In"
                      ? "🍽️"
                      : "🛵"}
                  </div>
                  <p className="text-sm">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
