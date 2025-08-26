import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { Layout, LoginForm } from "../components";
import { useUserContext } from "../contexts/userContext";
import { auth } from "../firebase/credenciales";
import loginGoogle from "../functions/loginEmail";
import { getPaymentsByUID } from "../functions/";
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
        <p className="text-xl">
          Bienvenido,{" "}
          <span className="font-bold">
            {user.email} - {user.uid}
          </span>
        </p>
      ) : (
        <div className="w-1/2 flex flex-col items-center">
          <p className="text-xl my-3">No estas logueado</p>
          <LoginForm onSubmit={login} />
        </div>
      )}
      {user &&
        payments.length > 0 &&
        payments.map((payment) => (
          <div className="w-full flex flex-row items-center justify-evenly">
            <span className="flex">
              {payment.items.map((item) => (
                <p key={item.description} className="mx-3">
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
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-10"
        >
          Cerrar Sesión
        </button>
      )}
    </Layout>
  );
}

export default Perfil;
