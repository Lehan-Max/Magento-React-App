import React, { useState, useEffect } from "react";
import '../App.css';
import { Link } from 'react-router-dom'; 
import axios from "axios";
import * as Constants from '../query/constants';
import  { useNavigate } from 'react-router-dom';
import FormInput from "../common/formInput";
import Footer from "./footer";

const Login = () => {
    const [loginUserObject, setLoginUserObject] = useState({});
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const InputFields = [
        {label: "EMAIL", placeholder: "Enter Email", className: "login-field", type: "text", name: "email"},
        {label: "PASSWORD", placeholder: "Enter Passwsord", className: "login-field", type: "password", name: "password"}
    ];

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const loginUserObject = {
            email: e.target.email.value,
            password: e.target.password.value
        
        }
        setLoginUserObject({ loginUserObject })
        const queryResult = await axios.post(
            Constants.API_URL, {
                query: Constants.GENERATE_CUSTOMER_TOKEN,
                variables: {email: `${loginUserObject.email}`, password: `${loginUserObject.password}`}
            }
        )
        if (queryResult && queryResult.data.data.generateCustomerToken.token != null) {
            const token = queryResult.data.data.generateCustomerToken.token;
            setToken({ token })
            localStorage.setItem('customer-token', token)
            navigate("/")
        }
    }

    return (
        <>
            <div className="login-form">
                <FormInput 
                    onSubmit={handleLoginSubmit} 
                    InputFields={InputFields} 
                    buttonLabel="Login" 
                    loginUserObject={loginUserObject}
                />
                <Link to="/register">Don't have account? Create one.</Link>
            </div>
            <Footer />
        </>
    );
}

export default Login;