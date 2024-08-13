import React, { useState, useEffect } from "react";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ADD } from "../../../controller/action";

export const ProductItems = ({ category, typesInSearch }) => {
  const dispatch = useDispatch();

  const addToCart = (e) => {
    dispatch(ADD(e));
  };
  if (category) {
    console.log(category._id)
  }
  const [openImage, setOpenImage] = useState(false);
  const [img, setImg] = useState("");
  const onOpenImage = (src) => {
    setImg(src);
    setOpenImage(true);
  };

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch data from the API and transform it into the desired structure
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3002/api/produits");
        const data = await response.json();
  
        // Apply filters based on category and search
        let filteredProducts = data;
        if (category && category !== "All Categories") {
          filteredProducts = filteredProducts.filter(
            (item) => item.categorieID === category._id
          );
        }
        if (typesInSearch.length>1 ) {
          filteredProducts = filteredProducts.filter((item) =>
            item.nomProd.toLowerCase().includes(typesInSearch.toLowerCase())
          );
        }
  
        // Update the filteredProducts state
        setProducts(filteredProducts.map((item) => ({
          id: item.refProd,
          cover: item.imgProd,
          title: item.nomProd,
          author: item.descrpProd,
          price: item.prixProd,
          category: item.categorieID,
          qty: item.quantProd,
          status: item.statusProd,
          videoId: item.vidProd,
          marqueId: item.marqueID,
          // Add more attributes here as needed
        })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, [category, typesInSearch]);
  

  return (
    <>
      <div className="product_items">
        {products.map((items) => (
          <div className="box" key={items.id}>
            <div className="img">
              <img src={items.cover} alt="" />
              <div className="overlay">
                <button className="button" onClick={() => addToCart(items)}>
                  <FiShoppingBag />
                </button>
                <button className="button">
                  <AiOutlineHeart />
                </button>
                <button
                  className="button"
                  onClick={() => onOpenImage(items.cover)}
                >
                  <FiSearch />
                </button>
              </div>
            </div>
            <div className="details">
              <h3>{items.title}</h3>
              <p>{items.author}</p>
              <h4>${items.price}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className={openImage ? "modelOpen" : "modelClose"}>
        <div className="onClickImage">
          <img src={img} alt="" />
          <button className="button" onClick={() => setOpenImage(false)}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    </>
  );
};
