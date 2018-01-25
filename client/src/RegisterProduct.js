import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

class RegisterProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: '',
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
        fetch('/register-product', {
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
                    <Label>Name</Label>
                    <Input type="text" name="name" placeholder="Name" value={this.state.username} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Price</Label>
                    <Input type="number" name="price" placeholder="Price" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <Button>Register</Button>
            </Form>
        );
    }
}
export default RegisterProduct;