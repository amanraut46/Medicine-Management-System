import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auths/authThunk';
import { Link,useNavigate } from 'react-router-dom';

import "../auth.css";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then(() => {
      navigate("/");
    });
  };

  return (
     <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">
          Login
        </h2>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="auth-input"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="auth-input"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="auth-link"
          >
            Register
          </Link>
        </div>

      </div>

    </div>
  )
}

export default Login;