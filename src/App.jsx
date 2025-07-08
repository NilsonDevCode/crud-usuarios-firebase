import { useState } from "react";
import LoginRegistro from "./componentes/LoginRegistro";
import UsuariosCrud from "./componentes/UsuariosCrud";
import CrudProfesiones from "./componentes/CrudProfesiones";

const App = () => {
  const [usuarioId, setUsuarioId] = useState(localStorage.getItem("alias") || null);

  const cerrarSesion = () => {
    localStorage.removeItem("alias");
    localStorage.removeItem("uid");
    setUsuarioId(null);
  };

  return (
    <>
      {!usuarioId ? (
        <LoginRegistro setUsuarioId={setUsuarioId} />
      ) : (
        <>
          <div style={{ padding: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>👤 Sesión iniciada como: <strong>{usuarioId}</strong></span>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          </div>

          <UsuariosCrud />

          <hr />


        </>
      )}
    </>
  );
};

export default App;

