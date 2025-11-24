import axios from "axios";

const BASE_URL = "https://iconnicsserver.zeabur.app/api/usuarios";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

function validateEmail(correo: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(correo);
}

function validatePassword(contrasena: string): boolean {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(contrasena);
}

export async function login(correo: string, contrasena: string) {
  if (!validateEmail(correo)) {
    throw new Error(
      "Correo inválido. Usa un formato válido como ejemplo@correo.com"
    );
  }

  if (!validatePassword(contrasena)) {
    throw new Error(
      "Contraseña inválida. Debe tener al menos 6 caracteres, incluyendo una letra y un número."
    );
  }

  try {
    const response = await api.post("/login", {
      correo,
      contrasena,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error de autenticación");
    } else {
      throw new Error("Error de red o servidor");
    }
  }
}

export async function register(form: {
  username: string;
  lastname: string;
  weight: string;
  height: string;
  age: string;
  email: string;
  password: string;
  sport: string;
  role: string;
}) {
  // Validaciones básicas
  if (!validateEmail(form.email)) {
    throw new Error(
      "Correo inválido. Usa un formato válido como ejemplo@correo.com"
    );
  }

  if (!validatePassword(form.password)) {
    throw new Error(
      "Contraseña inválida. Debe tener al menos 6 caracteres, incluyendo una letra y un número."
    );
  }
  
  const payload = {
    nombre: `${form.username} ${form.lastname}`,
    edad: parseInt(form.age, 10),
    rol: form.role,
    peso: parseFloat(form.weight),
    altura: parseFloat(form.height.replace("m", "")), // quitar la 'm'
    deporte: form.sport,
    correo: form.email,
    contrasena: form.password,
  };

  try {
    const response = await api.post("/", payload);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error en el registro");
    } else {
      throw new Error("Error de red o servidor");
    }
  }
}
