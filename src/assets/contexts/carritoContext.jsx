import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useRef,
} from "react";
import { db } from "../firebase/credenciales";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useUserContext } from "./userContext";

export const CarritoContext = createContext();

export const CarritoContextProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const { user } = useUserContext();
  const [cargandoCarrito, setCargandoCarrito] = useState(true);
  const cargadoRef = useRef(false);

  // Cargar carrito de localStorage o Firestore cuando monta
  useEffect(() => {
    if (cargadoRef.current) return; // Evitar cargar dos veces

    const cargarCarritoGuardado = async () => {
      try {
        // Primero cargar de localStorage (más rápido)
        const carritoLocal = localStorage.getItem(
          "carrito_" + (user?.uid || "anonimo")
        );
        if (carritoLocal) {
          setCarrito(JSON.parse(carritoLocal));
          setCargandoCarrito(false);
          cargadoRef.current = true;
          return;
        }

        // Si no hay en localStorage y hay usuario, traer de Firestore
        if (user?.uid) {
          const carritoRef = doc(db, "clientes", user.uid, "carrito", "items");
          const docSnap = await getDoc(carritoRef);

          if (docSnap.exists() && docSnap.data().productos) {
            setCarrito(docSnap.data().productos);
            // Guardar en localStorage para próxima vez
            localStorage.setItem(
              "carrito_" + user.uid,
              JSON.stringify(docSnap.data().productos)
            );
          } else {
            setCarrito([]);
          }
        } else {
          setCarrito([]);
        }
      } catch (error) {
        console.error("Error cargando carrito:", error);
        setCarrito([]);
      } finally {
        setCargandoCarrito(false);
        cargadoRef.current = true;
      }
    };

    cargarCarritoGuardado();
  }, [user]);

  // Guardar carrito en localStorage y Firestore
  const guardarCarrito = async (nuevoCarrito) => {
    // Siempre guardar en localStorage primero
    const clave = "carrito_" + (user?.uid || "anonimo");
    localStorage.setItem(clave, JSON.stringify(nuevoCarrito));

    // Si hay usuario, también guardar en Firestore
    if (user?.uid) {
      try {
        const carritoRef = doc(db, "clientes", user.uid, "carrito", "items");
        await setDoc(carritoRef, {
          productos: nuevoCarrito,
          ultimaActualizacion: new Date(),
        });
      } catch (error) {
        console.error("Error guardando carrito en Firestore:", error);
      }
    }
  };

  const addToCart = (producto) => {
    setCarrito((prevCarrito) => {
      // Evitar duplicados desde el inicio
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id
      );

      let nuevoCarrito;
      if (productoExistente) {
        // Si el producto ya existe, solo aumentar cantidad
        nuevoCarrito = prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        nuevoCarrito = [...prevCarrito, { ...producto, cantidad: 1 }];
      }

      // Guardar después de actualizar state
      guardarCarrito(nuevoCarrito);
      return nuevoCarrito;
    });
  };

  const updateCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 0) return; // No permitir números negativos

    setCarrito((prevCarrito) => {
      const nuevoCarrito = prevCarrito
        .map((item) =>
          item.id === id ? { ...item, cantidad: nuevaCantidad } : item
        )
        .filter((item) => item.cantidad > 0); // Eliminar si cantidad es 0

      guardarCarrito(nuevoCarrito);
      return nuevoCarrito;
    });
  };

  const removeFromCart = (id) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = prevCarrito.filter((item) => item.id !== id);
      guardarCarrito(nuevoCarrito);
      return nuevoCarrito;
    });
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      return total + (item.price.unit_amount / 100) * item.cantidad;
    }, 0);
  };

  const limpiarCarrito = async () => {
    setCarrito([]);

    // Limpiar de localStorage
    const clave = "carrito_" + (user?.uid || "anonimo");
    localStorage.removeItem(clave);

    // Si hay usuario, también limpiar de Firestore
    if (user?.uid) {
      try {
        const carritoRef = doc(db, "clientes", user.uid, "carrito", "items");
        await setDoc(carritoRef, {
          productos: [],
          ultimaActualizacion: new Date(),
        });
      } catch (error) {
        console.error("Error limpiando carrito:", error);
      }
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        addToCart,
        updateCantidad,
        removeFromCart,
        calcularTotal,
        limpiarCarrito,
        cargandoCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarritoContext = () => {
  const context = useContext(CarritoContext);
  if (!context)
    throw new Error(
      "useCarritoContext must be used within a UserContextProvider"
    );
  return context;
};
