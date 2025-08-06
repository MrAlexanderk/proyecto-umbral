import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';
import PrimaryButton from './buttons/PrimaryButton';
import SecondaryButton from './buttons/SecondaryButton';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand logo d-flex align-items-center text-white-custom text-spectral" to="/">
          <img src={logo} alt="El Umbral Logo" className="navbar-logo" />
          El Umbral
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto gap-3 text-white-custom text-spectral">
            <NavLink className="nav-link" to="/" end>Home</NavLink>
            <NavLink className="nav-link" to="/artifacts">Artifacts</NavLink>
            <NavLink className="nav-link" to="/collections">Collections</NavLink>
            <NavLink className="nav-link" to="/cart">
              <FaShoppingCart size={18} />
            </NavLink>
            <SecondaryButton as={NavLink} to="/login">Log In</SecondaryButton>
            <PrimaryButton as={NavLink} to="/signup">Sign Up</PrimaryButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
