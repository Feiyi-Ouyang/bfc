/*
 * action types
 */
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const RM_PRODUCT = 'RM_PRODUCT'

/*
 * action creators
 */

export function addProduct(id) {
  return { type: ADD_PRODUCT, id }
}

export function rmProduct(id) {
  return { type: RM_PRODUCT, id }
}
