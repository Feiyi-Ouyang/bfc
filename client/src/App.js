import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Logout from "./Logout";
import Cart from "./Cart";
import RegisterProduct from "./RegisterProduct";
import Product from "./Product";
import Checkout from "./Checkout";

class App extends Component {
  constructor(props) {
    super(props)
    this.cookies = new Cookies()
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/home">Home</Link></li>
          {this.cookies.get('username') ? null : <li><Link to="/register">Register</Link></li>}
          {this.cookies.get('username') ? null : <li><Link to="/login">Login</Link></li>}
          {this.cookies.get('username') ? <li><Link to="/profile">Profile</Link></li> : null}
          {this.cookies.get('username') ? <li><Link to="/logout">Logout</Link></li> : null}
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/register-product">Register product</Link></li>
        </ul>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" render={() => <Login cookies={this.cookies}/>}/>
          <Route path="/profile" component={Profile}/>
          <Route exact path="/logout" render={() => <Logout cookies={this.cookies}/>}/>
          <Route path="/cart" component={Cart}/>
          <Route exact path="/register-product" component={RegisterProduct}/>
          <Route path="/product" component={Product}/>
          <Route path="/checkout" component={Checkout}/>
      </div>

    );
  }
}
export default App;
