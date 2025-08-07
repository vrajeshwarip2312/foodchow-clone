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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">Book A Table</h2>

        {/* Date and Time */}
        <div className="mb-6">
          <h3 className="font-semibold text-center mb-2">Select Date & Time</h3>
          <div className="grid grid-cols-2 gap-4 border p-4 rounded-md">
            <div>
              <label className="block text-sm font-medium mb-1">Select Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Time Slot</label>
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

        {/* Slots & Guests */}
        <div className="mb-6">
          <h3 className="font-semibold text-center mb-2">Select Slots & No. Of Guests</h3>
          <div className="grid grid-cols-2 gap-4 border p-4 rounded-md">
            <div>
              <label className="block text-sm font-medium mb-1">Available Slot</label>
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
              <label className="block text-sm font-medium mb-1">No Of Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select No of Guests</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          className="w-full bg-green-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-green-700"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
