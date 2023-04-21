import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Constants from '../query/constants';
import { Link } from 'react-router-dom';
import FormInput from "../common/formInput";
import Footer from "./footer";

const Register = () => {

    const [userObject, setUserObject] = useState({});

    const InputFields = [
        {label: "FIRST NAME:", placeholder: "Enter First Name", className: "registration-field", type: "text", name: "firstname"},
        {label: "LAST NAME:", placeholder: "Enter Last Name", className: "registration-field", type: "text", name: "lastname"},
        {label: "Email", placeholder: "Enter Email", className: "registration-field", type: "text", name: "email"},
        {label: "PASSWORD", placeholder: "Enter Passwsord", className: "registration-field", type: "password", name: "password"},
        {label: "CONFIRM PASSWORD", placeholder: "Confirm Passwsord", className: "registration-field", type: "password", name: "confirm-password"}
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const userObject = {
            firstName: e.target.firstname.value,
            lastName: e.target.lastname.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        setUserObject({userObject})
        console.log(userObject)
        axios.post(Constants.API_URL, {
            query: Constants.CREATE_CUSTOMER_MUTATION,
            variables: { 
                firstname: `${userObject.firstName}`, 
                lastname: `${userObject.lastName}`, 
                email: `${userObject.email}`, 
                password: `${userObject.password}`
            }
        })
    }
    
    return (
        <>
        <div className="registration-form">
            <FormInput 
                onSubmit={handleSubmit} 
                InputFields={InputFields} 
                buttonLabel="Register"
            />
            <Link to="/login">Already have account? Login here.</Link>
        </div>
        <Footer />
        </>
    );
}

export default Register;