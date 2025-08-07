

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
