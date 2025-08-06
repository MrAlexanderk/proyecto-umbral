import { NavLink } from 'react-router-dom';
import '../../styles/Buttons.css';

const SecondaryButton = ({ to, children, ...props }) => {
  return (
    <NavLink 
      to={to} 
      className="btn-secondary text-spectral text-white-custom"
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default SecondaryButton;