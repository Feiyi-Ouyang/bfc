import React, { Component } from 'react';
import { Cookies } from 'react-cookie';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
        }
    }

    componentDidMount(){
        const cookies = new Cookies();
        if (cookies.get('username')) {
            fetch(this.props.location.pathname, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => res.json())
            .then((responseJson) => {
                this.setState({username: responseJson.user.username})
            })
        }
    }

    render() {
        return (
            <h1>Hi {this.state.username}</h1>
        );
    }
}
export default Profile;