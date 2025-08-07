import React from "react";

const Sidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h3 className="text-lg font-bold mb-4">Categories</h3>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.CategryId}
            onClick={() => onSelectCategory(cat)}
            className={`cursor-pointer px-3 py-2 rounded hover:bg-green-100 ${
              selectedCategory?.CategryId === cat.CategryId
                ? "bg-green-600 text-white font-semibold"
                : "text-gray-800"
            }`}
          >
            {cat.CategryName}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
