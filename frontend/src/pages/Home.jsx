import React from 'react';
import { Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
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
          <p className="text-crimson text-md text-white-custom hero-text">
            <b>El Umbral</b> is the first marketplace where cursed objects, haunted heirlooms, and paranormal relics await a new keeper. <br />
            Step beyond the ordinary and browse artifacts that whisper, watch, and sometimes... follow. <br />
            Dare to collect the unexplainable — each item comes with its own chilling tale. <br />
            <strong>Buy at your own peril. Sell at your own risk.</strong>
          </p>
        </Container>
      </div>

      <div className="search-section">
        <h2 className= "mb-4 text-white-custom text-spectral">Which artifact seeks a new keeper?</h2>
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for cursed artifacts..."
            aria-label="Search for cursed artifacts"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
