const FormularioUsuario = ({
  datosUsuario,
  manejarCambio,
  editarInformacion,
  crearUsuario,
  actualizarUsuario,
  cancelarEdicion,
  profesiones
}) => {
  return (
    <div>
      <h3>{editarInformacion ? "✏️ Editar Usuario" : "➕ Crear Usuario"}</h3>
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
        <option value="">Selecciona una profesión</option>
        {profesiones.map((p) => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
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



