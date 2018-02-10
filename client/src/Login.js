import React, { Component } from 'react';
import { Redirect } from 'react-router';

// TODO: UI
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            fireRedirect: false,
            userid: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        console.log("login mounted");
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log("sending info to server\n %s", JSON.stringify(this.state));
        fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .catch(error => console.error('Error:', error))
            .then((res) => res.json())
            .then((responseJson) => {
                console.log(responseJson.message)
                //     this.props.cookies.set('username', responsejson.user.username, {path:'/'})
                //     this.props.cookies.set('userid', responsejson.user._id, {path: '/'})
                //     this.setstate({fireredirect: true, userid: responsejson.user._id})
            })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email: <br />
                        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Password: <br />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
                New user? <br/>
                <a href="/register"><button>Register</button></a>
                {this.state.fireRedirect ? <Redirect to={'/profile/' + this.state.userid} /> : null}
            </div>
        );
    }
}

export default Login;