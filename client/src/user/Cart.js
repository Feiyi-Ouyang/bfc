import React, { Component } from 'react';

class Cart extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <div>
                {this.props.products.map((product, index) => (
                    <li key={index}>
                        {product.name} : {product.number}
                        <br />
                    </li>
                ))}
            </div>
        );
    }
}

export default Cart;