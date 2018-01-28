import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fireRedirect: false,
        }
    }

    componentDidMount(){
        this.timer = setTimeout(() => {
            this.props.cookies.set('username', '', {path:'/'})
            this.props.cookies.set('userid', '', {path: '/'})
            this.setState({fireRedirect: true})
       },2000)
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    render() {
        return (
            <div>
                <h1>You've logged out</h1>
                {this.state.fireRedirect ? <Redirect refresh='3000' to='/home'/> : null}
            </div>
        )
    }
}
export default Logout;