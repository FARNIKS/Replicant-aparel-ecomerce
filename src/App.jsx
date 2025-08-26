import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Producto,
  Perfil,
  Carrito,
  Checkout,
  Login,
  NotFound,
} from "./assets/views";
import { auth } from "./assets/firebase/credenciales";
import { useUserContext } from "./assets/contexts/userContext";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const { user, setUser } = useUserContext();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) setUser(firebaseUser);
      else setUser(null);
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="producto/:id" element={<Producto />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="carrito" element={<Carrito />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
