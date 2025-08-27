import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { useCarritoContext } from "../../contexts/carritoContext";
import "./Layout.css";

function Layout({ children }) {
  const { carrito } = useCarritoContext();
  return (
    <div className="layout-main">
      <header className="header-replicant">
        <nav className="nav-replicant">
          <Link to="/" className="font-bold italic text-3xl">
            <h1>Replicant Apparel</h1>
          </Link>
          <div className="header-icons">
            <Link to="/carrito">
              <AiOutlineShoppingCart size={30} />
            </Link>
            <Link to="/perfil">
              <AiOutlineUser size={30} />
            </Link>
          </div>
        </nav>
      </header>
      <main className="layout-content">{children}</main>
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
