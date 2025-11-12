import React from "react";
import { useCarritoContext } from "../../contexts/carritoContext";
import "../ItemCard/ItemCard.css";
import "./CartItem.css";

function CartItem({ producto, onRemove }) {
  const { updateCantidad } = useCarritoContext();

  const handleIncrementar = () => {
    updateCantidad(producto.id, producto.cantidad + 1);
  };

  const handleDecrementar = () => {
    if (producto.cantidad > 1) {
      updateCantidad(producto.id, producto.cantidad - 1);
    } else {
      // Si la cantidad es 1 y se presiona menos, eliminar
      onRemove();
    }
  };

  return (
    <div className="ItemCard cart-item-container">
      <img
        src={producto.images[0]}
        alt={producto.name}
        className="product-image cart-image"
      />
      <div className="cart-item-info">
        <h3 className="font-bold text-xl">{producto.name}</h3>
        <div className="cantidad-controls">
          <button
            onClick={handleDecrementar}
            className="btn-cantidad btn-menos"
            title="Disminuir cantidad"
          >
            −
          </button>
          <span className="cantidad-display">{producto.cantidad}</span>
          <button
            onClick={handleIncrementar}
            className="btn-cantidad btn-mas"
            title="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>
      <div className="price-items">
        <div className="items-price-container">
          <p>${(producto.price.unit_amount / 100).toFixed(2)}</p>
        </div>
        <button
          onClick={onRemove}
          className="add-to-cart-button eliminar-btn"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CartItem;
