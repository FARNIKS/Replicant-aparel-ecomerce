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
  const { carrito, removeFromCart, calcularTotal, limpiarCarrito } =
    useCarritoContext();

  const { user } = useUserContext();
  const [isModal, setIsModal] = useState(false);

  async function login() {
    const cuenta = await loginGoogle();
    console.log(cuenta);
    setIsModal(false);
    if (cuenta.user) {
      const btn = document.getElementById("buy-button");
      if (btn) {
        btn.disabled = true;
        btn.innerText = "Comprando...";
      }
      // Llamar checkout con el carrito actual
      createCheckoutSession(cuenta.user.uid, carrito);
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
      const btn = document.getElementById("buy-button");
      if (btn) {
        btn.disabled = true;
        btn.innerText = "Comprando...";
      }
      // Llamar checkout con el carrito actual
      createCheckoutSession(user.uid, carrito);
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
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ verticalAlign: "middle" }}
            >
              <path d="M12 3l9 9-1.5 1.5L19 20a1 1 0 0 1-1 1h-4v-5H10v5H6a1 1 0 0 1-1-1v-6.5L3 12l9-9zm0 2.828L5.929 12H7v7h3v-5h4v5h3v-7h1.071L12 5.828z" />
            </svg>
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
          <Link
            to="/"
            className="text-azul underline my-3"
            title="Volver al inicio"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3l9 9-1.5 1.5L19 20a1 1 0 0 1-1 1h-4v-5H10v5H6a1 1 0 0 1-1-1v-6.5L3 12l9-9zm0 2.828L5.929 12H7v7h3v-5h4v5h3v-7h1.071L12 5.828z" />
            </svg>
          </Link>
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
          <>
            <div className="carrito-resumen">
              <div className="resumen-items">
                <h3>Resumen de compra:</h3>
                <div className="resumen-cantidad">
                  <span>Total de items:</span>
                  <span className="cantidad-total">
                    {carrito.reduce((total, item) => total + item.cantidad, 0)}
                  </span>
                </div>
                <div className="resumen-precio">
                  <span>Total a pagar:</span>
                  <span className="precio-total">
                    ${calcularTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="contenedor-boton-comprar">
              <button
                id="buy-button"
                onClick={isAuthenticated}
                className="boton-comprar"
              >
                COMPRAR
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Carrito;
