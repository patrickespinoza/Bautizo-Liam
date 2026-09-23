import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Intinerario from "./intinerario";
import Generador from "./page/generador";

const App = () => {
  const rutaActual =
    window.location.pathname.replace(/\/+$/, "") || "/";

  if (rutaActual === "/generador") {
    return <Generador />;
  }

  return <Intinerario />;
};

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);