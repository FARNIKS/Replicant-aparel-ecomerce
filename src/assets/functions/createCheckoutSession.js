import { db } from "../firebase/credenciales";
import { collection, doc, addDoc, onSnapshot } from "firebase/firestore";

async function createCheckoutSession(uid, cart) {
  const collectionRef = collection(db, `customers/${uid}/checkout_sessions`);

  try {
    // Añadimos documento para indicar a Stripe intención de compra
    const { id } = await addDoc(collectionRef, {
      mode: "payment",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
      collect_shipping_address: true,
      line_items: cart.map((item) => {
        return {
          quantity: item.cantidad || 1, // Usar cantidad real del carrito
          price: item.priceId,
        };
      }),
    });

    console.log("Checkout session created:", id);

    // Escuchamos los cambios para obtener la URL de Stripe (máx 60 segundos)
    let timeoutId;
    const cancelarStreaming = onSnapshot(
      doc(db, `customers/${uid}/checkout_sessions/${id}`),
      (snapshot) => {
        const data = snapshot.data();
        const url = data?.url;

        if (url) {
          clearTimeout(timeoutId);
          console.log("Stripe URL received, redirecting...");
          cancelarStreaming();
          window.location.href = url;
        } else if (data?.error) {
          clearTimeout(timeoutId);
          console.error("Checkout error:", data.error);
          cancelarStreaming();
          alert(
            "Error en la sesión de compra: " +
              (data.error.message || "desconocido")
          );
        }
      },
      (error) => {
        clearTimeout(timeoutId);
        console.error("Firestore listener error:", error);
        cancelarStreaming();
        alert("Error al conectar con el servidor");
      }
    );

    // Timeout: si no hay URL en 60 segundos, cancelar listener
    timeoutId = setTimeout(() => {
      console.warn("Checkout timeout: no URL received in 60 seconds");
      cancelarStreaming();
      alert(
        "La sesión de compra tardó demasiado. Por favor, intenta de nuevo."
      );
    }, 60000);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    alert("Error al crear la sesión de compra");
  }
}

export default createCheckoutSession;
