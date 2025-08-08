import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import '../styles/ArtifactList.css';

const ArtifactList = () => {
  const { getArtifactsFromUser, token } = useContext(UserContext);
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtifacts = async () => {
      if (!token) return;
      setLoading(true);
      const data = await getArtifactsFromUser();
      setArtifacts(data);
      setLoading(false);
    };

    fetchArtifacts();
  }, [getArtifactsFromUser, token]);

  if (loading) return <p>Loading artifacts...</p>;
  if (!artifacts.length) return <p>No artifacts found.</p>;

  return (
    <div className="artifact-list text-crimson">
      {artifacts.map((artifact) => (
        <div key={artifact.id} className="artifact-card">
          <img src={artifact.image} alt={artifact.name} className="image" />

          <div className="content">
            <div className="header">
              <h2 className="title text-spectral">{artifact.name}</h2>
              <span className="status">ACTIVE</span>
              <div className="actions">
                <button className="editBtn">✎</button>
                <button className="closeBtn">✖</button>
              </div>
            </div>

            <div className="details">
              <div className="left">
                <h3 className="type">{artifact.type}</h3>
                <p className="description">{artifact.description}</p>
                <p className="history">{artifact.history}</p>
              </div>

              <div className="right">
                <p><strong>Origin:</strong> <em>{artifact.origin}</em></p>
                <p><strong>Age:</strong> <em>{artifact.age}</em></p>
                <p><strong>Seller:</strong> <em>{artifact.seller}</em></p>
                <p><strong>Price:</strong> <span className="price">${artifact.price}</span></p>
                <p><small>Created at: {new Date(artifact.created_at).toLocaleDateString()}</small></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtifactList;
