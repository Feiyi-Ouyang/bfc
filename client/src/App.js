import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
// import Login from "./user/login";

class App extends Component {
    render() {
        return (
            <div>
                <div class="header-env fixed-top">
                    <div class="left-icon">
                        <span class="glyphicon glyphicon-th-list"></span>
                    </div>

                    <div class="brand-name">BFC</div>

                    <div class="right-icon">
                        <Link to="/login">
                            <span class="glyphicon glyphicon-user"></span>
                        </Link>
                    </div>
                    <div class="right-icon">
                        <span class="glyphicon glyphicon-shopping-cart"></span>
                    </div>
                    {/* <Route exact path="/login" render={() => <Login/>}/> */}

                </div>
            </div>
        );
    }
}

export default App;