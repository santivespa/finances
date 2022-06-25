
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../../actions/auth';
import { sheetClearActive } from '../../actions/sheets';

export const Navbar = () => {

  const dispatch = useDispatch();

  const clearActive = () => {
    dispatch(sheetClearActive());
  }

  const handleLogout = () => {
    dispatch(startLogout());
  }

  return (
    <nav className="navbar__main-content  justify-content-between">
      <div>
        <NavLink className="navbar__link" to="/home" onClick={clearActive}>Sheets</NavLink>
        <NavLink className="navbar__link" to="/categories">Categories</NavLink>
      </div>
      <a className="navbar__link me-0" onClick={handleLogout}>Logout</a>

    </nav>
  )
}
