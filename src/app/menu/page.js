'use client';

import SectionHeaders from "@/components/layout/SectionHeaders";
import { MenuItem } from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => setCategories(categories));
    });
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => setMenuItems(menuItems));
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Lowercase for case-insensitive search
  };

  const filteredMenuItems = menuItems.filter(item => {
    // Case-insensitive search on item name, description, and category name
    const searchText = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText) ||
      (categories.find(c => c._id === item.category) &&
        categories.find(c => c._id === item.category).name.toLowerCase().includes(searchText))
    );
  });

  return (
    <section className="mt-8">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search menu items(name, desc, category)..."
          className="text-gray-700 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleSearchChange}
        />
      </div>

      {categories?.length > 0 && categories.map(c => (
        <div key={c._id}>
          <div className="text-center">
            <SectionHeaders mainHeader={c.name} />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 mb-12">
            {filteredMenuItems.filter(m => m.category === c._id).map(item => (
              <MenuItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
