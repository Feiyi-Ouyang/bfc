import React, { Component } from 'react';
import { Redirect } from 'react-router';

// TODO: UI
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                email: '',
                password: '',
            },
            registerResponse: '',
            redirectToAdmin: false,
            redirectToProfile: false,
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
        fetch('/login', {
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
                        if (value.user.username === 'admin') {
                            this.setState({ redirectToAdmin: true })
                        } else {
                            this.setState({ redirectToProfile: true })
                        }
                    }
                    //     this.props.cookies.set('username', responsejson.user.username, {path:'/'})
                    //     this.props.cookies.set('userid', responsejson.user._id, {path: '/'})
                    //     this.setstate({fireredirect: true, userid: responsejson.user._id})
                });
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
                New user? <br />
                <a href="/register"><button>Register</button></a>
                {/* show register response */}
                {this.state.registerResponse}
                {/* redirect */}
                {this.state.redirectToAdmin ? <Redirect to='/admin' /> : null}
                {this.state.redirectToProfile ? <Redirect to='/profile' /> : null}
            </div>
        );
    }
}

export default Login;