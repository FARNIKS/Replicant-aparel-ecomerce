import React from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";

function ItemCard({ product }) {
  return (
    <Link to={`/producto/${product.id}`}>
      <div
        className="ItemCard"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="min-w-full h-auto"
        />
        <h3 className="font-bold text-xl">{product.name}</h3>
        <p className="text-slate-500">{product.description}</p>
        <div className="price-items">
          <p className="text-slate-600 line-through">
            ${(product.price.unit_amount * 1.5) / 100}
          </p>
          <span className="mx-2"> →</span>
          <span className="flex items-center">
            <p className="font-bold mx-1 text-lg">
              ${product.price.unit_amount / 100}
            </p>
          </span>
          {product.price.currency}
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;