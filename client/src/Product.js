import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Cookies } from 'react-cookie';

class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
        }
        this.cookies = new Cookies()
        this.handleAdd = this.handleAdd.bind(this)
    }

    componentDidMount(){
        fetch(this.props.location.pathname, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((res) => res.json())
        .then((responseJson) => {
            this.setState({id: responseJson.product._id})
        })
    }

    handleAdd(event) {
        var products = this.cookies.get('products')
        if (products) {
            for (var i=0; i<products.length; ++i) {
                if (products[i].productid === this.state.id) {
                    products[i].number+=1
                    this.cookies.set('products',products, {path:'/'})
                    return 
                }
            }
        } else {
            var newProducts = [{productid: this.state.id, number: 1}]
            this.cookies.set('products',newProducts, {path:'/'})
        }
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h1>Product #{this.state.id}</h1>
                {this.cookies.get('userid') ? <Button onClick={this.handleAdd}>Add to cart</Button> : null}
            </div>
        );
    }
}
export default Product;