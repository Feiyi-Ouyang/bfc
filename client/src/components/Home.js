import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
        }

    }

    componentDidMount() {
        console.log("Home start rendering");
        fetch('/home', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({ products: res.products })
            })

    }

    render() {
        return (
            <div>
                <div className="header-env fixed-top">
                    <div className="left-icon">
                        <span className="glyphicon glyphicon-th-list"></span>
                    </div>

                    <div className="brand-name">BFC</div>

                    <div className="right-icon">
                        <a href="/login">
                            <span className="glyphicon glyphicon-user"></span>
                        </a>
                    </div>
                    <div className="right-icon">
                        <span className="glyphicon glyphicon-shopping-cart"></span>
                    </div>

                </div>
                <ul>
                    {this.state.products.map((product, index) => (
                        <li key={index}>
                            <img src={"/productImg/" + product.img} alt="" />
                            <br/>
                            Product name: {product.name}
                            {/* <button onClick={() => this.props.onProductClick(product._id)}>Add to cart</button > */}
                        </li>

                    ))}
                </ul>

            </div>
        );
    }

}

export default Home;