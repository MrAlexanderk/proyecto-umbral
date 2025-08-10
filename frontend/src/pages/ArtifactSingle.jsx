import { useMemo } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import ArtifactVisual from "../components/ArtifactVisual";
import { useArtifacts } from "../context/ArtifactsContext";

const ArtifactSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { artifacts } = useArtifacts();

  const artifact = useMemo(
    () => artifacts.find(a => String(a.id) === String(id)),
    [artifacts, id]
  );

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from, { replace: false });
    } else {
      navigate(`/artifacts${location.state?.search || ""}`);
    }
  };

  if (!artifact) {
    return (
      <section className="bg-color-dark py-5">
        <Container>
          <p className="text-white-custom">Artifact not found.</p>
          <Link to="/artifacts" className="btn-secondary mt-3 text-white-custom text-spectral">
            Back to Catalog
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-color-dark py-4">
      <Container>
        <button
          type="button"
          className="btn-clear mb-3"
          onClick={handleBack}
        >
          ← Back to results
        </button>

        <ArtifactVisual artifact={artifact} />
      </Container>
    </section>
  );
};

export default ArtifactSingle;
