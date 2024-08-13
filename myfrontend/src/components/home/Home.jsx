import {React,useState} from "react"

import { Blog } from "./blog/Blog"
import { Hero } from "./Hero/Hero"
import { Product } from "./product/Product"
import { Testimonial } from "./testimonial/Testimonial"
import { TopProduct } from "./top/TopProduct"
export const Home = ({ cartItems }) => {
  const [selectedCategoryy, setSelectedCategoryy] = useState(null);
  const [typesInSearch,setTypesInSearch]=useState("")
  console.log(typesInSearch)
  return (
    <>
      <Hero
        selectedCategoryy={selectedCategoryy}
        setSelectedCategoryy={setSelectedCategoryy}
        setTypesInSearch={setTypesInSearch}
         >
        <Product 
         selectedCategoryy={selectedCategoryy}
         typesInSearch={typesInSearch}
        />
        <br/>
        <br />
        <TopProduct />
        <Testimonial />
        <Blog />
      </Hero>
    </>
  )
}
