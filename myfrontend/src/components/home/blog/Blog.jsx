import React, { useState, useEffect } from "react";
import { blog } from "../../assets/data/data"
import { Heading } from "../../common/Heading"
import axios from 'axios';
export const Blog = () => {
  const [marques, setMarques] = useState([]); // New state for marques

  useEffect(() => {
    axios.get("http://localhost:3002/api/marques")
      .then(response => {
        setMarques(response.data);
      })
    }, []);
   
  return (
    <>
<section className='blog'>
  <Heading title='Our Brands' desc='' />

  <div className='posts'>
    {marques.map((marque) => (
      <div className='post' key={marque._id}>
        <div className='content'>
          <div className='img'>
            <img src={marque.imgMarq} alt='' />
          </div>
          <div className='text'>
            <h3>{marque.nomMarq}</h3>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

    </>
  )
}
