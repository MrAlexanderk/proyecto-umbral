import { NavLink } from 'react-router-dom';
import '../../styles/Buttons.css';


const PrimaryButton = ({ to, children, ...props }) => {
  return (
    <NavLink 
      to={to} 
      className="btn-primary text-spectral text-white-custom"
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default PrimaryButton;