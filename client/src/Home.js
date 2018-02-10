import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    componentDidMount() {
        console.log("Home start rendering");
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
            </div>
        );
    }

}

export default Home;