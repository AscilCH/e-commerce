import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Heading } from "../../common/Heading";

export const TopProduct = () => {


  const [openImage, setOpenImage] = useState(false);
  const [img, setImg] = useState("");
  const onOpenImage = (src) => {
    setImg(src);
    setOpenImage(true);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:3002/api/categories");
        const data = await response.json();

        const transformedCategories = data.map((category) => ({
          id: category._id,
          name: category.nomtypeCatq,
          image: category.imagecategorie,
        }));

        setCategories(transformedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      <section className="topproduct">
        <div className="container">
          <Heading title="Our Categories" desc="Here are the most demanded categories" />
          <div className="product_items">
            {categories.map((category) => (
              <div className="box" key={category.id}>
                <div className="img">
                  <img src={category.image} alt="" />
                </div>
                <div className="details">
                  <h3>{category.name}</h3>
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
        </div>
      </section>
    </>
  );
};
