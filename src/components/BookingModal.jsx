import React, { useState } from "react";

const BookingModal = ({ onClose }) => {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [availableSlot, setAvailableSlot] = useState("");
  const [guests, setGuests] = useState("");

  const handleProceed = () => {
    if (!date || !timeSlot || !availableSlot || !guests) {
      alert("Please fill all fields");
      return;
    }

    console.log("Booking Details:", {
      date,
      timeSlot,
      availableSlot,
      guests,
    });

    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-600 hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Book A Table</h2>

        {/* Date & Time Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-center mb-3">Select Date & Time</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-lg">
            <div>
              <label className="block text-sm mb-1 font-medium">Select Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Time Slot</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>
        </div>

        {/* Slot & Guest Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-center mb-3">Slot & Guests</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-lg">
            <div>
              <label className="block text-sm mb-1 font-medium">Available Slot</label>
              <select
                value={availableSlot}
                onChange={(e) => setAvailableSlot(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Available Time</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="12:30 PM">12:30 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="6:30 PM">6:30 PM</option>
                <option value="9:00 PM">9:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">No. of Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select No of Guests</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BookingModal;

