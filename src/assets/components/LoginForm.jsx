import React from "react";
import "./LoginForm.css";

function LoginForm({ onSubmit }) {
  return (
    <form onSubmit={(e) => onSubmit(e)} className="login-form">
      <input
        className="login-form-input"
        type="text"
        name="email"
        placeholder="Correo electrónico"
      />
      <input
        className="login-form-input"
        type="password"
        name="password"
        placeholder="Contraseña"
      />
      <button className="login-form-button">Iniciar Sesión</button>
    </form>
  );
}

export default LoginForm;
