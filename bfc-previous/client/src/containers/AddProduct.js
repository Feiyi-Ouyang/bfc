import React from 'react'
import { connect } from 'react-redux'
import { addProduct } from '../actions'

let AddProduct = ({ dispatch }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addProduct(input.value))
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  )
}
AddProduct = connect()(AddProduct)

export default AddProduct