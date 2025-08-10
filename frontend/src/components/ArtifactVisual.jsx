import { useState, useEffect, useContext } from "react";
import "../styles/ArtifactVisual.css";
import "../styles/styles.css";
import { UserContext } from "../context/UserContext";

const ArtifactVisual = ({ artifact }) => {
  const { getTypeNameById } = useContext(UserContext);
  const [typeName, setTypeName] = useState('');

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

  return (
    <div className="artifact-card artifact-card-visual">
        <div className="superior-section">
            <div className="text-gray-custom text-md m-0 p-0">
                <h2 className="text-lg text-spectral text-white-custom m-0 p-0">{artifact.name}</h2>
                <h3 className="m-0 p-0">{typeName}</h3>
                <p className="m-0 p-0 text-s history-text">{artifact.description}</p>
            </div>
            {artifact.image && <img src={artifact.image} alt={artifact.name} className="artifact-image-card" />}
        </div>

        <div className="inferior-section">
            <div className="left-side text-gray-custom">
                <h3 className="text-spectral text-md m-0 p-0">History</h3>
                <p className="m-0 p-0 text-s history-text">{artifact.history}</p>
            </div>
            <div className="right-side text-gray-custom">
                <div>
                    <h3 className="text-spectral text-s m-0 p-0">Origin</h3>
                    <p className="text-xs history-text"><em>{artifact.origin}</em></p>
                </div>
                <div>
                    <h3 className="text-spectral text-s m-0 p-0">Age</h3>
                    <p className="text-xs history-text"><em>{artifact.age} y/o</em></p>  
                </div>
                <div>
                    <h3 className="text-spectral text-s m-0 p-0">Seller</h3>
                    <p className="text-xs history-text"><em>{artifact.seller}</em></p>
                </div>
            </div>
        </div>
        <div className="price-section">
            <h2 className="text-white-custom">${artifact.price}</h2>
            <button
              type="button"
              className="btn-secondary mt-3 text-md text-white-custom text-spectral add-bastket-btn"
            >
              Add to Basket
            </button>
        </div>
    </div>
  );
};

export default ArtifactVisual;
