import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { authenticate, isAuth } from "./helpers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Google from "./Google";
import Facebook from "./Facebook";


const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: 'wisdom3510802563@gmail.com',
        password: 'reeves12345',
        buttonText: 'Submit'
    });

    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    // OUR CUSTOM HELPER INFORM PARENT METHOD FOR OUR GOOGLE LOGIN
    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
        });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }
        })
        .then(response => {
            // We are saving the user response (user, token) to localstorage
            authenticate(response, () => {
                setValues({ 
                    ...values, 
                    name: '', 
                    email: '', 
                    password: '', 
                    buttonText: 'Submitted' 
                });
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
            });
        })
        .catch(error => {
            // console.log('SIGNIN ERROR', error.response.data);
            setValues({ ...values, buttonText: 'Submit' });
            toast.error(error.response.data.error);
        });
    };

    
    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleChange('email')}
                    className="form-control"
                    placeholder="Enter Your Email"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={handleChange('password')}
                    className="form-control"
                    placeholder="Enter Your Password"
                />
            </div>

            <div>
                <button className="btn btn-sm btn-primary" onClick={clickSubmit}>
                    { buttonText }
                </button>
                <span style={{ marginLeft: "10px", textDecoration: "none" }}>
                  <Link style={{ textDecoration: "none" }} to="/signup">Not yet signup?</Link>
                </span>
            </div>

        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                { isAuth() ? <Redirect to="/" /> : null }
                <h1 className="p-5 text-center">Signin</h1>
                <Google informParent={informParent} />
                <Facebook informParent={informParent} />
                {signinForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
            </div>
        </Layout>
    );
            
};


export default Signin;