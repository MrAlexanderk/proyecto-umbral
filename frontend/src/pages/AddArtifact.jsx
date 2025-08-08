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

const categories = [
  { id: 1, name: 'Dolls' },
  { id: 2, name: 'Mirrors' },
  { id: 3, name: 'Books' },
  { id: 4, name: 'Tech' },
  { id: 5, name: 'Relics' },
  { id: 6, name: 'Lockets' },
  { id: 7, name: 'Garments' },
  { id: 8, name: 'Others' }
];

const AddArtifact = () => {
  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  const [artifactName, setartifactName] = useState('');
  const [artifactType, setArtifactType] = useState("");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checks, setChecks] = useState({ one: false, two: false, three: false });

  const [touched, setTouched] = useState({
    artifactName: false,
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
    artifactName &&
    isValidEmail(email) &&
    isStrongPassword(password) &&
    doPasswordsMatch &&
    allChecks;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allValid) return;

    try {
      await register({ email, password });

      await MySwal.fire({
        title: "Registration successful!",
        text: `The Threshold acknowledges your vows, ${artifactName}.`,
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
      navigate('/');
    } catch (error) {
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
        <h1 className="text-white-custom text-xl text-spectral">List a New Artifact</h1>
        <p className="subtitle text-crimson text-md">Everything carries a story...</p>
        <hr></hr>

        <Form className="signup-form text-crimson mt-4" onSubmit={handleSubmit}>
          <div className="form-row mb-3">
            <label className="text-md">Artifact Name</label>
            <div className="input-icon-group">
              <input
                type="text"
                placeholder="Your unholy artifact name"
                value={artifactName}
                onChange={(e) => setartifactName(e.target.value)}
                onBlur={() => setTouched({ ...touched, artifactName: true })}
              />
              {touched.artifactName &&
                (artifactName ? <FaCheckCircle className="icon success" /> : <FaTimesCircle className="icon error" />)}
            </div>
            {touched.artifactName && !artifactName && (
              <p className="text-detail-error mb-0 text-danger">*Artifact name required</p>
            )}
          </div>

          <div className="form-row mb-3">
            <label>Artifact Type</label>
            <div className="input-icon-group">
              <select
                value={artifactType}
                onChange={(e) => setArtifactType(e.target.value)}
                onBlur={() => setTouched({ ...touched, artifactType: true })}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {touched.artifactType && !artifactType && (
              <p className="text-detail-error mb-0 text-danger">*Category is required</p>
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

export default AddArtifact;
