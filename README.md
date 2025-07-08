# 🚀 CRUD de Usuarios con React + Firebase + Vercel

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%7C%20Auth-ffca28?logo=firebase)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![Git](https://img.shields.io/badge/Git-GitHub-blue?logo=git)
![Estado](https://img.shields.io/badge/Estado-En%20producción-green)

> Proyecto CRUD completo usando React, Firebase Auth, Firestore, Hooks, Vite y despliegue en Vercel. Compatible con móvil y escritorio 📱💻

---

## 🧠 Tecnologías utilizadas

- ⚛️ React + Vite
- 🔥 Firebase (Auth + Firestore)
- ☁️ Deploy automático con Vercel
- 🧪 Git + GitHub (control de versiones)
- 🧠 Hooks (`useState`, `useEffect`)
- 🔐 Variables de entorno (`.env`)

---

## ✅ Funcionalidades

- Registro y login con alias + contraseña 🔐  
- CRUD completo de usuarios y profesiones 🧑‍💻  
- Almacenamiento por usuario autenticado en Firestore  
- Validaciones de campos obligatorios ⚠️  
- Interfaz responsive y sencilla 🎯  
- Datos protegidos y organizados por UID 🔒  

---

## 📂 Estructura del proyecto

src/
├── componentes/
│ ├── FormularioUsuario.jsx
│ ├── ListaUsuarios.jsx
│ ├── CrudProfesiones.jsx
│ └── UsuariosCrud.jsx
├── firebaseConfig.js
├── App.jsx
└── main.jsx


---

## ⚙️ Variables de entorno (.env)

Crea un archivo `.env` con tus claves de Firebase:

```env
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID

🛠️ Instalación local
git clone https://github.com/NILSONCURSODAM/crud-usuarios-firebase.git
cd crud-usuarios-firebase
npm install
npm run dev

🌍 Demo en producción
📲 Puedes acceder desde cualquier dispositivo:
🔗 https://crud-usuarios-firebase-xg75.vercel.app/

👨‍💻 Autor
Nilson Ochoa Martínez
📧 nilson-ochoamartinez@hotmail.com
📍 Alicante, España
🎓 Desarrollador Junior Full Stack

