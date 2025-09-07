import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById, createCheckoutSession } from "../../functions";
import { useCarritoContext } from "../../contexts/carritoContext";
import { useUserContext } from "../../contexts/userContext";
import Layout from "../../components/Layout/Layout.jsx";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./Producto.css";

function Producto() {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const { carrito, setCarrito } = useCarritoContext();
  const { user } = useUserContext();
  useEffect(() => {
    async function getProductInfo() {
      const product = await getProductById(id);
      console.log("producto", product);
      if (!product) {
        window.location = "/notfound";
      }
      setProductInfo(product);
    }
    getProductInfo();
  }, [id]);

  function addToCart() {
    setCarrito([...carrito, productInfo]);
  }

  return (
    <Layout>
      <div
        className="container-producto"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <div
          id="producto-izquierda"
          className="imagen-producto"
          style={{ position: "relative" }}
        >
          <div
            className="btn-volver-home-container"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
          >
            <button
              className="btn-volver-home"
              onClick={() => (window.location = "/")}
              aria-label="Volver al inicio"
            >
              <AiOutlineArrowLeft size={28} color="#d44474" />
            </button>
          </div>
          <img
            src={productInfo?.images[0]}
            alt={productInfo?.name}
            className="max-w-full h-auto"
          />
        </div>
        <div id="producto-derecha " className="container-descripcion-producto">
          <div
            className="descripcion-bloque-central"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div className="descripcion-producto">
              <h1 className="nombre-producto">{productInfo?.name}</h1>
              <p className="producto-descripcion">{productInfo?.description}</p>
              <p className="producto-precio">
                {productInfo?.price
                  ? `$${(productInfo.price.unit_amount / 100).toFixed(2)}`
                  : ""}
              </p>
            </div>
            <div className="container-botones">
              <button onClick={addToCart} className="boton-agregar">
                AÑADIR A CARRITO
              </button>
              <button
                id="buy-button-producto"
                onClick={() => {
                  addToCart();
                  createCheckoutSession(user.uid, [{ ...productInfo }]);
                  const btn = document.getElementById("buy-button-producto");
                  btn.isDisabled = true;
                  btn.innerText = "Comprando...";
                }}
                className="boton-comprarAhora"
              >
                COMPRAR AHORA
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Producto;
