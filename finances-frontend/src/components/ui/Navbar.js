
import React from 'react'
import { useDispatch } from 'react-redux';
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
    
          <a className="navbar__link" onClick={ clearActive }>Sheets</a>
          <a className="navbar__link" onClick={handleLogout}>Logout</a>
       
    </nav>
  )
}
