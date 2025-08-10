import { Container, Row, Col } from "react-bootstrap";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";

import "../styles/styles.css";

const formatMoney = (n) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n || 0);

export default function Cart() {
  const { items, subtotal, setQty, removeItem, clear } = useCart();

  const taxes = 0;
  const total = subtotal + taxes;

  return (
    <section className="bg-color-dark py-4 text-crimson">
      <Container>
        <header className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <h1 className="text-spectral text-white-custom m-0">Your Basket</h1>
          {items.length > 0 && (
            <button className="btn-clear" onClick={clear}>
              Clear all
            </button>
          )}
        </header>

        {items.length === 0 ? (
          <p className="text-gray-custom">Your basket is empty.</p>
        ) : (
          <Row className="g-4">
            <Col lg={8}>
              <ul className="list-unstyled m-0 p-0">
                {items.map(({ artifact, qty }) => (
                  <li key={artifact.id} className="artifact-card p-2 mb-3">
                    <div className="d-flex gap-3 align-items-start">
                      {artifact.image && (
                        <img
                          src={artifact.image}
                          alt={artifact.name}
                          style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 12 }}
                        />
                      )}

                      <div className="flex-grow-1 text-gray-custom">
                        <h3 className="text-white-custom text-spectral m-0">{artifact.name}</h3>
                        <div className="small mt-1">
                          {artifact.origin} · {artifact.age} y/o
                        </div>
                        <div className="small">
                          Unit: <strong>{formatMoney(artifact.price)}</strong>
                        </div>

                        <div className="d-flex align-items-center gap-2 mt-2">
                          <button
                            className="btn-secondary text-white-custom text-s"
                            onClick={() => setQty(artifact.id, Math.max(0, qty - 1))}
                            aria-label="Decrease quantity"
                          >
                            <FaMinus />
                          </button>
                          <span
                            className="text-white-custom"
                            style={{ minWidth: 24, textAlign: "center" }}
                          >
                            {qty}
                          </span>
                          <button
                            className="btn-secondary text-white-custom text-s"
                            onClick={() => setQty(artifact.id, qty + 1)}
                            aria-label="Increase quantity"
                          >
                            <FaPlus />
                          </button>

                          <button
                            className="btn-clear ms-2"
                            onClick={() => removeItem(artifact.id)}
                            aria-label="Remove item"
                          >
                            <FaTrash /> Remove
                          </button>
                        </div>
                      </div>

                      <div
                        className="text-white-custom text-spectral"
                        style={{ minWidth: 100, textAlign: "right" }}
                      >
                        {formatMoney((artifact.price || 0) * qty)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Col>

            <Col lg={4}>
              <aside className="artifact-card p-3">
                <h3 className="text-spectral text-white-custom m-0">Order Summary</h3>
                <div className="d-flex justify-content-between mt-3 text-gray-custom">
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between text-gray-custom">
                  <span>Taxes</span>
                  <span>{formatMoney(taxes)}</span>
                </div>
                <hr className="my-3" />
                <div className="d-flex justify-content-between align-items-center">
                  <strong className="text-white-custom">Total</strong>
                  <strong className="text-white-custom">{formatMoney(total)}</strong>
                </div>
                <button className="btn-secondary mt-3 w-100 text-white-custom text-spectral text-md">
                  Checkout
                </button>
              </aside>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}
