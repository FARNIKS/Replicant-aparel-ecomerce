import React, { useState } from "react";
import { useCarritoContext } from "../../contexts/carritoContext";
import { useUserContext } from "../../contexts/userContext";
import { Layout, CartItem } from "../../components";
import { Link } from "react-router-dom";
import loginGoogle from "../../functions/loginEmail";
import { createCheckoutSession } from "../../functions/";
import { MdOutlineClose } from "react-icons/md";
import "./Carrito.css";

function Carrito() {
  const { carrito, setCarrito } = useCarritoContext();
  function removeFromCart(id) {
    // Elimina solo una instancia del producto con ese id
    const index = carrito.findIndex((producto) => producto.id === id);
    if (index !== -1) {
      const newCarrito = [...carrito];
      newCarrito.splice(index, 1);
      setCarrito(newCarrito);
    }
  }

  const { user } = useUserContext();
  const [isModal, setIsModal] = useState(false);

  async function login() {
    const cuenta = await loginGoogle();
    console.log(cuenta);
    setIsModal(false);
    if (cuenta.user) {
      createCheckoutSession(cuenta.user.uid, carrito);
      const btn = document.getElementById("buy-button");
      btn.isDisabled = true;
      btn.innerText = "Comprando...";
    }
  }

  function LoginForm() {
    return (
      <button className="carrito-login-button" onClick={login}>
        <div className="icon-google">
          <img src="/Google.svg" alt="Google" />
        </div>
        Iniciar sesión con Google
      </button>
    );
  }

  function isAuthenticated() {
    if (user) {
      // funcion de comprar
      createCheckoutSession(user.uid, carrito);
      const btn = document.getElementById("buy-button");
      btn.isDisabled = true;
      btn.innerText = "Comprando...";
    }
    if (!user) {
      // mostrar modal
      setIsModal(true);
    }
  }

  const Modal = () => {
    const handleGoHome = () => {
      window.location.href = "/";
    };
    return (
      <div
        id="modal-comprar"
        className={`modal-comprar ${isModal ? "block" : "hidden"}`}
      >
        <div className="modal-content">
          <h3 className="font-bold text-slate-500 italic">
            Inicia Sesión para comprar:
          </h3>
          <LoginForm onSubmit={login} />
          <button
            className="carrito-home-button"
            onClick={handleGoHome}
            style={{
              marginTop: "1rem",
              backgroundColor: "#10b981",
              color: "#fff",
            }}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {/* Solo muestra el modal de login si el usuario NO está autenticado */}
      {!user && <Modal />}
      <div className="container-items-carrito">
        <div className="container-header">
          <h1 className="text-3xl font-bold my-10">Tu carrito:</h1>
          <button>
            <Link to="/" className="text-azul underline my-3">
              Volver al inicio
            </Link>
          </button>
        </div>
        {carrito.length === 0 ? (
          <>
            <div className="mensaje-no-items">
              <p className="mensaje-error">No hay productos en tu carrito</p>
            </div>
          </>
        ) : (
          <div className="carrito-items-container">
            {carrito?.map((producto) => (
              <CartItem
                key={producto.id}
                producto={producto}
                onRemove={() => removeFromCart(producto.id)}
              />
            ))}
          </div>
        )}
        {carrito?.length > 0 && (
          <div className="contenedor-boton-comprar">
            <button
              id="buy-button"
              onClick={isAuthenticated}
              className="bg-slate-800 px-5 py-3 text-white"
            >
              {" "}
              COMPRAR
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Carrito;
