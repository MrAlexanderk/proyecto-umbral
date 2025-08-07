import { NavLink } from 'react-router-dom';
import '../../styles/Buttons.css';

const PrimaryButton = ({ to, children, ...props }) => {
  if (to) {
    return (
      <NavLink 
        to={to} 
        className="btn-primary text-spectral text-white-custom"
        {...props}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button
      className="btn-primary text-spectral text-white-custom"
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
