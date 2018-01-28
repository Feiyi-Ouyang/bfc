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
           fetch('/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    state: this.props.store.getState(),
                    userid: this.cookies.get('userid')
                })
            })
            // .then((res) => res.json())
            // .then((responseJson) => {console.log(responseJson.message)})
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