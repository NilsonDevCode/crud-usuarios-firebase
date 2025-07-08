// componentes/ListaUsuarios.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ListaUsuarios = ({ usuarios, iniciarEdicion, eliminarUsuario }) => {
  const [profesiones, setProfesiones] = useState([]);

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
        console.error("❌ Error al cargar profesiones:", error);
      }
    };

    obtenerProfesiones();
  }, []);

  const obtenerNombreProfesion = (id) => {
    const profesion = profesiones.find(p => p.id === id);
    return profesion ? profesion.nombre : "Sin profesión";
  };

  return (
    <div>
      {usuarios.map(usuario => (
        <div key={usuario.id}>
          <h4>{usuario.nombre}</h4>
          <p>Profesión: {obtenerNombreProfesion(usuario.profesion_id)}</p>
          <button onClick={() => iniciarEdicion(usuario)}>Editar</button>
          <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default ListaUsuarios;
