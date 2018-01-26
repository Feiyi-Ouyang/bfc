import React from 'react'
import Product from './Product'

const ProductList = ({ products, onProductClick }) => (
  <ul>
    {products.map((product, index) => (
      <Product key={index} {...product} />
    ))}
  </ul>
)

export default ProductList