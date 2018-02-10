import { connect } from 'react-redux'
import Logout from '../components/Logout'
import {rmAllProduct} from '../actions'

const mapDispatchToProps = dispatch => {
    return {
      rmAllProduct: () => {
        dispatch(rmAllProduct())
      }
    }
  }

const ConnectedLogout = connect(
    null,
    mapDispatchToProps,
)(Logout)

export default ConnectedLogout