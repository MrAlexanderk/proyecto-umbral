import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useArtifacts } from "../context/ArtifactsContext";
import ArtifactRow from "./ArtifactRow";

const ArtifactList = () => {
  const { token } = useContext(UserContext);
  const { getMyArtifacts } = useArtifacts();

  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchArtifacts = async () => {
      if (!token) {
        if (mounted) {
          setArtifacts([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setErrorMsg("");

      try {
        const data = await getMyArtifacts();
        if (mounted) {
          setArtifacts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (mounted) {
          setErrorMsg("No se pudieron cargar tus artefactos.");
          setArtifacts([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchArtifacts();
    return () => {
      mounted = false;
    };
  }, [getMyArtifacts, token]);

  if (!token) return <p>Debes iniciar sesión para ver tus artefactos.</p>;
  if (loading) return <p>Loading artifacts...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;
  if (!artifacts.length) return <p>No artifacts found.</p>;

  return (
    <div>
      {artifacts.map((artifact) => (
        <ArtifactRow 
        key={artifact.id} 
        artifact={artifact} 
        onDeleted={(id) => setArtifacts((prev) => prev.filter((a) => a.id !== id))}
        />
      ))}
    </div>
  );
};

export default ArtifactList;
