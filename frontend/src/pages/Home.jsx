import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Home.css";
import CategoryButton from "../components/CategoryButton";
import { FaSearch } from "react-icons/fa";
import { useArtifacts } from "../context/ArtifactsContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { categories } = useArtifacts();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleCategoryClick = (categoryLabel) => {
    navigate(`/artifacts?type=${encodeURIComponent(categoryLabel)}`);
  };

  const handleSearch = () => {
    const q = searchText.trim();
    if (q) {
      navigate(`/artifacts?query=${encodeURIComponent(q)}`);
    } else {
      navigate("/artifacts");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="hero-section">
        <Container className="text-center text-white-custom d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="text-spectral text-xl mb-3 text-white-custom">
            Dare to own the unholy
          </h1>
          <h2 className="text-crimson text-lg mb-4 text-gray-custom">
            Where the Cursed Finds a New Home
          </h2>
          <p className="text-crimson text-md text-white-custom paragraph-narrow hero-text">
            <b>El Umbral</b> is the first marketplace where cursed objects, haunted heirlooms, and paranormal relics await a new keeper. <br />
            Step beyond the ordinary and browse artifacts that whisper, watch, and sometimes... follow. <br />
            Dare to collect the unexplainable — each item comes with its own chilling tale. <br />
            <strong>Buy at your own peril. Sell at your own risk.</strong>
          </p>
        </Container>
      </div>

      <section className="search-section bg-color-dark">
        <Container className="text-center text-white-custom">
          <h2 className="text-spectral mb-4">Which artifact seeks a new keeper?</h2>
          <div className="search-input-wrapper" style={{ display: "flex", alignItems: "center" }}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for cursed artifacts..."
              aria-label="Search for cursed artifacts"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ flex: 1 }}
            />
            <button
              className="btn-primary m-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </Container>
      </section>

      <section className="category-section bg-color-dark">
        <Container>
          <Row className="g-2">
            {categories.map((cat) => (
              <Col xs={6} md={3} className="g-2" key={cat.id}>
                <CategoryButton
                  icon={cat.icon}
                  name={cat.label}
                  route={() => handleCategoryClick(cat.label)}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
