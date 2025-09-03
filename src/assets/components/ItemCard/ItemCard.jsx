import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./ItemCard.css";

function ItemCard({ product, addToCart }) {
  return (
    <div className="ItemCard">
      <Link to={`/producto/${product.id}`}>
        <div className="image-container">
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-image card-image"
          />
        </div>
      </Link>
      <h3>{product.name}</h3>
      <div className="price-items">
        <span className="items-price-container">
          <p>
            ${product.price.unit_amount / 100}{" "}
            {String(product.price.currency).toUpperCase()}
          </p>
        </span>

        <button onClick={addToCart} className="add-to-cart-button">
          <span className="cart-icon-btn">
            <AiOutlineShoppingCart size={22} />
          </span>
          <span className="cart-btn-text">AÑADIR A CARRITO</span>
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
