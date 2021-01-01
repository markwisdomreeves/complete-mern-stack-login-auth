import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { isAuth } from "./helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";


// SIGN UP FUNCTION
const Signup = () => {
    const [values, setValues] = useState({
        name: 'John Brown',
        email: 'wisdom3510802563@gmail.com',
        password: 'reeves12345',
        buttonText: 'Submit'
    });

    const { name, email, password, buttonText } = values;
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password }
        })
        .then(response => {
            setValues({ 
                ...values, 
                name: '', 
                email: '', 
                password: '', 
                buttonText: 'Submitted' 
            });
            toast.success(response.data.message);
        })
        .catch(error => {
            setValues({ ...values, buttonText: 'Submit' });
            toast.error(error.response.data.error);
        });

    };


    // SIGN UP FORM
    const signupForm = () => (
        <form>
             <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleChange('name')}
                    className="form-control"
                    placeholder="Enter Your Name"
                />
             </div>
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
                    {buttonText}
                 </button>
                 <span style={{ marginLeft: "10px", textDecoration: "none" }}>
                  <Link to="/signin" style={{ textDecoration: "none" }}>Already signup?</Link>
                </span>
             </div>

        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                { isAuth() ? <Redirect to="/" /> : null }
                <h1 className="p-5 text-center">Signup</h1>
                { signupForm() }
            </div>
        </Layout>
    );

};


export default Signup;