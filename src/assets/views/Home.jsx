import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard/ItemCard.jsx";
import getActiveProducts from "../functions/getActiveProducts";
import ItemSection from "../components/ItemSection/ItemSection.jsx";
import Layout from "../components/Layout/Layout.jsx";

function Home() {
  const [productos, setProductos] = useState(null);

  useEffect(() => {
    async function getProducts() {
      const products = await getActiveProducts();
      setProductos(products);
      console.log("productosHome", products);
    }

    getProducts();
  }, []);

  return (
    <Layout>
      <ItemSection title="Nuevas Entradas" productos={productos} />
    </Layout>
  );
}

export default Home;
