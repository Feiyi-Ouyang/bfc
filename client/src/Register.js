import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: '',
                email: '',
                password: '',
                password_v: '',
            }
       }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        console.log(event.target)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        console.log("register: sending info to server\n %s", JSON.stringify(this.state.user));
        fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.ok) {
                    console.log(res.message)
                } else {
                    throw new Error(res.message);
                }
            })
            .catch(error => console.error('fetch operation problem:', error.message))
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username: <br />
                    <input type="text" name="user.username" placeholder="Username" value={this.state.user.username} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Email: <br />
                    <input type="email" name="user.email" placeholder="Email" value={this.state.user.email} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Password: <br />
                    <input type="password" name="user.password" placeholder="Password" value={this.state.user.password} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Verify Password: <br />
                    <input type="password" name="user.password_v" placeholder="Password" value={this.state.user.password_v} onChange={this.handleChange} />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        );
    }
}
export default Register;