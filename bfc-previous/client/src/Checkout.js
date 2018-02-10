import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
import { Button, Container, Row, Col } from 'reactstrap';

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.cookies = new Cookies()
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
    }

    handlePlaceOrder(event) {
       event.preventDefault()
    }


    render() {
        return (
            <div>
                <ProductContainer products={this.cookies.get('products')} /> 
                <Button onClick={this.handlePlaceOrder}>Place order</Button>
           </div>
        );
    }
}

function ProductContainer(props){
    var products = props.products
    return (
        <Container>
            {products.map(function(product, index){
                return <ProductRow key={index} product={product}/>
            })}
            
        </Container>
    )
}

function ProductRow(props) {
    return (
        <Row>
            <Col>{props.product.productid} : {props.product.number}</Col>
        </Row>
    )
}
export default Checkout;