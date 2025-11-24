import axios from "axios";

const BASE_URL = "https://iconnicsserver.zeabur.app/api/tokens";

export async function getLastValidTokenByUser(userId: number) {
  try {
    const res = await axios.get(BASE_URL);
    const tokens = res.data;

    // Filtrar por usuario
    const userTokens = tokens.filter((t: any) => t.id_usuario === userId);

    // Ordenar por fecha de expiración
    const sorted = userTokens.sort(
      (a: any, b: any) =>
        new Date(b.fecha_expiracion).getTime() -
        new Date(a.fecha_expiracion).getTime()
    );

    if (sorted.length === 0) return null;

    const lastToken = sorted[0];

    // Validar activo y expiración
    const isValid =
      lastToken.activo === 1 &&
      new Date(lastToken.fecha_expiracion) > new Date();

    return isValid ? lastToken : null;
  } catch (err: any) {
    throw new Error(err.response?.data?.msg || "Error fetching tokens");
  }
}
export async function logoutToken(userId: number) {
  try {
    const res = await axios.put(`${BASE_URL}/logout/${userId}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.msg || "Error logging out");
  }
}
