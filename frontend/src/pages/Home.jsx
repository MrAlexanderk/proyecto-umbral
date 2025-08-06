import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Home.css';
import CategoryButton from '../components/CategoryButton';
import { FaBookDead, FaMicrochip, FaQuestionCircle, FaSearch } from 'react-icons/fa';
import {
  GiMirrorMirror,
  GiAncientSword,
  GiDiamondRing,
  GiClothes,
  GiSkeleton,
} from 'react-icons/gi';

const categories = [
  { label: 'Dolls', icon: GiSkeleton, to: '/category/dolls' }, // reemplazo de GiDoll
  { label: 'Mirrors', icon: GiMirrorMirror, to: '/category/mirrors' },
  { label: 'Books', icon: FaBookDead, to: '/category/books' },
  { label: 'Tech', icon: FaMicrochip, to: '/category/tech' },
  { label: 'Relics', icon: GiAncientSword, to: '/category/relics' },
  { label: 'Lockets', icon: GiDiamondRing, to: '/category/lockets' },
  { label: 'Garments', icon: GiClothes, to: '/category/garments' },
  { label: 'Others', icon: FaQuestionCircle, to: '/category/others' },
];

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
          <p className="text-crimson text-md text-white-custom paragraph-narrow">
            <b>El Umbral</b> is the first marketplace where cursed objects, haunted heirlooms, and paranormal relics await a new keeper. <br />Step beyond the ordinary and browse artifacts that whisper, watch, and sometimes... follow. <br />
            Dare to collect the unexplainable — each item comes with its own chilling tale. <br />
            <strong>Buy at your own peril. Sell at your own risk.</strong>
          </p>
        </Container>
      </div>

      <section className="search-section py-5 bg-color-dark">
        <Container className="text-center text-white-custom">
            <h2 className="text-spectral mb-4">Which artifact seeks a new keeper?</h2>
            <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search for cursed artifacts..."
                    aria-label="Search for cursed artifacts"
                />
            </div>
        </Container>
      </section>

      <section className="category-section py-5 bg-color-dark">
        <Container>
            <Row className="g-2">
                {categories.map((cat, index) => (
                    <Col xs={6} md={3} className="g-2" key={index}>
                    <CategoryButton icon={cat.icon} name={cat.label} route={cat.to} />
                    </Col>
                ))}
            </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
