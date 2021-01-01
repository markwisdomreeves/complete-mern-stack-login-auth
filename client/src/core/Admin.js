import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";


const Admin = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    // I AM USING THE useEffect hook method TO GET THE USER DATA 
    // FROM MY BACKEND API WHEN THE PAGE LOAD / MOUNTED. 
    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    }, [loadProfile()]);

    
    function loadProfile() {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('ADMIN PROFILE UPDATE', response);
            const { role, name, email } = response.data;
            setValues({ ...values, role, name, email })
        })
        .catch(error => {
            console.log('ADMIN PROFILE ERROR', error.response.data.error);
            // IF THE USER JWT TOKEN HAS EXPIRED, WE WILL WE WILL 
            // SIGN THEM OUT AND REDIRECT THEM BACK TO THE PUBLIC PAGE TO RE-SIGN-IN AGAIN
            if (error.response.status == 401) {
                signout(() => {
                    history.push('/')
                });
            }
        });
    };


    const { role, name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password },
        })
        .then(response => {
            console.log('ADMIN PROFILE UPDATE SUCCESS', response);

            updateUser(response, () => {
                setValues({ ...values,  buttonText: 'Submitted' });
                toast.success('Admin Profile updated successfully');
            });
            
        })
        .catch(error => {
            console.log('ADMIN PROFILE UPDATE ERROR', error.response.data.error);
            setValues({ ...values, buttonText: 'Submit' });
            toast.error(error.response.data.error);
        });
    };

    
    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input
                    type="text"
                    defaultValue={role}
                    className="form-control"
                    placeholder="Enter Your Role"
                    disabled
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Enter Your Name"
                    onChange={handleChange('name')}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    defaultValue={email}
                    className="form-control"
                    placeholder="Enter Your Email"
                    disabled
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
                <button className="btn btn-primary" onClick={clickSubmit}>
                    { buttonText }
                </button>
                <span style={{ marginLeft: "10px", textDecoration: "none" }}>
                  <Link style={{ textDecoration: "none" }} to="/">Go Back</Link>
                </span>
            </div>

        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-3 text-center">Admin</h1>
                <p className="lead text-center mb-3">Profile Update</p>
                {updateForm()}
            </div>
        </Layout>
    );
            
};


export default Admin;