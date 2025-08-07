import React, { useEffect, useState } from 'react';
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

  // Fetch categories
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

  // Fetch menu items
  useEffect(() => {
    if (selectedCategory) {
      const items = selectedCategory?.ItemListWidget || selectedCategory?.ItemList || [];
      const formattedItems = items.map((item) => ({
        ItemId: item.ItemId ?? item.MenuItemId ?? Math.random(),
        ItemName: item.ItemName,
        Price: item.Price ?? 0,
        Description: item.Description ?? "",
        ItemImage: item.ItemImage ?? "",
      }));
      setMenuItems(formattedItems);
    }
  }, [selectedCategory]);

  const handleAddToCart = (item) => {
    console.log("Added to cart:", item);
  };

  const filteredItems = menuItems.filter((item) =>
    item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <Header />

      {/* Main Layout Below Header */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/5 bg-gray-100 p-4 overflow-y-auto">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setSearchQuery("");
            }}
          />
        </aside>

        {/* Scrollable Menu Items */}
        <main className="flex-1 overflow-y-auto bg-white p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {selectedCategory?.CategryName || "Menu"}
            </h2>
            <input
              type="text"
              placeholder="🔍 Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
            <p className="text-center text-gray-500 text-lg">Loading menu...</p>
          ) : filteredItems.length === 0 ? (
            <p className="text-center text-red-500 font-medium">No items found for this category.</p>
          ) : (
            <div className="flex flex-col gap-4">
  {filteredItems.map((item) => (
    <MenuItemCard key={item.ItemId} item={item} onAdd={handleAddToCart} />
  ))}
</div>

          )}
        </main>

        {/* Cart (fixed height and scrollable if needed) */}
        <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
          <Cart />
        </aside>
      </div>

      {/* Footer (optional to show always or conditionally) */}
      <Footer />
    </div>
  );
}

export default App;


// function App() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch categories
//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((res) => {
//         const parsed = JSON.parse(res.data);
//         const categoryList = parsed.CategoryList || [];
//         setCategories(categoryList);
//         setSelectedCategory(categoryList[0]);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch categories", err);
//         setLoading(false);
//       });
//   }, []);

//   // Fetch menu items
//   useEffect(() => {
//     if (selectedCategory) {
//       const items = selectedCategory?.ItemListWidget || selectedCategory?.ItemList || [];
//       const formattedItems = items.map((item) => ({
//         ItemId: item.ItemId ?? item.MenuItemId ?? Math.random(),
//         ItemName: item.ItemName,
//         Price: item.Price ?? 0,
//         Description: item.Description ?? "",
//         ItemImage: item.ItemImage ?? "",
//       }));
//       setMenuItems(formattedItems);
//     }
//   }, [selectedCategory]);

//   const handleAddToCart = (item) => {
//     console.log("Added to cart:", item);
//   };

//   const filteredItems = menuItems.filter((item) =>
//     item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col lg:flex-row gap-4 px-4 md:px-8 py-6 bg-gray-100 min-h-screen">
//         {/* Sidebar */}
//         <div className="lg:w-1/5 w-full">
//           <Sidebar
//             categories={categories}
//             selectedCategory={selectedCategory}
//             onSelectCategory={(cat) => {
//               setSelectedCategory(cat);
//               setSearchQuery("");
//             }}
//           />
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 bg-white shadow-md rounded-xl p-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {selectedCategory?.CategryName || "Menu"}
//             </h2>
//             <input
//               type="text"
//               placeholder="🔍 Search dishes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {loading ? (
//             <p className="text-center text-gray-500 text-lg">Loading menu...</p>
//           ) : filteredItems.length === 0 ? (
//             <p className="text-center text-red-500 font-medium">No items found for this category.</p>
//           ) : (
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {filteredItems.map((item) => (
//                 <MenuItemCard key={item.ItemId} item={item} onAdd={handleAddToCart} />
//               ))}
//             </div>
//           )}
//         </main>

//         {/* Cart */}
//         <div className="lg:w-1/4 w-full">
//           <Cart />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default App;


