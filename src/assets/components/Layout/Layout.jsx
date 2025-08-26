import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { useCarritoContext } from "../../contexts/carritoContext";
import "./Layout.css";

function Layout({ children }) {
  const { carrito } = useCarritoContext();
  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden relative">
      <header className="header-replicant">
        <nav className="nav-replicant">
          <Link to="/" className="font-bold italic text-3xl">
            {" "}
            <h1>Replicant Apparel</h1>
          </Link>
          <div className="header-icons">
            <Link to="/carrito" className="mx-5 relative">
              <span
                className={`absolute w-3 h-3 rounded-full bg-red-600 top-0 right-0  translate-x-1/2 -translate-y-1/2  ${
                  carrito.length > 0 ? "opacity-100" : "opacity-0"
                }`}
              ></span>
              <AiOutlineShoppingCart size={30} />
            </Link>
            <Link to="/perfil">
              <AiOutlineUser size={30} />
            </Link>
          </div>
        </nav>
      </header>
      <main className="w-full h-full flex flex-col justify-center items-center">
        {children}
      </main>
      <footer className="footer">
        <p>Proyecto E-commerce SENA &copy; 2025</p>
        <p>Centro Industrial y de aviación Sena</p>
        <p>Miguel Jimenez - Sebastian Sanchez - Rolan Diaz</p>
        <p>Grupo 3</p>
        <p>
          <a
            href="https://github.com/FARNIKS/simulacion-ecomerce"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Layout;
