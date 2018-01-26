import { connect } from 'react-redux'
import ProductList from '../components/ProductList'

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const ConnectedProductList = connect(
  mapStateToProps,
)(ProductList)

export default ConnectedProductList