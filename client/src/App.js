import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

// App is only responsible for routing
class App extends Component {
    componentDidMount() {
        console.log("App start rendering");
    }

    render() {
        return (
            <div>
                {/*Redirect to /home if at the main page*/}
                {window.location.pathname}
                {window.location.pathname==="/" ? <Redirect to="/home" /> : null}
                <Link to="/home"></Link>
                <Link to="/login"></Link>
                <Link to="/register"></Link>
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </div>
        );
    }
}

export default App;