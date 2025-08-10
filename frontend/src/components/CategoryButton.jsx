import { useNavigate } from "react-router-dom";
import "../styles/CategoryButton.css";

const CategoryButton = ({ icon: Icon, name, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof route === "function") {
      // si recibimos una función, la ejecutamos
      route();
    } else if (typeof route === "string") {
      // si recibimos un string, navegamos a esa ruta
      navigate(route);
    }
  };

  return (
    <button className="category-button" onClick={handleClick}>
      <Icon className="category-icon" />
      <span className="category-name text-crimson text-md text-white-custom">
        {name}
      </span>
    </button>
  );
};

export default CategoryButton;
