import { useMemo, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import "../styles/ArtifactsStyles.css";

import ArtifactCard from "../components/ArtifactCard";
import PaginationBar from "../components/PaginationBar";
import { useArtifacts } from "../context/ArtifactsContext";

// ESTE COMPONENTE ESTÁ CREADO DE FORMA DUMMY PORQUE NO TENGO EL BACKEND TODAVÍA
// APENAS LO TENGA CAMBIARÁ COMPLETAMENTE PARA UTILIZAR EL URL AL IGUAL QUE HACEN LOS BOTONES DE LAS CATEGORÍAS DEl HOME
// PERO LA VERDAD CREO QUE ES MÁS FÁCIL PARA ESTE COMPONENTE EN PARTICULAR HACERLO EN CONJUNTO CON EL BACK END <3

const PAGE_SIZE_OPTIONS = [6, 12, 24, 48];

const ArtifactView = () => {
  const { artifacts, categories, getCategoryLabelById } = useArtifacts();

  const [query, setQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [selectedOrigins, setSelectedOrigins] = useState(new Set());

  // Estados de colapso por sección
  const [openType, setOpenType] = useState(true);
  const [openOrigin, setOpenOrigin] = useState(true);
  const [openAge, setOpenAge] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);

  // Paginación
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const navigate = useNavigate();
  const location = useLocation();
  const mounted = useRef(false);

  const toggleType = (label) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const toggleOrigin = (origin) => {
    setSelectedOrigins((prev) => {
      const next = new Set(prev);
      next.has(origin) ? next.delete(origin) : next.add(origin);
      return next;
    });
  };

  // Lee parámetros de la URL (type, query, page, size) y los aplica al estado
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const typeParam = params.get("type");
    const queryParam = params.get("query");
    const pageParam = parseInt(params.get("page") || "1", 10);
    const sizeParam = parseInt(params.get("size") || "12", 10);

    if (typeParam) setSelectedTypes(new Set([typeParam]));
    if (typeof queryParam === "string") setQuery(queryParam);

    setPage(Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1);
    setPageSize(PAGE_SIZE_OPTIONS.includes(sizeParam) ? sizeParam : 12);
  }, [location.search]);

  // Orígenes únicos derivados de los artefactos (ordenados alfabéticamente)
  const allOrigins = useMemo(() => {
    const set = new Set(artifacts.map((a) => a.origin).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [artifacts]);

  // Rango de edad/price detectado desde datos
  const { dataAgeMin, dataAgeMax, dataPriceMin, dataPriceMax } = useMemo(() => {
    const ages = artifacts.map((a) => a.age ?? 0);
    const prices = artifacts.map((a) => a.price ?? 0);
    return {
      dataAgeMin: ages.length ? Math.min(...ages) : 0,
      dataAgeMax: ages.length ? Math.max(...ages) : 0,
      dataPriceMin: prices.length ? Math.min(...prices) : 0,
      dataPriceMax: prices.length ? Math.max(...prices) : 0,
    };
  }, [artifacts]);

  // Valores controlados de los inputs de rango
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(0);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  // Re-Inicializa cuando llegan/ cambian datos
  useEffect(() => {
    setAgeMin(dataAgeMin);
    setAgeMax(dataAgeMax);
    setPriceMin(dataPriceMin);
    setPriceMax(dataPriceMax);
  }, [dataAgeMin, dataAgeMax, dataPriceMin, dataPriceMax]);

  const clearTypes = () => setSelectedTypes(new Set());
  const clearOrigins = () => setSelectedOrigins(new Set());
  const clearAge = () => {
    setAgeMin(dataAgeMin);
    setAgeMax(dataAgeMax);
  };
  const clearPrice = () => {
    setPriceMin(dataPriceMin);
    setPriceMax(dataPriceMax);
  };
  const clearQuery = () => setQuery("");
  const clearAll = () => {
    clearQuery();
    clearTypes();
    clearOrigins();
    clearAge();
    clearPrice();
    setPage(1);
    const params = new URLSearchParams(location.search);
    params.set("page", "1");
    params.set("size", String(pageSize));
    navigate({ pathname: location.pathname, search: `?${params.toString()}` }, { replace: true });
  };

  const clampNumber = (v, min, max) => {
    const n = Number.isFinite(+v) ? +v : min;
    return Math.min(Math.max(n, min), max);
  };

  // --- FILTRADO ---
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const minAge = Math.min(ageMin, ageMax);
    const maxAge = Math.max(ageMin, ageMax);
    const minPrice = Math.min(priceMin, priceMax);
    const maxPrice = Math.max(priceMin, priceMax);

    return artifacts.filter((a) => {
      const nameOk =
        !q ||
        (a.name && a.name.toLowerCase().includes(q)) ||
        (a.history && a.history.toLowerCase().includes(q)) ||
        (a.origin && a.origin.toLowerCase().includes(q));

      const typeName = getCategoryLabelById(a.type_id);
      const typeOk = selectedTypes.size === 0 || selectedTypes.has(typeName);

      const originOk = selectedOrigins.size === 0 || selectedOrigins.has(a.origin);

      const ageVal = a.age ?? 0;
      const ageOk = ageVal >= minAge && ageVal <= maxAge;

      const priceVal = a.price ?? 0;
      const priceOk = priceVal >= minPrice && priceVal <= maxPrice;

      return nameOk && typeOk && originOk && ageOk && priceOk;
    });
  }, [
    artifacts,
    query,
    selectedTypes,
    selectedOrigins,
    ageMin,
    ageMax,
    priceMin,
    priceMax,
    getCategoryLabelById,
  ]);

  // Reset a página 1 cuando cambian filtros en cliente
  useEffect(() => {
    if (mounted.current) {
      setPage(1);
    } else {
      mounted.current = true;
    }
  }, [query, selectedTypes, selectedOrigins, ageMin, ageMax, priceMin, priceMax]);

  // Derivados de paginación
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(total, startIdx + pageSize);
  const pageItems = filtered.slice(startIdx, endIdx);

  // Navegación y tamaño (sincronizan con URL)
  const goToPage = (p) => {
    const target = Math.max(1, Math.min(p, totalPages));
    setPage(target);
    const params = new URLSearchParams(location.search);
    params.set("page", String(target));
    params.set("size", String(pageSize));
    navigate({ pathname: location.pathname, search: `?${params.toString()}` });
  };

  const changePageSize = (newSize) => {
    const size = PAGE_SIZE_OPTIONS.includes(newSize) ? newSize : 12;
    setPageSize(size);
    setPage(1);
    const params = new URLSearchParams(location.search);
    params.set("page", "1");
    params.set("size", String(size));
    navigate({ pathname: location.pathname, search: `?${params.toString()}` });
  };

  const formatMoney = (n) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const HeaderToggle = ({ open, onClick, title, controlsId }) => (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controlsId}
      style={{
        background: "none",
        border: "none",
        color: "inherit",
        padding: 0,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
      title={open ? "Ocultar" : "Mostrar"}
    >
      <FaChevronDown
        style={{
          transition: "transform 0.2s ease",
          transform: open ? "rotate(0deg)" : "rotate(-90deg)",
        }}
      />
      <span>{title}</span>
    </button>
  );

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
      <section className="bg-color-dark py-4 text-crimson">
        <Container>
          <Row>
            {/* Sidebar de filtros */}
            <Col lg={3} className="mb-4">
              <div className="filters-panel">
                <h3 className="filters-title text-spectral">Filtros</h3>

                {/* Type */}
                <div className="filter-group">
                  <h4 className="filter-subtitle d-flex justify-content-between align-items-center text-white-custom">
                    <HeaderToggle
                      open={openType}
                      onClick={() => setOpenType((v) => !v)}
                      title="Type"
                      controlsId="filter-type"
                    />
                    <button className="btn-clear" onClick={clearTypes}>Clear</button>
                  </h4>
                  <div id="filter-type" hidden={!openType}>
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

                {/* Origin */}
                <div className="filter-group">
                  <h4 className="filter-subtitle d-flex justify-content-between align-items-center text-white-custom">
                    <HeaderToggle
                      open={openOrigin}
                      onClick={() => setOpenOrigin((v) => !v)}
                      title="Origin"
                      controlsId="filter-origin"
                    />
                    <button className="btn-clear" onClick={clearOrigins}>Clear</button>
                  </h4>
                  <div id="filter-origin" hidden={!openOrigin}>
                    <ul className="filter-list">
                      {allOrigins.map((o) => (
                        <li key={o}>
                          <label className="filter-check">
                            <input
                              type="checkbox"
                              checked={selectedOrigins.has(o)}
                              onChange={() => toggleOrigin(o)}
                            />
                            <span>{o}</span>
                          </label>
                        </li>
                      ))}
                      {allOrigins.length === 0 && (
                        <li className="text-gray-custom small">No hay orígenes disponibles</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Age */}
                <div className="filter-group">
                  <h4 className="filter-subtitle d-flex justify-content-between align-items-center text-white-custom">
                    <HeaderToggle
                      open={openAge}
                      onClick={() => setOpenAge((v) => !v)}
                      title="Age (years)"
                      controlsId="filter-age"
                    />
                    <button className="btn-clear" onClick={clearAge}>Reset</button>
                  </h4>
                  <div id="filter-age" hidden={!openAge}>
                    <div className="range-row text-gray-custom">
                      <div className="range-field">
                        <label className="range-label m-2">Min</label>
                        <input
                          className="input-square"
                          type="number"
                          min={dataAgeMin}
                          max={dataAgeMax}
                          value={ageMin}
                          onChange={(e) => setAgeMin(clampNumber(e.target.value, dataAgeMin, dataAgeMax))}
                        />
                      </div>
                      <div className="range-sep">—</div>
                      <div className="range-field">
                        <label className="range-label m-2">Max</label>
                        <input
                          className="input-square"
                          type="number"
                          min={dataAgeMin}
                          max={dataAgeMax}
                          value={ageMax}
                          onChange={(e) => setAgeMax(clampNumber(e.target.value, dataAgeMin, dataAgeMax))}
                        />
                      </div>
                    </div>
                    <div className="tiny-hint text-gray-custom">Rango de datos: {dataAgeMin}–{dataAgeMax}</div>
                  </div>
                </div>

                {/* Price */}
                <div className="filter-group">
                  <h4 className="filter-subtitle d-flex justify-content-between align-items-center text-white-custom">
                    <HeaderToggle
                      open={openPrice}
                      onClick={() => setOpenPrice((v) => !v)}
                      title="Price"
                      controlsId="filter-price"
                    />
                    <button className="btn-clear" onClick={clearPrice}>Reset</button>
                  </h4>
                  <div id="filter-price" hidden={!openPrice}>
                    <div className="range-row text-gray-custom">
                      <div className="range-field">
                        <label className="range-label m-2">Min</label>
                        <input
                          className="input-square"
                          type="number"
                          min={dataPriceMin}
                          max={dataPriceMax}
                          step="100"
                          value={priceMin}
                          onChange={(e) => setPriceMin(clampNumber(e.target.value, dataPriceMin, dataPriceMax))}
                        />
                      </div>
                      <div className="range-sep">—</div>
                      <div className="range-field">
                        <label className="range-label m-2">Max</label>
                        <input
                          className="input-square"
                          type="number"
                          min={dataPriceMin}
                          max={dataPriceMax}
                          step="100"
                          value={priceMax}
                          onChange={(e) => setPriceMax(clampNumber(e.target.value, dataPriceMin, dataPriceMax))}
                        />
                      </div>
                    </div>
                    <div className="tiny-hint text-gray-custom">
                      Rango de datos: {formatMoney(dataPriceMin)}–{formatMoney(dataPriceMax)}
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* Resultados */}
            <Col lg={9}>
              <div className="results-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div className="text-gray-custom small">Artifacts found for:</div>

                <div className="chips d-flex flex-wrap gap-2">
                  {query.trim() !== "" && (
                    <button className="chip" onClick={clearQuery} title="Quitar búsqueda">
                      “{query.trim()}”
                    </button>
                  )}
                  {[...selectedTypes].map((t) => (
                    <button key={`type-${t}`} className="chip" onClick={() => toggleType(t)} title="Quitar filtro">
                      {t}
                    </button>
                  ))}
                  {[...selectedOrigins].map((o) => (
                    <button key={`origin-${o}`} className="chip" onClick={() => toggleOrigin(o)} title="Quitar filtro">
                      {o}
                    </button>
                  ))}
                  {(ageMin !== dataAgeMin || ageMax !== dataAgeMax) && (
                    <button className="chip" onClick={clearAge} title="Resetear Age">
                      Age: {ageMin}–{ageMax}
                    </button>
                  )}
                  {(priceMin !== dataPriceMin || priceMax !== dataPriceMax) && (
                    <button className="chip" onClick={clearPrice} title="Resetear Price">
                      Price: {formatMoney(priceMin)}–{formatMoney(priceMax)}
                    </button>
                  )}
                </div>

                <button className="btn-clear" onClick={clearAll}>Clear all</button>
              </div>

              {/* Paginado superior */}
              <PaginationBar
                total={total}
                startIdx={startIdx}
                endIdx={endIdx}
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageChange={goToPage}
                onPageSizeChange={changePageSize}
              />

              <Row className="g-3 mt-2">
                {pageItems.map((artifact) => (
                  <Col md={6} xl={4} key={artifact.id}>
                    <ArtifactCard artifact={artifact} />
                  </Col>
                ))}
                {pageItems.length === 0 && (
                  <Col xs={12}>
                    <p className="text-center text-gray-custom m-5">
                      Artifacts not found.
                    </p>
                  </Col>
                )}
              </Row>

              {/* Paginado inferior */}
              <PaginationBar
                total={total}
                startIdx={startIdx}
                endIdx={endIdx}
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageChange={goToPage}
                onPageSizeChange={changePageSize}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ArtifactView;
