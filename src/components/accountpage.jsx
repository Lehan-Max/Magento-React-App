import React, {useState, useEffect} from "react";
import axios from "axios";
import * as Constants from '../query/constants';
import  { useNavigate } from 'react-router-dom';
// import Categories from "./categories";

const AccountPage = () => {

    const navigate = useNavigate();
    
    const token = localStorage.getItem('customer-token');

    const [customer, setCustomer] = useState({customer: []});
    const [loading, setLoading] = useState(false);

    // axios.interceptors.request.use(config => {
    //     config.headers['authorization'] = `Bearer ${localStorage.getItem('customer-token')}`;
    //     return config;
    // });

    axios.defaults.headers.post["authorization"] = `Bearer ${localStorage.getItem('customer-token')}`;

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const queryResult = await axios.post(
                Constants.API_URL, {
                    query: Constants.CUSTOMER_QUERY
                }
            )
            const { customer } = queryResult.data.data;
            setCustomer({ customer });
        }
        fetchUser().catch(err => {console.log(err)}).finally(() => setLoading(false));
    }, [token])

    if (loading) return <h1>Loading...</h1>;

    if (customer.customer === null && token === null) {
        return;
    }

    const { customer: {
        firstname = "", lastname = ""
    } = {}  } = customer;
    
    return (
        <div>
            {/* <Categories /> */}
            <h1>Welcome, {firstname} {lastname}</h1>
        </div>
    )
}

export default AccountPage;