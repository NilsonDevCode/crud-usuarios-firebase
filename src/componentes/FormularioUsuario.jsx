// componentes/FormularioUsuario.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const FormularioUsuario = ({
  datosUsuario,
  manejarCambio,
  editarInformacion,
  crearUsuario,
  actualizarUsuario,
  cancelarEdicion
}) => {
  const [profesiones, setProfesiones] = useState([]);

  useEffect(() => {
    const cargarProfesiones = async () => {
      try {
        const snapshot = await getDocs(collection(db, "profesiones"));
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProfesiones(lista);
      } catch (error) {
        console.error("❌ Error al cargar profesiones:", error);
      }
    };

    cargarProfesiones();
  }, []);

  return (
    <div>
      <h2>{editarInformacion ? "Editar Usuario" : "Crear Usuario"}</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={datosUsuario.nombre}
        onChange={manejarCambio}
      />

      <select
        name="profesion_id"
        value={datosUsuario.profesion_id}
        onChange={manejarCambio}
      >
        <option value="">-- Selecciona una profesión --</option>
        {profesiones.map(p => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>

      <button onClick={editarInformacion ? actualizarUsuario : crearUsuario}>
        {editarInformacion ? "Actualizar" : "Crear"}
      </button>

      {editarInformacion && <button onClick={cancelarEdicion}>Cancelar</button>}
    </div>
  );
};

export default FormularioUsuario;

