import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";


const Layout = ({ children, match, history }) => {

    const isActive = path => {
        if (match.path === path) {
            return { color: '#000' };
        } else {
            return { color: '#fff' };
        }
    };

    const nav = () => (
        <ul className="nav nav-tabs bg-primary">

            <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive('/')}>
                    Home
                </Link>
            </li>

            {/* IF THE USER HAVE NOT BEEN AUTHENTICATED,
             WE KEEP DISPLAYING THE NORMAL ALWAYS */}
            { !isAuth() && (
                <Fragment>
                  <li className="nav-item">
                    <Link to="/signin" className="nav-link" style={isActive('/signin')}>
                        Signin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link" style={isActive('/signup')}>
                        Signup
                    </Link>
                  </li>
                </Fragment>
            ) }

            {/* BUT IF THE USER IS AN ADMIN, THEY WILL BE REDIRECTED TO THE ADMIN PAGE */}
            {isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/admin')} to="/admin">
                        {isAuth().name}
                    </Link>
                </li>
            )}

            {/* AND IF THE USER HAVE BEEN AUTHENTICATED CORRECTLY,
             WE WILL WELCOME THE AUTENTICATED USER TO THE PRIVATE PAGE*/}
             {isAuth() && isAuth().role === 'subscriber' && (
                 <li className="nav-item">
                     <Link className="nav-link" style={isActive('/private')} to="/private">
                         {isAuth().name}
                     </Link>
                 </li>
             )}

            {/* AND ALSO IF THE USER HAVE BEEN AUTHENTICATED CORRECTLY, 
            WE WILL ALLOW THEM TO SEE THE MAIN PAGE OR REDIRECT THEM
            TO THE PROTECTED ROUTE */}
            {isAuth() && (
                <li className="nav-item">
                    <span 
                        className="nav-link"
                        style={{ cursor: 'pointer', color: '#fff' }}
                        onClick={() => {
                            signout(() => {
                                history.push('/');
                            });
                        }}
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
    );

    return (
        <Fragment>
            { nav() }
            <div className="container">{children}</div>
        </Fragment>
    );
};


export default withRouter(Layout);