import React from 'react';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute'
import Home from './components/pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Navbar from './components/partials/Navbar'
import Alerts from './components/partials/Alerts'
import Transaction from './components/transactions/Transaction'
import Customer from './components/customers/Customer'
import Product from './components/products/Product'
import SecNav from './components/partials/SecNav';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <>
   <Router>
     <Navbar />
     <PrivateRoute component={SecNav}/>
     <div className="container">
     <Alerts />
      <Switch>
        <PrivateRoute exact path='/' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/customer' component={Customer}/>
        <Route exact path='/product' component={Product}/>
        <Route exact path='/transaction' component={Transaction}/>
      </Switch>
     </div>     
   </Router>
   </>
  );
}

export default App;
