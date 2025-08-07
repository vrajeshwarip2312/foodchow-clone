
// import React from "react";


// const MenuItemCard = ({ item, onAdd }) => {
// return (
// <div className="border rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
// <div>
// <h4 className="text-xl font-semibold text-gray-800">{item.ItemName}</h4>
// <p className="text-green-600 font-bold text-lg mt-1">₹{item.Price}</p>
// </div>
// <button
// onClick={() => onAdd?.(item)}
// className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
// >
// Add
// </button>
// </div>
// );
// };

// export default MenuItemCard;

import React from "react";

const MenuItemCard = ({ item, onAdd }) => {
  return (
    <div className="flex items-center justify-between border-b py-4 px-2">
      {/* Item Info */}
      <div>
        <h4 className="text-base font-semibold text-gray-900">{item.ItemName}</h4>
        <p className="text-green-600 font-medium text-sm mt-1">Rs.{item.Price}.00</p>
      </div>

      {/* Add Button */}
      <button
        onClick={() => onAdd?.(item)}
        className="border border-green-600 text-green-600 rounded-full px-5 py-1 text-sm font-medium hover:bg-green-600 hover:text-white transition-colors duration-200"
      >
        Add
      </button>
    </div>
  );
};

export default MenuItemCard;
