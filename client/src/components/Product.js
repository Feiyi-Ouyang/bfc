import React from 'react'

const Product = ({ onClick, id }) => (
  <li onClick={onClick}>
    {id}
  </li>
)

export default Product