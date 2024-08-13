import React, { useState, useEffect, Children } from "react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { products } from "../../assets/data/data";
import { SearchItems } from "./SearchItems";

export const Hero = ({children,setSelectedCategoryy,setTypesInSearch}) => {
  // search
  const [value, setValue] = useState("");
  const onChanage = (e) => {
    setValue(e.target.value);
    setTypesInSearch(value)
  };
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:3002/api/categories")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.nomtypeCatq);
    setSelectedCategoryy(category);
    setIsOpen(false);
  };

  const onSearch = (key) => {
    setValue(key);
    console.log("search", key);
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>
            <label>
              Over <span>6,500</span> Curated Design
            </label>
            <br />
            <label>
              Resources, <span>Graphic & Website </span> Templates
            </label>
          </h1>
          <p>High-quality Design Themes for personal or commercial use contains 6k+ items in 100 categories.</p>
          
          <div className="search">
          <div className="category-dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
              {selectedCategory}
            </div>
            {isOpen && (
              <ul className="dropdown-list">
                <li onClick={() => handleCategoryClick('All Categories')}>All Categories</li>
                {categories.map((category, index) => (
                  <li key={index} onClick={() => handleCategoryClick(category)}>
                    {category.nomtypeCatq}
                  </li>
                ))}
              </ul>
            )}
          </div>


            
            <input type="text" placeholder="Search Products..." onChange={onChanage} value={value} />
            <button onClick={() => onSearch(value)}>
              <BiSearch className="serachIcon heIcon" />
            </button>
          </div>

          <SearchItems products={products} value={value} onSearch={onSearch} />
        <div>
          <p>
            
          </p>
        </div>
        </div>
      </section>
      {children}
    </>
  );
};
