import React from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";

function ItemCard({ product, addToCart }) {
  return (
    <div className="ItemCard">
      <Link to={`/producto/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
        />
      </Link>
      <h3>{product.name}</h3>
      <div className="price-items">
        <p className="line-through">
          ${(product.price.unit_amount * 1.5) / 100}
        </p>
        <span> → </span>
        <span>
          <p>${product.price.unit_amount / 100}</p>
        </span>
        {product.price.currency}
      </div>
      <button onClick={addToCart} className="add-to-cart-button">
        AÑADIR A CARRITO
      </button>
    </div>
  );
}

export default ItemCard;
