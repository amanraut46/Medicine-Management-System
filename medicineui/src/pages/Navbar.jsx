import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logoutUser } from '../features/auths/authThunk';

const Navbar = () => {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const token = localStorage.getItem("token");
    const handleLogout = () => {
        dispath(logoutUser());
        navigate('/login');
    }
    const user = useSelector((state) => state.auth.user);
    console.log(user);
    return (
        <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        backgroundColor: "#1976d2",
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Medicine App
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        {!token ? (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
          <label style={{ color: "white" }}>Welcome, {user?.name} </label>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>

    )
}

export default Navbar;