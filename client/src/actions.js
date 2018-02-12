/*
 * action types
 */
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const RM_PRODUCT = 'RM_PRODUCT'
export const RM_ALL_PRODUCT = 'RM_ALL_PRODUCT'

/*
 * action creators
 */

export function addProduct(id) {
  return { type: ADD_PRODUCT, id }
}

export function rmProduct(id) {
  return { type: RM_PRODUCT, id }
}

export function rmAllProduct() {
  return { type: RM_ALL_PRODUCT }
}
