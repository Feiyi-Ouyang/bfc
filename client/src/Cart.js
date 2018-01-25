import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Cookies } from 'react-cookie';
import { Container, Row, Col } from 'reactstrap';

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: ''
        }
        this.cookies = new Cookies()
    }

    render() {
        return (
            <div>
                <ProductContainer products={this.cookies.get('products')} /> 
                {(this.cookies.get('userid') && this.props.location.pathname==='/cart')? <Redirect to={'/cart/'+this.cookies.get('userid')}/> : null}
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

export default Cart;