import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/Navbar.css';
import '../styles/alerts.css';
import logo from '../assets/logo.png';
import PrimaryButton from './buttons/PrimaryButton';
import SecondaryButton from './buttons/SecondaryButton';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useCart } from '../context/CartContext.jsx';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Navbar = () => {
  const { token, email, logout } = useContext(UserContext);
  const { count } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    MySwal.fire({
      title: 'You are Leaving El Umbral',
      text: `Are you sure?`,
      icon: 'info',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Abandon',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'umbral-popup',
        title: 'umbral-title',
        content: 'umbral-text',
        confirmButton: 'umbral-confirm',
        cancelButton: 'umbral-cancel',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/');
      }
    });
  };

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
            
            {token && (<><NavLink className="nav-link" to="/profile">My Profile</NavLink></>)}

            <NavLink className="nav-link position-relative" to="/cart">
              <FaShoppingCart size={18} />
              {count > 0 && (
                <p
                  className="position-absolute top-20 start-180 translate-middle badge rounded-pill text-xs"
                >
                  {count}
                </p>
              )}
            </NavLink>

            {token ? (
              <>
                <PrimaryButton as={NavLink} to="/add-artifact">Add Artifact</PrimaryButton>
                <SecondaryButton onClick={handleLogout}>Log Out</SecondaryButton>
              </>
            ) : (
              <>
                <SecondaryButton as={NavLink} to="/login">Log In</SecondaryButton>
                <PrimaryButton as={NavLink} to="/signup">Sign Up</PrimaryButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
