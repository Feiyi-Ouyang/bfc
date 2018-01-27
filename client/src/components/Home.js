import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
    }

  }

  componentDidMount(){
    fetch('/home', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((res) => res.json())
    .then((responseJson) => {
        this.setState({products: responseJson.products})
    })
  }


  render() {
    return (
      <ul>
        {this.state.products.map((product, index) => (
          <li key={index}>
            {product._id}
            <button onClick={() => this.props.onProductClick(product._id)}>Add to cart</button >
          </li>

        ))}

      </ul>
    )
  }
}


export default Home;
