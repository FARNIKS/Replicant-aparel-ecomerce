import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import Layout from "../../components/Layout/Layout.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import { useUserContext } from "../../contexts/userContext";
import { auth } from "../../firebase/credenciales";
import loginGoogle from "../../functions/loginEmail";
import { getPaymentsByUID } from "../../functions";
import "./Perfil.css";

function Perfil() {
  async function login() {
    await loginGoogle();
  }

  const { user } = useUserContext();
  const [payments, setPayments] = useState([]);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    async function getPayments() {
      if (!user) return;
      console.log("user por usar", user.uid);
      const payments = await getPaymentsByUID(user.uid);
      setPayments(payments);
    }
    getPayments();
  }, [user]);
  return (
    <Layout>
      {!user && (
        <div id="modal-comprar" className="modal-comprar block">
          <div className="modal-content">
            <h3 className="font-bold text-slate-500 italic">
              Inicia Sesión para ver tu perfil:
            </h3>
            <LoginForm onSubmit={login} />
            <button
              className="carrito-home-button"
              onClick={() => (window.location.href = "/")}
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
      )}
      <div className="container-perfil">
        {user && (
          <div className="header-perfil">
            <h2>Tu Perfil</h2>
            <div className="descripcion-perfil" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
              <p style={{margin: 0}}>
                Bienvenido, <span>{user.email}</span>
              </p>
              {user && (
                <button 
                  onClick={() => signOut(auth)}
                  style={{
                    margin: 0,
                    background: '#2f7dc5', // azul
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    boxShadow: '0 2px 8px rgba(47,125,197,0.10)',
                    transition: 'background 0.2s, transform 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#d44474'} // rosado
                  onMouseOut={e => e.currentTarget.style.background = '#2f7dc5'}
                >Cerrar Sesión</button>
              )}
            </div>
          </div>
        )}
        {user && (
          <div className="perfil-tabla-container">
            <table className="tabla-compras">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Producto</th>
                  <th style={{ textAlign: "center" }}>Monto</th>
                  <th style={{ textAlign: "center" }}>Moneda</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment, idx) =>
                    payment.items.map((item, i) => (
                      <tr key={item.description + idx + i}>
                        <td style={{ textAlign: "left" }}>{item.description}</td>
                        <td style={{ textAlign: "center" }}>
                          {(payment.amount / 100).toFixed(2)}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {String(payment.currency).toUpperCase()}
                        </td>
                      </tr>
                    ))
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        textAlign: "center",
                        color: "#888",
                        fontStyle: "italic",
                        padding: "2rem 0",
                      }}
                    >
                      No tienes registros de compra
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Perfil;
