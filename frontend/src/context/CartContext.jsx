import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const a = action.payload;
      const existing = state.items[a.id];
      const nextQty = (existing?.qty ?? 0) + (action.qty ?? 1);
      return {
        ...state,
        items: {
          ...state.items,
          [a.id]: { artifact: a, qty: nextQty }
        },
      };
    }
    case "SET_QTY": {
      const { id, qty } = action;
      if (qty <= 0) {
        const { [id]: _, ...rest } = state.items;
        return { ...state, items: rest };
      }
      return {
        ...state,
        items: {
          ...state.items,
          [id]: { ...state.items[id], qty }
        },
      };
    }
    case "REMOVE": {
      const { [action.id]: _, ...rest } = state.items;
      return { ...state, items: rest };
    }
    case "CLEAR":
      return { items: {} };
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} });

  const api = useMemo(() => {
    const entries = Object.values(state.items);
    const count = entries.reduce((acc, it) => acc + it.qty, 0);
    const subtotal = entries.reduce((acc, it) => acc + (it.artifact.price ?? 0) * it.qty, 0);

    return {
      items: entries,
      count,
      subtotal,
      addItem: (artifact, qty = 1) => dispatch({ type: "ADD", payload: artifact, qty }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

export default CartProvider;
export { useCart };