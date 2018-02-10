import React from 'react'

const Product = ({ onClick, product }) => (
  <li onClick={onClick}>
    {product.id} : {product.number}
  </li>
)

export default Product