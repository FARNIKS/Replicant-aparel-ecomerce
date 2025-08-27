import React from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ItemSection.css";
import { useCarritoContext } from "../../contexts/carritoContext";

function ItemSection({ productos, title }) {
  const { carrito, setCarrito } = useCarritoContext();

  function handleAddToCart(product) {
    setCarrito([...carrito, product]);
  }

  return (
    <>
      <h3 className="text-2xl font-bold underline self-start ml-10 my-10">
        {title} :
      </h3>
      <ul className="container-items">
        {productos
          ? productos.map((p) => (
              <li key={p.id}>
                <ItemCard product={p} addToCart={() => handleAddToCart(p)} />
              </li>
            ))
          : null}
      </ul>
    </>
  );
}

export default ItemSection;
