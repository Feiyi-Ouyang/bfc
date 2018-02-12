import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Admin from "./Admin";
import Cart from "./Cart";

// App is only responsible for routing
class App extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {/*Redirect to /home if at the main page*/}
                {window.location.pathname==="/" ? <Redirect to="/home" /> : null}
                <Link to="/home"></Link>
                <Link to="/login"></Link>
                <Link to="/register"></Link>
                <Link to="/profile"></Link>
                <Link to="/admin"></Link>
                <Link to="/cart"></Link>
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/cart" component={Cart} />
            </div>
        );
    }
}

export default App;