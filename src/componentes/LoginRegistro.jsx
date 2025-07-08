// componentes/LoginRegistro.jsx
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const LoginRegistro = ({ setUsuarioId }) => {
  const auth = getAuth();
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [modoLogin, setModoLogin] = useState(true);

  useEffect(() => {
    const aliasGuardado = localStorage.getItem("alias");
    if (aliasGuardado) {
      setUsuarioLogueado(aliasGuardado);
      setUsuarioId(aliasGuardado); // Para el componente padre
    }
  }, []);

  const manejarRegistro = async () => {
    if (!alias.trim() || !password) {
      alert("⚠️ Alias y contraseña obligatorios");
      return;
    }

    const q = query(collection(db, "usuariosAuth"), where("alias", "==", alias));
    const resultado = await getDocs(q);
    if (!resultado.empty) {
      alert("❌ Alias ya registrado. Elige otro.");
      return;
    }

    try {
      const correoFicticio = `${alias}@miapp.com`;
      const credenciales = await createUserWithEmailAndPassword(auth, correoFicticio, password);

      await addDoc(collection(db, "usuariosAuth"), {
        uid: credenciales.user.uid,
        alias
      });

      localStorage.setItem("alias", alias);
      localStorage.setItem("uid", credenciales.user.uid);
      setUsuarioLogueado(alias);
      setUsuarioId(alias);
      alert("✅ Registro exitoso");
    } catch (error) {
      console.error("❌ Error al registrar:", error.message);
    }
  };

  const manejarLogin = async () => {
    if (!alias.trim() || !password) {
      alert("⚠️ Alias y contraseña obligatorios");
      return;
    }

    try {
      const correoFicticio = `${alias}@miapp.com`;
      const userCredential = await signInWithEmailAndPassword(auth, correoFicticio, password);
      localStorage.setItem("alias", alias);
      localStorage.setItem("uid", userCredential.user.uid);
      setUsuarioLogueado(alias);
      setUsuarioId(alias);
      alert("✅ Sesión iniciada");
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error.message);
      alert("❌ Alias o contraseña incorrectos");
    }
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    localStorage.removeItem("alias");
    localStorage.removeItem("uid");
    setUsuarioLogueado(null);
    setUsuarioId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      {usuarioLogueado ? (
        <div>
          <h3>👋 Bienvenido, {usuarioLogueado}</h3>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <h2>{modoLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
          <input
            type="text"
            placeholder="Alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={modoLogin ? manejarLogin : manejarRegistro}>
            {modoLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
          <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setModoLogin(!modoLogin)}>
            {modoLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginRegistro;

