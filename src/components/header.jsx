import React, {useState} from 'react';
import "../App.css";
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    const clearSession = () => {
        navigate("/login")
        localStorage.removeItem('customer-token');
    }

    const renderNavLinks = () => {
        if (localStorage.getItem('customer-token')) {
            return <NavLink className="nav-links" onClick={clearSession}>Logout</NavLink>
        } else {
            return <NavLink className="nav-links" to="/login">Login</NavLink>
        }
    }

    const navigateToSearchResultPage = searchTerm => {
        navigate(`/search/search-result-for/${ searchTerm }`);
      };

    return (
        <div className="header">
            <NavLink className="nav-links" to="/">LOGO</NavLink>
            <div className='search-bar-container'>
                <input className="search-bar" 
                       type="text" 
                       placeholder="Search entire store here..." 
                       onChange={e => navigateToSearchResultPage(e.currentTarget.value)}
                />
            </div>
            <ul className="navigation-links">
                {renderNavLinks()}
                <NavLink className="nav-links" to="/cart">Cart</NavLink>
            </ul>
            <div className="menu">
                <span className="material-symbols-outlined">
                    menu
                </span>
            </div>
        </div>
    );
}

export default Header;