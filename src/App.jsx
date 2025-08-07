import React, { useRef, useState, useEffect } from 'react';

import axios from 'axios';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MenuItemCard from "../src/components/MenuItemCard.jsx"
import './App.css';


const API_URL = "https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null";
function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
   const sectionRefs = useRef({});

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => {
        const parsed = JSON.parse(res.data);
        const categoryList = parsed.CategoryList || [];
        setCategories(categoryList);
        setSelectedCategory(categoryList[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        setLoading(false);
      });
  }, []);
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visibleEntries.length > 0) {
        const topMost = visibleEntries[0];
        const catId = topMost.target.id.split("-")[1];
        const newCat = categories.find((c) => c.CategryId.toString() === catId);
        if (newCat && newCat.CategryId !== selectedCategory?.CategryId) {
          setSelectedCategory(newCat);
        }
      }
    },
    {
      root: null,
      rootMargin: "0px 0px -60% 0px", // fire when top 40% of item enters viewport
      threshold: 0.1,
    }
  );

  Object.values(sectionRefs.current).forEach((section) => {
    if (section) observer.observe(section);
  });

  return () => observer.disconnect();
}, [categories, selectedCategory]);


  const handleAddToCart = (item) => {
    console.log("Added to cart:", item);
  };

  const filteredItems = menuItems.filter((item) =>
    item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())

  );

 
  const onSelectCategory = (cat) => {
    setSelectedCategory(cat);
    const section = sectionRefs.current[cat.CategryId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-[20%] bg-white border-r p-4 overflow-y-auto md:h-auto max-h-[100vh]">
          <h3 className="text-xl font-bold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat.CategryId}
                onClick={() => onSelectCategory(cat)}
                className={`cursor-pointer px-3 py-2 rounded transition-colors duration-200 ${
                  selectedCategory?.CategryId === cat.CategryId
                    ? "bg-green-600 text-white font-semibold"
                    : "text-gray-800 hover:bg-green-100"
                }`}
              >
                {cat.CategryName}
              </li>
            ))}
          </ul>
        </aside>

        <main className="w-full md:w-[60%] bg-white p-6 overflow-y-auto">
         <div className="w-full mb-6">
  <div className="flex items-center border border-green-600 rounded-full px-4 py-2 w-full">
    <input
      type="text"
      placeholder="Search for dishes"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="flex-grow outline-none text-gray-800 placeholder-gray-500 text-sm bg-transparent"
    />
    <svg
      className="w-5 h-5 text-green-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
      />
    </svg>
 
</div>


          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading menu...</p>
          ) : (
            <div className="grid gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.CategryId}
                  id={`category-${cat.CategryId}`}
                  ref={(el) => (sectionRefs.current[cat.CategryId] = el)}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {cat.CategryName}
                  </h3>
                  {(cat.ItemListWidget || []).filter((item) =>
                    item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((item) => (
                    <MenuItemCard
                      key={item.ItemId || item.MenuItemId}
                      item={{
                        ItemId: item.ItemId ?? item.MenuItemId ?? Math.random(),
                        ItemName: item.ItemName,
                        Price: item.Price ?? 0,
                        Description: item.Description ?? "",
                        ItemImage: item.ItemImage ?? ""
                      }}
                      onAdd={handleAddToCart}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </main>

        <aside className="w-full md:w-[20%] bg-gray-100 p-4 overflow-y-auto max-h-[100vh]">
          <Cart />
        </aside>
      </div>

      <Footer />
    </div>
  );
}

export default App;

