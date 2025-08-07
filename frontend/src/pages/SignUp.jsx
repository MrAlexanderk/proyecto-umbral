import { useState, useContext } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { UserContext } from '../context/UserContext';
import '../styles/SignUp.css';
import '../styles/Buttons.css';

const MySwal = withReactContent(Swal);

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checks, setChecks] = useState({ one: false, two: false, three: false });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    checks: false,
  });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isStrongPassword = (pass) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pass);
  const doPasswordsMatch = password && confirmPassword && password === confirmPassword;

  const allChecks = Object.values(checks).every(Boolean);

  const allValid =
    username &&
    isValidEmail(email) &&
    isStrongPassword(password) &&
    doPasswordsMatch &&
    allChecks;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allValid) return;

    try {
      // Llamas al register del context con los datos que quieras pasar (email y password mínimo)
      await register({ email, password });

      // Luego muestras el Swal de éxito
      await MySwal.fire({
        title: "Registration successful!",
        text: `The Threshold acknowledges your vows, ${username}.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: 'umbral-popup',
          title: 'umbral-title',
          content: 'umbral-text',
          icon: 'umbral-icon'
        },
        timerProgressBar: true,
      });

      // Después navegas al home o login
      navigate('/');
    } catch (error) {
      // En caso de error muestras mensaje con Swal
      MySwal.fire({
        title: "Registration failed",
        text: error.message || "An error occurred during registration.",
        icon: "error",
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box text-white-custom">
        <h1 className="text-white-custom text-xl text-spectral">Join el umbral</h1>
        <p className="subtitle text-crimson text-md">Every dream starts with one name...</p>

        <Form className="signup-form text-crimson" onSubmit={handleSubmit}>
          <div className="form-row mb-3">
            <label>Username</label>
            <div className="input-icon-group">
              <input
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setTouched({ ...touched, username: true })}
              />
              {touched.username &&
                (username ? <FaCheckCircle className="icon success" /> : <FaTimesCircle className="icon error" />)}
            </div>
            {touched.username && !username && (
              <p className="text-detail-error mb-0 text-danger">*Username required</p>
            )}
          </div>

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
            {touched.email && email && !isValidEmail(email) && (
              <p className="text-detail-error mb-0 text-danger">*Enter a valid email address</p>
            )}
            {touched.email && !email && (
              <p className="text-detail-error mb-0 text-danger">*Email is required</p>
            )}
          </div>

          <div className="form-row mb-3">
            <label>Password</label>
            <div className="input-icon-group">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched({ ...touched, password: true })}
              />
              {touched.password &&
                (isStrongPassword(password) ? (
                  <FaCheckCircle className="icon success" />
                ) : (
                  <FaTimesCircle className="icon error" />
                ))}
            </div>
            {touched.password && !password && (
              <p className="text-detail-error mb-0 text-danger">*Password is required</p>
            )}
            {touched.password && password && !isStrongPassword(password) && (
              <p className="text-detail-error mb-0 text-danger">
                *Password must contain at least 6 characters, including one number
              </p>
            )}
          </div>

          <div className="form-row mb-4">
            <label>Confirm Password</label>
            <div className="input-icon-group">
              <input
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setTouched({ ...touched, confirmPassword: true })}
              />
              {touched.confirmPassword &&
                (doPasswordsMatch ? (
                  <FaCheckCircle className="icon success" />
                ) : (
                  <FaTimesCircle className="icon error" />
                ))}
            </div>
            {touched.confirmPassword && !confirmPassword && (
              <p className="text-detail-error mb-0 text-danger">*Please confirm your password</p>
            )}
            {touched.confirmPassword && confirmPassword && !doPasswordsMatch && (
              <p className="text-detail-error mb-0 text-danger">*Passwords do not match</p>
            )}
          </div>

          <p className="terms-label">To join, you have to accept our Terms and Conditions:</p>

          <div className="checkbox-group">
            <FormCheck
              type="checkbox"
              id="check-1"
              label="I have read and accept the Terms of the Pact."
              className="checkbox-custom"
              onChange={(e) => setChecks({ ...checks, one: e.target.checked })}
              onBlur={() => setTouched({ ...touched, checks: true })}
            />
            <FormCheck
              type="checkbox"
              id="check-2"
              label="I consent to the handling of my data by the Watchers Beyond."
              className="checkbox-custom"
              onChange={(e) => setChecks({ ...checks, two: e.target.checked })}
            />
            <FormCheck
              type="checkbox"
              id="check-3"
              label="I understand that once inside, there is no turning back."
              className="checkbox-custom"
              onChange={(e) => setChecks({ ...checks, three: e.target.checked })}
            />
          </div>

          {touched.checks && !allChecks && (
            <p className="text-detail-error text-danger">*You must accept all terms and conditions</p>
          )}

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn-primary mt-3 text-md w-100"
              disabled={!allValid}
            >
              Join
            </button>
          </div>
        </Form>

        <hr className="divider" />

        <p className="text-center text-white-custom">
          <Link to="/login" className="already-account link-none">
            I Already have an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
