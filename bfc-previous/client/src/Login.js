import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

// TODO: load cart info and merge into redux state
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

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((res) => res.json())
        .then((responseJson) => {
            console.log(responseJson.message)
            this.props.cookies.set('username', responseJson.user.username, {path:'/'})
            this.props.cookies.set('userid', responseJson.user._id, {path: '/'})
            this.setState({fireRedirect: true, userid: responseJson.user._id})
        })
    }


    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}> 
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button>Login</Button>
                </Form>
                {this.state.fireRedirect ? <Redirect to={'/profile/'+this.state.userid}/> : null}
            </div>
        );
    }
}
export default Login;