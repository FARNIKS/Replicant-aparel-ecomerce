import React from "react";
import "../ItemCard/ItemCard.css";

function CartItem({ producto, onRemove }) {
  return (
    <div className="ItemCard">
      <img
        src={producto.images[0]}
        alt={producto.name}
        className="product-image"
      />
      <h3 className="font-bold text-xl">{producto.name}</h3>
      <div className="price-items">
        <p className="line-through">
          ${(producto.price.unit_amount * 1.5) / 100}
        </p>
        <span> → </span>
        <span>
          <p className="font-bold mx-1 text-lg">
            ${producto.price.unit_amount / 100}
          </p>
        </span>
        {producto.price.currency}
      </div>
      <button onClick={onRemove} className="add-to-cart-button" style={{marginTop: '10px', background: '#e53935'}}>
        Eliminar
      </button>
    </div>
  );
}

export default CartItem;
