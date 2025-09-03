import React from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useCarritoContext } from "../../contexts/carritoContext";
import "./ItemSection.css";

function ItemSection({ productos, title }) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (productos && productos.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [productos]);
  const { carrito, setCarrito } = useCarritoContext();

  function handleAddToCart(product) {
    setCarrito([...carrito, product]);
  }

  return (
    <>
      <div className="item-section-header">
        <h3>{title} :</h3>
      </div>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <div className="spinner-text">Cargando...</div>
        </div>
      ) : (
        <ul className="container-items">
          {productos.map((p) => (
            <li key={p.id}>
              <ItemCard product={p} addToCart={() => handleAddToCart(p)} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ItemSection;
