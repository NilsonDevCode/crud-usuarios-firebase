import { useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const CrudProfesiones = ({ profesiones, setProfesiones, obtenerProfesiones }) => {
  const [nombre, setNombre] = useState("");
  const [editarId, setEditarId] = useState(null);
  const uid = localStorage.getItem("uid");

  const crearProfesion = async () => {
    try {
      await addDoc(collection(db, "profesiones"), { nombre, uid });
      await obtenerProfesiones(); // 🔄 Recarga la lista automáticamente
      alert("✅ Profesión creada");
    } catch (error) {
      console.error("❌ Error al crear profesión:", error);
    }
  };

  const actualizarProfesion = async () => {
    try {
      await updateDoc(doc(db, "profesiones", editarId), { nombre });
      await obtenerProfesiones(); // 🔄 Refresca la lista
      alert("✅ Profesión actualizada");
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
    }
  };

  const manejarGuardar = async () => {
    if (!nombre.trim()) {
      alert("⚠️ El nombre es obligatorio");
      return;
    }
    editarId ? await actualizarProfesion() : await crearProfesion();
    setNombre("");
    setEditarId(null);
  };

  const manejarEditar = (profesion) => {
    setNombre(profesion.nombre);
    setEditarId(profesion.id);
  };

  const manejarEliminar = async (id) => {
    try {
      await deleteDoc(doc(db, "profesiones", id));
      await obtenerProfesiones(); // 🔄 Refresca tras eliminar
      alert("✅ Profesión eliminada");
    } catch (error) {
      console.error("❌ Error al eliminar:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🧑‍💼 Gestión de Profesiones</h2>
      <input
        type="text"
        placeholder="Nombre de la profesión"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={manejarGuardar}>
        {editarId ? "Actualizar" : "Crear"}
      </button>

      <ul>
        {Array.isArray(profesiones) && profesiones.length > 0 ? (
          profesiones.map((profesion) => (
            <li key={profesion.id}>
              {profesion.nombre}
              <button onClick={() => manejarEditar(profesion)}>✏️</button>
              <button onClick={() => manejarEliminar(profesion.id)}>🗑️</button>
            </li>
          ))
        ) : (
          <li>No hay profesiones registradas</li>
        )}
      </ul>
    </div>
  );
};

export default CrudProfesiones;



