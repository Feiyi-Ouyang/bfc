import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        //     .catch(error => console.error('Error:', error))
        //     .then((res) => res.json())
        //     .then((responseJson) => { console.log(responseJson.message) })
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username: <br />
                        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                </label>
                <br />
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
                <label>
                    Verify Password: <br />
                    <input type="password" name="password2" placeholder="Password" value={this.state.password2} onChange={this.handleChange} />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        );
    }
}
export default Register;