import { useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "../styles/ArtifactsStyles.css";

import ArtifactRow from "../components/ArtifactRow";
import { useArtifacts } from "../context/ArtifactsContext";

const ArtifactView = () => {
  const { artifacts, categories, getCategoryLabelById } = useArtifacts();

  const [query, setQuery] = useState("");
  // por defecto "Books", como en el mockup
  const [selectedTypes, setSelectedTypes] = useState(new Set(["Books"]));

  const toggleType = (label) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };
  const clearTypes = () => setSelectedTypes(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return artifacts.filter((a) => {
      const nameOk =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.history.toLowerCase().includes(q) ||
        a.origin.toLowerCase().includes(q);

      // type_id ahora es 1-based; tomamos el label desde el context
      const typeName = getCategoryLabelById(a.type_id);
      const typeOk = selectedTypes.size === 0 || selectedTypes.has(typeName);

      return nameOk && typeOk;
    });
  }, [artifacts, query, selectedTypes, getCategoryLabelById]);

  return (
    <>
      {/* Buscador */}
      <section className="search-section bg-color-dark">
        <Container className="text-center text-white-custom">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for cursed artifacts..."
              aria-label="Search for cursed artifacts"
            />
          </div>
        </Container>
      </section>

      {/* Contenido */}
      <section className="bg-color-dark py-4">
        <Container>
          <Row>
            {/* Sidebar de filtros */}
            <Col lg={3} className="mb-4">
              <div className="filters-panel">
                <h3 className="filters-title">Filtros</h3>

                <div className="filter-group">
                  <h4 className="filter-subtitle">Type</h4>
                  <ul className="filter-list">
                    {categories.map((c) => {
                      const Icon = c.icon;
                      return (
                        <li key={c.id}>
                          <label className="filter-check">
                            <input
                              type="checkbox"
                              checked={selectedTypes.has(c.label)}
                              onChange={() => toggleType(c.label)}
                            />
                            <span className="icon"><Icon /></span>
                            <span>{c.label}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Col>

            {/* Resultados */}
            <Col lg={9}>
              <div className="results-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div className="text-white-50 small">Resultados encontrados para:</div>
                <div className="chips d-flex flex-wrap gap-2">
                  {[...selectedTypes].map((t) => (
                    <button
                      key={t}
                      className="chip"
                      onClick={() => toggleType(t)}
                      title="Quitar filtro"
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button className="btn-clear" onClick={clearTypes}>
                  Borrar todo
                </button>
              </div>

              <Row className="g-3 mt-2">
                {filtered.map((artifact) => (
                  <Col md={6} xl={4} key={artifact.id}>
                    <ArtifactRow artifact={artifact} />
                  </Col>
                ))}
                {filtered.length === 0 && (
                  <Col xs={12}>
                    <p className="text-center text-white-50 m-5">
                      No se encontraron artefactos con esos filtros.
                    </p>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ArtifactView;
