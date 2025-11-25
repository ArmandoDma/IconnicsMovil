import axios from "axios";

const BASE_URL = "https://iconnicsserver.zeabur.app/api/mediciones"; // Cambia al URL de tu API

// Obtener todas las mediciones
export const getMediciones = async () => {
  try {
    const res = await axios.get(BASE_URL);    
    return res.data;
  } catch (error) {
    console.error("Error al obtener mediciones:", error);
    throw error;
  }
};

// Obtener una medición por ID
export const getMedicionById = async (id:number) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener medición ${id}:`, error);
    throw error;
  }
};

// Crear una nueva medición
export const createMedicion = async (medicion:any) => {
  try {
    const res = await axios.post(BASE_URL, medicion);
    return res.data;
  } catch (error) {
    console.error("Error al crear medición:", error);
    throw error;
  }
};

// Actualizar una medición existente
export const updateMedicion = async (id:number, medicion:any) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, medicion);
    return res.data;
  } catch (error) {
    console.error(`Error al actualizar medición ${id}:`, error);
    throw error;
  }
};

// Eliminar una medición
export const deleteMedicion = async (id:number) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al eliminar medición ${id}:`, error);
    throw error;
  }
};
