import React, { useState } from "react";
import {Link, withRouter} from "react-router-dom";
import {connect } from "react-redux";
import PropTypes from "prop-types";
//import { fetchCategories } from "../../actions/articleActions";
import { logoutUser } from "../../actions/authActions";

const Navbar = ({ logoutUser,
                    auth,
                    errors}) => {

    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    };

    const [menuOpen, setMenuToggle] = useState(false);


    const toggleMenu = () => setMenuToggle(!menuOpen);

    const stylesOpen = {
        transform: 'translateX(0px)'
    };

    const renderMenu = (isMobile = false) => {
        if(!auth.isAuthenticated) {
            return <>
                <li>
                    <Link to="/login" className="item" onClick={isMobile ? toggleMenu : null}>Login</Link>
                </li>
                <li>
                    <Link to="/register" className="item" onClick={isMobile ? toggleMenu : null}>Register</Link>
                </li>
            </>
        }
        return <>
                <li>
                    <Link to="/settings" className="item" onClick={isMobile ? toggleMenu : null}>Settings</Link>
                </li>
                <li>
                    <Link to="#" className="item" onClick={(e) => onLogoutClick(e)}>Log Out</Link>
                </li>
            </>
    }

    return (
        <div className="navbar-fixed">
            <nav className="red">
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">
                            News Feed
                        </a>
                        <a onClick={toggleMenu} className="sidenav-trigger waves-effect right">
                            <i className="material-icons">menu</i>
                        </a>
                        <div
                            className="sidenav-overlay"
                            style={menuOpen ? { display: 'block', opacity: 1 } : null}
                            onClick={toggleMenu}
                        />
                        <ul id="slide-out" className="sidenav" style={menuOpen ? stylesOpen : null}>
                            <li>
                                <span className="subheader">Menu</span>
                            </li>
                            <li>
                                <div className="divider" />
                            </li>
                            <li>
                                <Link to="/" className="item" onClick={toggleMenu}>
                                    Home
                                </Link>
                            </li>
                            { renderMenu(true) }
                        </ul>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            { renderMenu() }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

Navbar.propTypes = {
    //fetchCategories: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    //categories: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    //categories: state.article.categories,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(Navbar));
