import React, {useState, useEffect} from "react";

const Footer = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleChange = email => {
        setEmail(email)
    }

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let vaildMessage = (validRegex.test(email)) ? "":"enter valid email!";

    useEffect(() => {
        console.log(email)
        if (email == "") {
            setError("");
            return;
        }
        setError(vaildMessage);
      }, [email]);

    

    return (
        <div className="footer">
            <div className="footer-links-container">
                <ul className="footer-links">
                    <li className="footer-links-item">About US</li>
                    <li className="footer-links-item">Customer Service</li>
                </ul>
                <ul className="footer-links">
                    <li className="footer-links-item">Privacy and Policy</li>
                    <li className="footer-links-item">Search Terms</li>
                    <li className="footer-links-item">Orders and Returns</li>
                    <li className="footer-links-item">Advanced Search</li>
                    <li className="footer-links-item">Contact Us</li>
                </ul>
                <div>
                    <div>
                        <input className="subscribe-input" 
                            type="text" 
                            placeholder="Enter your email address" 
                            name="subscribe-email"
                            onChange={e => handleChange(e.currentTarget.value)}
                        />
                        <button className="subscribe">Subscribe</button>
                    </div>
                    <p className="error-message">{error}</p>
                </div>
            </div>
            <div className="copyright-block">
                Copyright © 2023 Lehan Max, Inc. All rights reserved.
            </div>
        </div>
    )
}

export default Footer;
 