import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import ConnectedHome from "./home/ConnectedHome";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Profile from "./user/Profile";
import Admin from "./admin/Admin";
import ConnectedCart from "./user/ConnectedCart";

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
                <Route exact path="/home" component={ConnectedHome} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/cart" component={ConnectedCart} />
            </div>
        );
    }
}

export default App;