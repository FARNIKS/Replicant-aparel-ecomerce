import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout.jsx";

function NotFound() {
  return (
    <Layout>
      <h1>Not Found</h1>
      <Link to="/">
        No encontramos lo que buscabas,
        <span>
          ¿ por qué no regresas al inicio?
        </span>
      </Link>
    </Layout>
  );
}

export default NotFound;
