import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {LOGOUT} from '../../redux/types'

const Navbar = ({title, icon}) => {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({type: LOGOUT});
  }

  const authLinks = (
    <>
      <li>
        <a style={{textDecoration: 'none'}} onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"><span className="hide-sm ">Logout</span></i>
        </a>
      </li>
    </>
  )

  const guestLinks = (
    <>
       <li>
          <Link  style={{textDecoration: 'none'}} to="/login">Login</Link>
        </li>
        <li>
          <Link style={{textDecoration: 'none'}} to="/register">Register</Link>
        </li>
    </>
  )

  return (
    <div className="navbar bg-primary">
      <h2>
      <Link to="/" style={{textDecoration: 'none'}}><i className={icon}/> {title}</Link>
      </h2>
      <ul>
        {auth.isAuthenticated ? authLinks : guestLinks}  
      </ul>       
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

Navbar.defaultProps = {
  title: "Trans Manager",
  icon: 'fas fa-lightbulb'
}

export default Navbar;