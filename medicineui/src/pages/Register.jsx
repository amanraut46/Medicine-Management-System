import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auths/authThunk';
import { Link, useNavigate } from "react-router-dom";

import "../auth.css";
export const Register = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData)).then(() => {   
            navigate("/login");
        });
        
    };
  return (
    <div className="auth-container">
         <div className="auth-card">
            <h2 className="auth-title">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    name="fullname"
                    placeholder='Full Name'
                    value={formData.fullname}
                    className="auth-input"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder='Email'
                    className="auth-input"
                    value={formData.email}
                    onChange={handleChange}
                />
            
                <input
                    type="password"
                    name="password"
                    placeholder='Password'
                    className="auth-input"
                    value={formData.password}
                    onChange={handleChange}
                />
            <button type="submit" className="auth-button">Register</button>
        </form>
        <div className="auth-footer">
          Already have an account?{" "}

          <Link
            to="/login"
            className="auth-link"
          >
            Login
          </Link>
        </div>

    </div>
       
        
    </div>
  )
}
export default Register;
