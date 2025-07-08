// componentes/CrudProfesiones.jsx
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const CrudProfesiones = () => {
  const [profesiones, setProfesiones] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editarId, setEditarId] = useState(null);

  useEffect(() => {
    const obtenerProfesiones = async () => {
      try {
        const snapshot = await getDocs(collection(db, "profesiones"));
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProfesiones(lista);
      } catch (error) {
        console.error("❌ Error al obtener profesiones:", error);
      }
    };

    obtenerProfesiones();
  }, []);

  const manejarGuardar = async () => {
    if (!nombre.trim()) {
      alert("⚠️ El nombre es obligatorio");
      return;
    }

    try {
      if (editarId) {
        await updateDoc(doc(db, "profesiones", editarId), { nombre });
        setProfesiones(profesiones.map(p => 
          p.id === editarId ? { id: editarId, nombre } : p
        ));
        alert("✅ Profesión actualizada");
      } else {
        const docRef = await addDoc(collection(db, "profesiones"), { nombre });
        // 🔥 Añadimos la nueva profesión directamente al estado
        setProfesiones([...profesiones, { id: docRef.id, nombre }]);
        alert("✅ Profesión creada");
      }

      setNombre("");
      setEditarId(null);
    } catch (error) {
      console.error("❌ Error al guardar:", error);
    }
  };

  const manejarEditar = (profesion) => {
    setNombre(profesion.nombre);
    setEditarId(profesion.id);
  };

  const manejarEliminar = async (id) => {
    try {
      await deleteDoc(doc(db, "profesiones", id));
      setProfesiones(profesiones.filter(p => p.id !== id));
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
        {profesiones.map(profesion => (
          <li key={profesion.id}>
            {profesion.nombre}
            <button onClick={() => manejarEditar(profesion)}>✏️</button>
            <button onClick={() => manejarEliminar(profesion.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudProfesiones;

