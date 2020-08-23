import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import HomePage from './components/home-page';
import Navbar from './components/navbar';
import UserPage from './components/user-page';
import ShoppingCart from './components/shopping-cart';
import LoginPage from './components/login-page';

function App() {
  return (
    <div>
      <Router>
        <div className="container justify-content-center line">
          <Route path="/" exact component={LoginPage} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/user" exact component={UserPage} />
          <Route path="/cart" exact component={ShoppingCart} />
        </div>
      </Router>
    </div>
  );
}

export default App;
