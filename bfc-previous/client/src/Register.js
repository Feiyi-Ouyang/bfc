import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

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
        .then((res) => res.json())
        .then((responseJson) => {console.log(responseJson.message)})
        event.preventDefault()
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}> 
                <FormGroup>
                    <Label>Username</Label>
                    <Input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" name="password1" placeholder="Password" value={this.state.password1} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Verify password</Label>
                    <Input type="password" name="password2" placeholder="Verify password" value={this.state.password2} onChange={this.handleChange}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}
export default Register;