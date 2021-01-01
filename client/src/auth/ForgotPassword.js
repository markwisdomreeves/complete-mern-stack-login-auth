import React, { useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ForgotPassword = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Reset new password'
    });

    const { email, buttonText } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Password Resetting...' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: { email }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Your password has reset' });
            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Request Password Reset' });
            });
    };

    const passwordForgotForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                  onChange={handleChange('email')} 
                  value={email} 
                  type="email" 
                  className="form-control"
                  placeholder="Enter your email here" 
                />
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Forgot password</h1>
                {passwordForgotForm()}
            </div>
        </Layout>
    );
};


export default ForgotPassword;
