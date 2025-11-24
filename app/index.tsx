import { getLastValidTokenByUser } from "@/hooks/apiToken";
import { useRouter } from "expo-router"; // usa el hook en vez de importar router directo
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks/authcontext";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter(); // hook de expo-router

  useEffect(() => {
    const checkSession = async () => {
      try {
        if (!user) {
          setTimeout(() => {
            router.replace("/login");
          }, 0);
          return;
        }

        const token = await getLastValidTokenByUser(user.id);

        if (
          token &&
          token.activo === 1 &&
          new Date(token.fecha_expiracion) > new Date()
        ) {
          setTimeout(() => {
            router.replace("/(tabs)");
          }, 0);
        } else {
          setTimeout(() => {
            router.replace("/login");
          }, 0);
        }
      } catch {
        setTimeout(() => {
          router.replace("/login");
        }, 0);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [user]);

  if (loading)
    return (
      <SafeAreaView style={{ padding: 20 }}>
        <Text>Loading session...</Text>
      </SafeAreaView>
    );

  return <View />;
};

export default Index;
