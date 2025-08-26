import React from "react";
import "./LoginForm.css";

function LoginForm({ onSubmit }) {
  return (
    <button className="login-form-button" onClick={onSubmit}>
      Iniciar sesión con Google
    </button>
  );
}

export default LoginForm;
