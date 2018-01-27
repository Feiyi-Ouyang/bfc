import { connect } from 'react-redux'
import Home from '../components/Home'
import {addProduct} from '../actions'


const mapDispatchToProps = dispatch => {
    return {
      onProductClick: () => {
        dispatch(addProduct(1))
      }
    }
  }

const ConnectedHome = connect(
    null,
  mapDispatchToProps,
)(Home)

export default ConnectedHome