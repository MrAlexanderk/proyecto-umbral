import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ArtifactCard.css";
import "../styles/styles.css";
import { UserContext } from "../context/UserContext";

const ArtifactCard = ({ artifact }) => {
  const { getTypeNameById, token } = useContext(UserContext);
  const [typeName, setTypeName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTypeName = async () => {
      if (!artifact.type_id) {
        setTypeName('No Encontrado');
        return;
      }
      const name = await getTypeNameById(artifact.type_id);
      setTypeName(name || 'XXX');
    };
    fetchTypeName();
  }, [artifact.type_id, getTypeNameById]);

  const goToDetail = () => {
    navigate(`/artifacts/${artifact.id}`, {
      state: { from: location.pathname + location.search, search: location.search }
    });
  };

  return (
    <div className="artifact-card artifact-card-visual text-crimson">
      <div className="superior-section-card">
        {artifact.image && <img src={artifact.image} alt={artifact.name} className="superior-image" />}
      </div>

      <div className="text-gray-custom text-md m-0 p-0 inferior-section-card">
        <h2 className="text-md text-spectral text-white-custom m-0 p-0">{artifact.name}</h2>
        <h3 className="m-0 p-0 text-md">{typeName}</h3>
        <p className="m-0 p-0 history-text">{artifact.description}</p>
      </div>

      <div className="price-section-card">
        <h2 className="">${artifact.price}</h2>
        <button
          type="button"
          className="btn-secondary mt-3 text-s w-100 text-white-custom text-spectral"
          onClick={goToDetail}
        >
          {token ? "Dare To Learn More" : "Join to Learn More"}
        </button>
      </div>
    </div>
  );
};

export default ArtifactCard;
