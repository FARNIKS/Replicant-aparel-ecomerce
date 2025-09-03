import React from "react";
import "../ItemCard/ItemCard.css";

function CartItem({ producto, onRemove }) {
  return (
    <div className="ItemCard">
      <img
        src={producto.images[0]}
        alt={producto.name}
        className="product-image cart-image"
      />
      <h3 className="font-bold text-xl">{producto.name}</h3>
      <div className="price-items">
        <div className="items-price-container">
          <p>${producto.price.unit_amount / 100}</p>
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
