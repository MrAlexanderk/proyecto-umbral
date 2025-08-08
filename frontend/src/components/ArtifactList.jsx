import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import ArtifactRow from './ArtifactRow';
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
    <div className="artifact-list">
      {artifacts.length === 0 ? (
        <p>No artifacts found.</p>
      ) : (
        artifacts.map((artifact) => (
          <ArtifactRow key={artifact.id} artifact={artifact} />
        ))
      )}
    </div>
  );
};

export default ArtifactList;
