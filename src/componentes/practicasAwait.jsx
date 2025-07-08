import { useState, useEffect } from "react";
import FormularioUsuario from "./componentes/FormularioUsuario";
import ListaUsuarios from "./componentes/ListaUsuarios";
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

const App = () => {
  const profesiones = {
    1: "Programador",
    2: "Informático"
  };

  const [usuarios, setUsuarios] = useState([]);
  const [datosUsuario, setDatosUsuario] = useState({ id: "", nombre: "", profesion_id: "" });
  const [editarInformacion, setEditarInformacion] = useState(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const snapshot = await getDocs(collection(db, "usuarios"));
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsuarios(lista);
      } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
      }
    };

    obtenerUsuarios();
  }, []);


  const manejarCambio = (e) => {
    setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value });
  };


  const validarCampos = () => {
    if (!datosUsuario.nombre.trim() || !datosUsuario.profesion_id) {
      alert("⚠️ Todos los campos son obligatorios");
      return false;
    }
    return true;
  };

    const resetFormulario = () => {
    setEditarInformacion(false);
    setDatosUsuario({ id: "", nombre: "", profesion_id: "" });
  };


  const crearUsuario = async () => {
    if (!validarCampos()) return;
    const nuevoUsuario = {
      nombre: datosUsuario.nombre,
      profesion_id: parseInt(datosUsuario.profesion_id)
    };

    try {
      const docRef = await addDoc(collection(db, "usuarios"), nuevoUsuario);
      setUsuarios([...usuarios, { id: docRef.id, ...nuevoUsuario }]);
      alert("✅ Usuario creado correctamente");
      resetFormulario();
    } catch (error) {
      console.error("❌ Error al crear usuario:", error);
    }
  };




  const actualizarUsuario = async () => {
    if (!validarCampos()) return;
    const usuarioActualizado = {
      nombre: datosUsuario.nombre,
      profesion_id: parseInt(datosUsuario.profesion_id)
    };
    try {
      await updateDoc(doc(db, "usuarios", datosUsuario.id), usuarioActualizado);
      setUsuarios(usuarios.map(u =>
        u.id === datosUsuario.id ? { id: u.id, ...usuarioActualizado } : u
      ));
      alert("✅ Usuario actualizado");
      resetFormulario();
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error);
    }
  };


  const eliminarUsuario = async (id) => {
    try {
      await deleteDoc(doc(db, "usuarios", id));
      setUsuarios(usuarios.filter(u => u.id !== id));
      alert("✅ Usuario eliminado correctamente");
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
    }
  };
  

  const iniciarEdicion = (usuario) => {
    setEditarInformacion(true);
    setDatosUsuario(usuario);
  };


  return (
    <div style={{ padding: 20 }}>
      <FormularioUsuario
        datosUsuario={datosUsuario}
        manejarCambio={manejarCambio}
        editarInformacion={editarInformacion}
        crearUsuario={crearUsuario}
        actualizarUsuario={actualizarUsuario}
        cancelarEdicion={resetFormulario}
      />

      <ListaUsuarios
        usuarios={usuarios}
        profesiones={profesiones}
        iniciarEdicion={iniciarEdicion}
        eliminarUsuario={eliminarUsuario}
      />
    </div>
  );
};

export default App;