import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, createCheckoutSession } from "../../functions";
import { useCarritoContext } from "../../contexts/carritoContext";
import { useUserContext } from "../../contexts/userContext";
import Layout from "../../components/Layout/Layout.jsx";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./Producto.css";

function Producto() {
  const { id } = useParams();
  const navigate = useNavigate(); // Usamos useNavigate para la redirección
  const [productInfo, setProductInfo] = useState(null);
  const { carrito, setCarrito } = useCarritoContext();
  const { user } = useUserContext(); // Obtiene el estado del usuario del contexto

  useEffect(() => {
    async function getProductInfo() {
      const product = await getProductById(id);
      console.log("producto", product);
      if (!product) {
        navigate("/notfound"); // Usamos navigate en lugar de window.location
      }
      setProductInfo(product);
    }
    getProductInfo();
  }, [id, navigate]); // Agregamos navigate a las dependencias del useEffect

  function addToCart() {
    setCarrito([...carrito, productInfo]);
  }

  function handleBuyNow() {
    // Verifica si el usuario NO está autenticado
    if (!user) {
      navigate("/perfil"); // Redirige a la página de perfil para iniciar sesión
      return;
    } // Si el usuario SÍ está autenticado, continúa con el proceso de compra

    addToCart();
    createCheckoutSession(user.uid, [{ ...productInfo }]);
    const btn = document.getElementById("buy-button-producto");
    btn.isDisabled = true;
    btn.innerText = "Comprando...";
  }

  return (
    <Layout>
           {" "}
      <div
        className="container-producto"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
               {" "}
        <div
          id="producto-izquierda"
          className="imagen-producto"
          style={{ position: "relative" }}
        >
                   {" "}
          <div
            className="btn-volver-home-container"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
          >
                       {" "}
            <button
              className="btn-volver-home"
              onClick={() => navigate("/")} // Usamos navigate para volver al inicio
              aria-label="Volver al inicio"
            >
                            <AiOutlineArrowLeft size={28} color="#d44474" />   
                     {" "}
            </button>
                     {" "}
          </div>
                   {" "}
          <img
            src={productInfo?.images[0]}
            alt={productInfo?.name}
            className="max-w-full h-auto"
          />
                 {" "}
        </div>
               {" "}
        <div id="producto-derecha " className="container-descripcion-producto">
                   {" "}
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
                       {" "}
            <div className="descripcion-producto">
                           {" "}
              <h1 className="nombre-producto">{productInfo?.name}</h1>         
                 {" "}
              <p className="producto-descripcion">{productInfo?.description}</p>
                           {" "}
              <p className="producto-precio">
                               {" "}
                {productInfo?.price
                  ? `$${(productInfo.price.unit_amount / 100).toFixed(2)}`
                  : ""}
                             {" "}
              </p>
                         {" "}
            </div>
                       {" "}
            <div className="container-botones">
                           {" "}
              <button onClick={addToCart} className="boton-agregar">
                                AÑADIR A CARRITO              {" "}
              </button>
                           {" "}
              <button
                id="buy-button-producto"
                onClick={handleBuyNow} // Llama a la nueva función
                className="boton-comprarAhora"
              >
                                COMPRAR AHORA              {" "}
              </button>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </Layout>
  );
}

export default Producto;
