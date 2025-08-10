import { useNavigate } from "react-router-dom";
import "../styles/CategoryButton.css";

const CategoryButton = ({ icon: Icon, name, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof route === "function") {
      route();
    } else if (typeof route === "string") {
      navigate(route);
    }
  };

  return (
    <button className="category-button" onClick={handleClick}>
      <Icon className="category-icon" />
      <p className="category-name text-crimson text-md text-white-custom">
        {name}
      </p>
    </button>
  );
};

export default CategoryButton;
