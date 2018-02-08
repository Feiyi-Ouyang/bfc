import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import Home from "./Home";
import Login from "./Login";

// App is only responsible for routing
class App extends Component {
    componentDidMount() {
        console.log("App start rendering");
    }

    render() {
        return (
            <div>
                {/*Redirect to /home if at the main page*/}
                {window.location.href==="http://localhost:3000/" ? <Redirect to="/home" /> : null}
                <Link to="/home"></Link>
                <Link to="/login"></Link>
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
            </div>
        );
    }
}

export default App;