import React from 'react'
import {Link} from 'react-router-dom';

const SecNav = () => {
  return (
    <div className="sec-navbar">
      <ul>
        <li><Link to="/" style={{textDecoration: 'none'}}>Home</Link></li> 
        <li><Link to="/product" style={{textDecoration: 'none'}}>Product</Link></li> 
        <li><Link to="/customer" style={{textDecoration: 'none'}}>Customer</Link></li> 
        <li><Link to="/transaction" style={{textDecoration: 'none'}}>Transaction</Link></li>  
     </ul>
    </div>
  )
}

export default SecNav
