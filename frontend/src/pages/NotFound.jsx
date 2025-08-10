import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/styles.css";

export default function NotFound() {
  return (
    <section className="bg-color-dark d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Container className="text-center">
        <h1 className="text-spectral text-white-custom display-1 fw-bold">404</h1>
        <h2 className="text-spectral text-white-custom mb-3">Page Is Missing</h2>
        <p className="text-gray-custom mb-0">
          The page you are looking for tried to leave El Umbral.
        </p>
        <p className="mb-4 text-danger">
          Nobody leaves El Umbral.
        </p>
        <Link
          to="/"
          className="btn-secondary text-white-custom text-spectral text-md"
        >
          Go Back Home
        </Link>
      </Container>
    </section>
  );
}
