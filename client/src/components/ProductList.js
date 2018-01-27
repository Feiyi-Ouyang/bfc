import React from 'react'
import Product from './Product'

// ProductList in cart
const ProductList = ({ products, onProductClick }) => (
  <ul>
    {products.map((product, index) => (
      <Product key={index} {...product} product={product}/>
    ))}
  </ul>
)

export default ProductList