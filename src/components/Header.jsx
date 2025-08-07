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
    <header className="bg-white shadow-sm border-b py-4 px-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Left */}
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold text-gray-900">FoodChow Demo India</h1>
          <p className="text-sm text-gray-600">📍 Surat, Gujarat, India</p>
        </div>

        {/* Center */}
        <div className="text-center">
          <p className="text-green-600 font-semibold text-sm">Restaurant Is Open</p>
          <p className="text-gray-600 text-xs">Timing - Open 24 Hours ⓘ</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <select className="border border-gray-300 text-sm rounded-full px-3 py-1">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="gu">Gujarati</option>
          </select>

          {/* Choose Service */}
          <button
            onClick={toggleServiceModal}
            className="border border-green-600 text-green-600 px-4 py-1.5 rounded-full text-sm hover:bg-green-50"
          >
            Choose Service
          </button>

          {/* Book Now */}
          <button
            onClick={toggleBookingModal}
            className="border border-green-600 text-green-600 px-4 py-1.5 rounded-full text-sm hover:bg-green-50"
          >
            Book Now
          </button>

          {/* Phone */}
          <a href="tel:+918849784382" className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-1.5 rounded-full text-sm hover:bg-green-50">
            📞 8849784382
          </a>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}

      {/* Choose Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Choose A Service</h2>
              <button
                onClick={() => setShowServiceModal(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {["Pick Up", "Dine In", "Delivery"].map((service) => (
                <div
                  key={service}
                  onClick={() => handleServiceSelect(service)}
                  className="flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                  <span className="text-2xl">
                    {service === "Pick Up"
                      ? "📦"
                      : service === "Dine In"
                      ? "🍽️"
                      : "🛵"}
                  </span>
                  <span className="text-sm mt-1">{service}</span>
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


