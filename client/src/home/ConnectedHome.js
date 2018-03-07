import { connect } from 'react-redux'
import Home from './Home'
import {addProduct} from '../actions'

const mapDispatchToProps = dispatch => {
    return {
      onProductClick: (id) => {
        dispatch(addProduct(id))
      }
    }
  }

const ConnectedHome = connect(
    null,
    mapDispatchToProps,
)(Home)

export default ConnectedHome