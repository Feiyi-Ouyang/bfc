import { connect } from 'react-redux'
import Register from './Register'
import { redirectToLogin } from './actions'

const mapStateToProps = state => {
    return {
        pathname: state.register.pathname
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirectToLogin: () => {
            dispatch(redirectToLogin())
        },
    }
}
const ConnectedRegister = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)

export default ConnectedRegister