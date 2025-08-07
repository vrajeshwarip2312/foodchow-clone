
import React from "react";


const MenuItemCard = ({ item, onAdd }) => {
return (
<div className="border rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
<div>
<h4 className="text-xl font-semibold text-gray-800">{item.ItemName}</h4>
<p className="text-green-600 font-bold text-lg mt-1">₹{item.Price}</p>
</div>
<button
onClick={() => onAdd?.(item)}
className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
>
Add
</button>
</div>
);
};

export default MenuItemCard;

