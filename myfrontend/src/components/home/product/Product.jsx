import { useState } from "react"
import { Heading } from "../../common/Heading"
import { ProductItems } from "./ProductItems"

export const Product = ({selectedCategoryy,typesInSearch}) => {
    return (
    <>
      <section className='product'>
        <div className='container'>
          <Heading title='Trendings Products' desc='test' />
          <div>
            <br/>
            <br/>
            <br/>
          </div>
          <ProductItems 
           category={selectedCategoryy}
           typesInSearch={typesInSearch}
          />
        </div>
      </section>
    </>
  )
}
