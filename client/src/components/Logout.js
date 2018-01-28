import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Cookies } from 'react-cookie';

class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fireRedirect: false,
        }
        this.cookies = new Cookies();
    }

    componentDidMount(){
        this.timer = setTimeout(() => {
            this.cookies.set('username', '', {path:'/'})
            this.cookies.set('userid', '', {path: '/'})
            this.setState({fireRedirect: true})
            this.props.rmAllProduct()
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