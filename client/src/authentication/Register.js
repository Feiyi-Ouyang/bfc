import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: '',
                email: '',
                password: '',
                password_v: '',
            },
            registerResponse: '',
            fireRedirect: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    handleChange(event) {
        this.setState({ user: { ...this.state.user, [event.target.name]: event.target.value } });
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        })
            .then((res) => {
                res.json().then((value) => {
                    // returns if component unmounted before promise resolved
                    if (!this._isMounted) {
                        return;
                    }
                    this.setState({ registerResponse: value.message });
                    if (res.ok) {
                        this.setState({fireRedirect: true})
                    }
                });
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username: <br />
                        <input type="text" name="username" placeholder="Username" value={this.state.user.username} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Email: <br />
                        <input type="email" name="email" placeholder="Email" value={this.state.user.email} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Password: <br />
                        <input type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Verify Password: <br />
                        <input type="password" name="password_v" placeholder="Password" value={this.state.user.password_v} onChange={this.handleChange} />
                    </label>
                    <br />
                    <button type="submit">Register</button>
                </form>
                {this.state.registerResponse}
                {this.state.fireRedirect ? <Redirect to='/login' /> : null}
            </div>
        );
    }
}
export default Register;