import axios from "axios";
import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";
import { useAuth } from "../hooks/authcontext";

export function useNotifications() {
  const { user } = useAuth();

  const enableNotifications = async () => {
    if (!user) return false;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Debes activar las notificaciones desde Configuración.",
        [
          {
            text: "Abrir ajustes",
            onPress: () => {
              Platform.OS === "ios"
                ? Linking.openURL("app-settings:")
                : Linking.openSettings();
            },
          },
          { text: "Cancelar", style: "cancel" },
        ]
      );
      return false;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const pushToken = tokenData.data;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    try {
      await axios.post("https://iconnicsserver.zeabur.app/api/usuarios/token", {
        userId: user.id,
        pushToken: pushToken, // ✔️ NOMBRE CORRECTO
      });
      console.log("Token guardado:", pushToken);
      return true;
    } catch (err) {
      console.error("Error al enviar token:", err);
      return false;
    }
  };

  const disableNotifications = async () => {
    if (!user) return;

    try {
      await axios.post("https://iconnicsserver.zeabur.app/api/usuarios/token", {
        userId: user.id,
        pushToken: null, // ✔️ Limpia el token
      });

      console.log("Token borrado");
      return true;
    } catch (err) {
      console.error("Error borrando token:", err);
      return false;
    }
  };

  return {
    enableNotifications,
    disableNotifications,
  };
}
