import { connect } from 'react-redux'
import Cart from '../components/Cart'

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const ConnectedCart = connect(
  mapStateToProps,
)(Cart)

export default ConnectedCart