import axios from "axios";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
import { useAuth } from "../hooks/authcontext";

export function useNotifications() {
  const { user } = useAuth();

  useEffect(() => {
    const setupNotifications = async () => {
      if (!user) return;
      
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus === "denied") {
        Alert.alert(
          "Permiso denegado",
          "Debes habilitar las notificaciones desde los ajustes del dispositivo.",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Abrir ajustes",
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]
        );
        return;
      }
      const tokenData = await Notifications.getExpoPushTokenAsync();
      const pushToken = tokenData.data;
      console.log("Push token:", pushToken);

      
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
      
      try {
        await axios.post("http://192.168.1.5:3000/api/usuarios/token", {
          id_usuario: user.id,
          push_token: pushToken,
        });
      } catch (err) {
        console.error("Error al enviar push token al backend:", err);
      }
    };

    setupNotifications();
    
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notificación recibida:", notification);
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Usuario tocó la notificación:", response);
      });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, [user]);
}
