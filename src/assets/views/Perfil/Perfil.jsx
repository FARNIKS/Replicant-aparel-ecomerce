import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import Layout from "../../components/Layout/Layout.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import { useUserContext } from "../../contexts/userContext";
import { auth } from "../../firebase/credenciales";
import loginGoogle from "../../functions/loginEmail";
import { getPaymentsByUID } from "../../functions";
function Perfil() {
  async function login() {
    await loginGoogle();
  }

  const { user } = useUserContext();
  const [payments, setPayments] = useState([]);

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
      {user ? (
        <p>
          Bienvenido, <span>{user.email}</span>
        </p>
      ) : (
        <div>
          <p>No estas logueado</p>
          <LoginForm onSubmit={login} />
        </div>
      )}
      {user &&
        payments.length > 0 &&
        payments.map((payment) => (
          <div>
            <span>
              {payment.items.map((item) => (
                <p key={item.description}>
                  {item.description}
                </p>
              ))}
            </span>
            <h3>{payment.amount / 100} </h3>
            <p>{payment.currency}</p>
          </div>
        ))}

      {user && (
        <button
          onClick={() => signOut(auth)}
        >
          Cerrar Sesión
        </button>
      )}
    </Layout>
  );
}

export default Perfil;
