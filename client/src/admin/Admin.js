import React, { Component } from 'react';

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {
                name: '',
                price: '',
                file: '',
            },
            registerResponse: '',
        }
        this.onUploadFile = this.onUploadFile.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onUploadFile(files) {
        this.setState({ product: { ...this.state.product, file: files[0] } });
    }

    handleChange(event) {
        this.setState({ product: { ...this.state.product, [event.target.name]: event.target.value } });
    }

    handleSubmit(event) {
        event.preventDefault()
        var formData = new FormData();
        formData.append('name', this.state.product.name);
        formData.append('price', this.state.product.price);
        formData.append('file', this.state.product.file);

        console.log("admin: sending form data to server", formData)
        fetch('/admin', {
            method: 'post',
            body: formData,
        })
        .then((res) => res.json())
        .then((responsejson) => { console.log(responsejson.message) })
    }

    render() {
        return (
            <div>
                This is the product register page for admin
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Product name: <br />
                        <input type="text" name="name" placeholder="Name" value={this.state.product.name} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Product price: <br />
                        <input type="number" name="price" placeholder="Price" value={this.state.product.price} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Upload product image: <br />
                        <input type="file" onChange={(e) => this.onUploadFile(e.target.files)} />
                    </label>
                    <br />
                    <button type="submit">Register product</button>
                </form>
                {this.state.registerResponse}
            </div>
        );
    }
}

export default Admin;


