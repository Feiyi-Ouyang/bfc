import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

class RegisterProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: '',
            file: ''
        }
        this.onUploadFile = this.onUploadFile.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onUploadFile(files) {
        this.setState({
            file : files[0]
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        var formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('price', this.state.price);
        formData.append('file', this.state.file);

        fetch('/register-product', {
            method: 'post',
            body: formData,
        })
        .then((res) => res.json())
        .then((responsejson) => {console.log(responsejson.message)})
        // event.preventDefault()
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}> 
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Price</Label>
                    <Input type="number" name="price" placeholder="Price" value={this.state.price} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>File</Label>
                    <Input type="file" onChange={(e)=>this.onUploadFile(e.target.files)}/>
                </FormGroup>
                <Button>Register</Button>
            </Form>
        );
    }
}
export default RegisterProduct;