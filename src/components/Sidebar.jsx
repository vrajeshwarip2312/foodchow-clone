import React, { useEffect, useRef } from "react";

const Sidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  const categoryRefs = useRef({});

  useEffect(() => {
    if (
      selectedCategory &&
      categoryRefs.current[selectedCategory.CategryId]
    ) {
      const el = categoryRefs.current[selectedCategory.CategryId];
      const offsetTop = el.offsetTop;
      const sidebar = el.parentElement?.parentElement;

      if (sidebar && offsetTop !== undefined) {
        // Scroll manually to exact position
        sidebar.scrollTo({
          top: offsetTop - 60, // adjust based on your design
          behavior: "smooth",
        });
      }
    }
  }, [selectedCategory]);

  return (
    <aside className="w-64 h-screen overflow-y-auto bg-white border-r p-4 hidden sm:block">
      <h3 className="text-lg font-bold mb-4">Categories</h3>
      <ul className="space-y-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory?.CategryId === cat.CategryId;
          return (
            <li
              key={cat.CategryId}
              ref={(el) => (categoryRefs.current[cat.CategryId] = el)}
              onClick={() => onSelectCategory(cat)}
              className={`cursor-pointer px-3 py-2 rounded-md text-sm ${
                isSelected
                  ? "bg-green-600 text-white border-l-4 border-green-800"
                  : "hover:bg-green-100 text-gray-800"
              }`}
            >
              {cat.CategryName}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
