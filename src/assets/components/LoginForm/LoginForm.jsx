import React from "react";
import "./LoginForm.css";

function LoginForm({ onSubmit }) {
  return (
    <button
      className="login-form-button"
      onClick={onSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          background: "#fff",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 1px 6px rgba(47,125,197,0.07)",
        }}
      >
        <img
          src="/Google.svg"
          alt="Google"
          style={{ width: "22px", height: "22px" }}
        />
      </span>
      Iniciar sesión con Google
    </button>
  );
}

export default LoginForm;
