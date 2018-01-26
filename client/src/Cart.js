import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Cookies } from 'react-cookie';
import { Button, Container, Row, Col } from 'reactstrap';

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: '',
            fireRedirect: false,
        }
        this.cookies = new Cookies()
        this.handleCheckout = this.handleCheckout.bind(this)
    }

    handleCheckout(event) {
       this.setState({fireRedirect: true})
       event.preventDefault()
    }


    render() {
        return (
            <div>
                {/* TODO: use redux state management instead of cookies */}
                <ProductContainer products={this.cookies.get('products')} /> 
                <Button onClick={this.handleCheckout}>Checkout</Button>
                {/*TODO: login status difference  */}
                {(this.cookies.get('userid') && this.props.location.pathname==='/cart')? <Redirect to={'/cart/'+this.cookies.get('userid')}/> : null}
                {this.state.fireRedirect ? <Redirect to={'/checkout'}/> : null}
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