import { useState } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../styles/SignUp.css';
import '../styles/Buttons.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checks, setChecks] = useState({ one: false, two: false, three: false });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isStrongPassword = (pass) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pass);
  const doPasswordsMatch = password && confirmPassword && password === confirmPassword;

  const allValid =
    username &&
    isValidEmail(email) &&
    isStrongPassword(password) &&
    doPasswordsMatch &&
    Object.values(checks).every(Boolean);

  return (
    <div className="signup-container">
      <div className="signup-box text-white-custom">
        <h1 className="text-white-custom text-xl text-spectral">Join el umbral</h1>
        <p className="subtitle text-crimson text-md">Every dream starts with one name...</p>

        <Form className="signup-form text-crimson">
            <div className="form-row mb-3">
                <label>Username</label>
                <div className="input-icon-group">
                <input
                    type="text"
                    placeholder="Your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {username ? <FaCheckCircle className="icon success" /> : <FaTimesCircle className="icon error" />}
                </div>
                {!username && <p className="text-detail-error mb-0 text-danger">*Username required</p>}
            </div>

            <div className="form-row mb-3">
                <label>Email Address</label>
                <div className="input-icon-group">
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {isValidEmail(email) ? <FaCheckCircle className="icon success" /> : <FaTimesCircle className="icon error" />}
                </div>
                {email && !isValidEmail(email) && <p className="text-detail-error mb-0 text-danger">*Enter a valid email address</p>}
                {!email && <p className="text-detail-error mb-0 text-danger">*Email is required</p>}
            </div>

            <div className="form-row mb-3">
                <label>Password</label>
                <div className="input-icon-group">
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isStrongPassword(password) ? <FaCheckCircle className="icon success" /> : <FaTimesCircle className="icon error" />}
                </div>
                {!password && <p className="text-detail-error mb-0 text-danger">*Password is required</p>}
                {password && !isStrongPassword(password) && (
                <p className="text-detail-error mb-0 text-danger">*Password must contain at least 6 characters, including one number</p>
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
                />
                {doPasswordsMatch ? <FaCheckCircle className="icon success" /> : <FaTimesCircle className="icon error" />}
                </div>
                {!confirmPassword && <p className="text-detail-error mb-0 text-danger">*Please confirm your password</p>}
                {confirmPassword && !doPasswordsMatch && <p className="text-detail-error mb-0 text-danger">*Passwords do not match</p>}
            </div>

            <p className="terms-label">To join, you have to accept our Terms and Conditions:</p>

            <div className="checkbox-group">
                <FormCheck
                type="checkbox"
                id="check-1"
                label="I have read and accept the Terms of the Pact."
                className="checkbox-custom"
                onChange={(e) => setChecks({ ...checks, one: e.target.checked })}
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

            {!Object.values(checks).every(Boolean) && (
                <p className="text-detail-error text-danger">*You must accept all terms and conditions</p>
            )}

            <p className="vows-text">El Umbral acknowledges your vows.</p>

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
