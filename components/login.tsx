import { login } from "@/hooks/api";
import { getLastValidTokenByUser } from "@/hooks/apiToken";
import { useAuth } from "@/hooks/authcontext";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useAuth()

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      const userId = data.usuario.id;
      setUser(data.usuario)
      
      const lastToken = await getLastValidTokenByUser(userId);      
    
      const isValid =
        lastToken &&
        lastToken.activo === 1 &&
        new Date(lastToken.fecha_expiracion) > new Date();

      if (isValid) {        
        router.replace("/(tabs)");
      } else {      
        Alert.alert("Sesión expirada", "Por favor inicia sesión de nuevo");
      }

    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.loginCt}>
        <View style={styles.loginContainer}>
          <View style={styles.logo}>
            <Image
              source={require("../assets/images/android-icon-foreground.png")}
              style={styles.logoImage}
            />
            <Text style={styles.logoText}>Iconnics</Text>
          </View>

          <View style={styles.loginForm}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu correo"
              keyboardType="email-address"
              placeholderTextColor={"#aaa"}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu contraseña"
              secureTextEntry
              placeholderTextColor={"#aaa"}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
              <Text style={styles.btnText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.foot}>
            ¿No tienes cuenta?{" "}
            <Pressable onPress={() => router.push("/register")}>
              <Text style={styles.link}>Regístrate</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginCt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "2.5%",
  },
  loginContainer: {
    width: "90%",
    padding: 32,
    borderWidth: 1,
    borderColor: "#aaa",
    shadowColor: "#5f5e5e",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logoImage: {
    width: 72,
    height: 72,
    resizeMode: "cover",
  },
  logoText: {
    fontSize: 48,
    color: "#297bef",
    lineHeight: 72,
    fontWeight: "600",
    marginLeft: 12,
  },
  loginForm: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    fontSize: 14,
    borderRadius: 5,
    marginBottom: 10,
    color: "#297bef",
  },
  btnPrimary: {
    backgroundColor: "#297bef",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  foot: {
    fontSize: 14,
    color: "#000",
  },
  link: {
    color: "#297bef",
    textDecorationLine: "underline",
  },
});
