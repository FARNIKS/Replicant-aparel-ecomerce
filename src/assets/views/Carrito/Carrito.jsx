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
    setCarrito(carrito.filter((producto) => producto.id !== id));
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
      btn.classList.add("bg-gray-500");
      btn.classList.add("cursor-not-allowed");
      btn.innerText = "Comprando...";
    }
  }

  function LoginForm() {
    return (
      <button className="carrito-login-button" onClick={login}>
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
      btn.classList.add("bg-gray-500");
      btn.classList.add("cursor-not-allowed");
      btn.innerText = "Comprando...";
    }
    if (!user) {
      // mostrar modal
      setIsModal(true);
    }
  }

  const Modal = () => (
    <div
      id="modal-comprar"
      className={`absolute top-0 left-0 bg-slate-600/40 w-screen h-screen z-30 backdrop-blur-sm flex flex-col justify-center items-center ${
        isModal ? "block" : "hidden"
      }`}
    >
      <div className="bg-white w-1/3 h-1/3 flex flex-col items-center justify-evenly">
        {" "}
        <h3 className="font-bold text-slate-500 italic">
          Inicia Sesión para comprar:
        </h3>
        <LoginForm onSubmit={login} />
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Solo muestra el modal de login si el usuario NO está autenticado */}
      {!user && <Modal />}

      <h1 className="text-3xl font-bold my-10">Tu carrito:</h1>

      {carrito.length === 0 ? (
        <>
          <p className="text-xl">No hay productos en tu carrito</p>
          <Link to="/" className="text-azul underline my-3">
            Volver al inicio
          </Link>
        </>
      ) : (
        carrito?.map((producto) => (
          <div key={producto.id} className="carrito-item flex items-center">
            <CartItem producto={producto} />
            <button
              className="bg-red-500 text-white px-3 py-1 rounded ml-2"
              onClick={() => removeFromCart(producto.id)}
            >
              Eliminar
            </button>
          </div>
        ))
      )}
      {carrito?.length > 0 && (
        <button
          id="buy-button"
          onClick={isAuthenticated}
          className="bg-slate-800 px-5 py-3 text-white"
        >
          {" "}
          COMPRAR
        </button>
      )}
    </Layout>
  );
}

export default Carrito;
