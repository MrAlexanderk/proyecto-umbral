// src/components/Login.jsx
import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Login() {
  const navigate = useNavigate();
  const { login, token } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password) => password.length >= 1;

  const allValid = isValidEmail(email) && isValidPassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allValid) return;

    try {
      await login({ email, password });

      await MySwal.fire({
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        title: "Welcome back!",
        text: `El Umbral opens its gates for you, once again.`,
        customClass: {
          popup: 'umbral-popup',
          title: 'umbral-title',
          content: 'umbral-text',
          icon: 'umbral-icon'
        },
        timerProgressBar: true,
      });
      setEmail("");
      setPassword("");
      setTouched({ email: false, password: false });
      navigate('/');
      

    } catch (error) {
      await MySwal.fire({
        icon: "error",
        timer: 2000,
        title: "Login failed",
        text: error.message || "Invalid credentials",
        customClass: {
          popup: 'umbral-popup',
          title: 'umbral-title',
          content: 'umbral-text',
          icon: 'umbral-icon'
        },
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box text-white-custom">
        <h1 className="text-white-custom text-xl text-spectral">Enter El Umbral</h1>
        <p className="subtitle text-crimson text-md">Only those marked may cross...</p>

        <Form className="signup-form text-crimson" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-row mb-3">
            <label>Email Address</label>
            <div className="input-icon-group">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched({ ...touched, email: true })}
              />
              {touched.email &&
                (isValidEmail(email) ? (
                  <FaCheckCircle className="icon success" />
                ) : (
                  <FaTimesCircle className="icon error" />
                ))}
            </div>
            {touched.email && !email && (
              <p className="text-detail-error mb-0 text-danger">*Email is required</p>
            )}
            {touched.email && email && !isValidEmail(email) && (
              <p className="text-detail-error mb-0 text-danger">*Enter a valid email</p>
            )}
          </div>

          {/* Password */}
          <div className="form-row mb-4">
            <label>Password</label>
            <div className="input-icon-group">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched({ ...touched, password: true })}
              />

            </div>
            {touched.password && !password && (
              <p className="text-detail-error mb-0 text-danger">*Password is required</p>
            )}
          </div>

          {/* Submit */}
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn-primary mt-3 text-md w-100"
              disabled={!allValid}
            >
              Enter
            </button>
          </div>
        </Form>

        <hr className="divider" />

        <p className="text-center text-white-custom">
          <Link to="/signup" className="already-account link-none">
            I don’t have an account yet
          </Link>
        </p>
      </div>
    </div>
  );
}
