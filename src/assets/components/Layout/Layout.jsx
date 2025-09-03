import React from "react";
import { AiFillGithub } from "react-icons/ai";
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
          <Link
            to="/"
            className="font-bold italic text-3xl"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src="/Replicant apparel.svg"
              alt="Replicant Apparel Logo"
              style={{
                width: "32px",
                height: "32px",
              }}
            />
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
        <div className="footer-content">
          <p>Proyecto E-commerce SENA &copy; 2025</p>
          <p>Centro Industrial y de aviación Sena</p>
          <p>Miguel Jimenez - Sebastian Sanchez - Rolan Diaz</p>
          <p>Grupo 3</p>
          <p>
            <a
              href="https://github.com/FARNIKS/simulacion-ecomerce"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <AiFillGithub size={22} /> Github
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
