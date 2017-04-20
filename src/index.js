import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from './Pages/home/home';
import NotFound from "./Pages/404/404";
import About from "./Pages/about/about";

import './styles/styles.css';

const Root = () => {
    return(
        
        <div id="page" className="page">
            <main className="main" id="main">
                <header className="header" id="header" role="banner" itemScope itemType="http://schema.org/WPHeader">
                    <h1 className="visually-hidden" itemScope itemType="http://schema.org/WPHeader">BB React Prototype</h1>
                </header>
                <div className="layout">
                    <div className="region region--a">
                        <div className="region-inner">
                            <Router>
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route path="/about/" component={About} />
                                    <Route component={NotFound} />
                                </Switch>
                            </Router>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
