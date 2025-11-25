import ThreeDRender from "@/components/3drender";
import StepsChart from "@/components/piechart";
import { getUserById } from "@/hooks/api";
import { getMediciones } from "@/hooks/apiMediciones"; // tu API de mediciones
import { useAuth } from "@/hooks/authcontext";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface Medicion {
  id_medicion: number;
  id_sensor: number;
  hidratacion: number;
  temperatura: number;
  frecuencia_cardiaca: number;
  fecha_hora: string;
}

export default function DModelSection() {
  const [reloadKey, setReloadKey] = useState(0);
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);

  // Estados de métricas en tiempo real
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState("120 / 60");
  const [sleepHours, setSleepHours] = useState(7.5);
  const [oxygenation, setOxygenation] = useState(97);

  useFocusEffect(
    useCallback(() => {
      setReloadKey(prev => prev + 1);
    }, [])
  );

  // Traer detalles del usuario
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.id) {
        try {
          const data = await getUserById(user.id);
          setUserDetails(data);
        } catch (err: any) {
          console.error("Error al traer usuario:", err.message);
        }
      }
    };
    fetchUserDetails();
  }, [user]);

  // Función para obtener métricas de la API y simular algunas
  const fetchMetrics = async () => {
    try {
      const medicionesRaw: any[] = await getMediciones();
      const mediciones: Medicion[] = medicionesRaw.map(m => ({
        ...m,
        hidratacion: Number(m.hidratacion),
        temperatura: Number(m.temperatura),
        frecuencia_cardiaca: Number(m.frecuencia_cardiaca),
      }));

      if (mediciones.length === 0) return;

      // Heart Rate promedio
      const totalBPM = mediciones.reduce((acc, cur) => acc + cur.frecuencia_cardiaca, 0);
      setHeartRate(Math.round(totalBPM / mediciones.length));

      // Simular Blood Pressure según hidratación y bpm
      const systolic = 110 + Math.round(totalBPM / 10);
      const diastolic = 60 + Math.round(mediciones[0].hidratacion / 10);
      setBloodPressure(`${systolic} / ${diastolic}`);

      // Simular Sleep (aleatorio dentro de un rango)
      setSleepHours(parseFloat((6 + Math.random() * 2).toFixed(1)));

      // Simular Oxigenation
      setOxygenation(95 + Math.min(5, Math.round(totalBPM / mediciones.length / 20)));

    } catch (err) {
      console.error("Error fetching mediciones:", err);
    }
  };

  useEffect(() => {
    fetchMetrics(); // primera carga
    const interval = setInterval(fetchMetrics, 5000); // actualizar cada 5s
    return () => clearInterval(interval);
  }, []);

  function getFirstName(fullName: string): string {
    if (!fullName) return "";
    return fullName.trim().split(" ")[0];
  }

  function guessGenderByName(fullName: string): "Male" | "Female" | "Unknown" {
    const firstName = getFirstName(fullName);
    if (!firstName) return "Unknown";
    const lastChar = firstName.toLowerCase().slice(-1);
    return lastChar === "a" ? "Female" : "Male";
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <ScrollView style={styles.container}>
        <View style={styles.cardModel}>
          <View style={styles.anatomyCanvas}>
            <ThreeDRender key={reloadKey} />
          </View>
        </View>

        {/* Card Details */}
        <View style={styles.cardDetails}>
          <Text style={styles.sectionTitle}>User Info</Text>
          <View style={styles.metricsList}>
            {/* User Info */}
            <LinearGradient
              colors={["#1665f8", "#107be5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardInfo}
            >
              <View style={styles.imgProfile}>
                <Image
                  source={require("../../../assets/images/cemex_dma_spgg.png")}
                  style={styles.profileImage}
                />
              </View>
              <View style={styles.userCap}>
                <View style={styles.tabs}>
                  <Text style={styles.cardSubtitle}>
                    Weight: {parseInt(userDetails?.peso) || 0} kg
                  </Text>
                  <Text style={styles.cardSubtitle}>Blood Type: A+</Text>
                </View>
                <Text style={styles.username}>{userDetails?.nombre}</Text>
                <View style={styles.caps}>
                  <Text style={styles.cardSubtitle}>
                    Genre: {guessGenderByName(userDetails?.nombre)}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    Age: {userDetails?.edad || 0} years old
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.grid}>
              <LinearGradient
                colors={["#0f501b", "#05b047"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardHealth}
              >
                <Text style={styles.cardSubtitle}>Health Status:</Text>
                <Text style={styles.cardValue}>Good</Text>
              </LinearGradient>
              <View style={styles.cardRow}>
                <Ionicons name="flask" size={28} color="#0057ff" />
                <View style={styles.infoCard}>
                  <Text style={styles.cardSubtitle}>Blood Pressure</Text>
                  <Text>{bloodPressure} mmHg</Text>
                </View>
              </View>
              <View style={styles.cardRow}>
                <Ionicons name="heart" size={28} color="#ff4d4d" />
                <View style={styles.infoCard}>
                  <Text style={styles.cardSubtitle}>Heart Rate</Text>
                  <Text>{heartRate} bpm</Text>
                </View>
              </View>
              <View style={styles.cardRow}>
                <Ionicons name="document-text" size={28} color="#666" />
              </View>
            </View>

            {/* Recent Tests */}
            <View style={styles.groupHeader}>
              <Text style={styles.groupTitle}>Recent Tests</Text>
            </View>
            <View style={styles.subtestList}>
              <View style={styles.testItem}>
                <Ionicons name="checkmark-circle" size={22} color="#4caf50" />
                <View style={styles.testInfo}>
                  <Text style={styles.cardSubtitle}>Sleep Tracking</Text>
                  <Text>Realizado — {sleepHours}h registradas</Text>
                </View>
              </View>
              <View style={styles.testItem}>
                <Ionicons name="checkmark-circle" size={22} color="#4caf50" />
                <View style={styles.testInfo}>
                  <Text style={styles.cardSubtitle}>Oxigenation</Text>
                  <Text>Realizado — {oxygenation}% saturación</Text>
                </View>
              </View>
            </View>

            <View style={styles.stepsChart}>
              <StepsChart />
            </View>
          </View>
        </View>

        {/* Card Graphic */}
        <View style={styles.cardGraphic}>
          <Text>Selecciona una parte del cuerpo para ver sus métricas...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Mantener el resto de estilos igual


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#2b2b2b",
  },
  cardModel: {
    marginBottom: 20,
    alignItems: "center",
  },
  anatomyCanvas: {
    width: "100%",
    height: 400,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
  },
  cardDetails: {
    marginBottom: 20,
  },
  metricsList: {
    gap: 15,
  },
  cardInfo: {
    width: width - 40,
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  imgProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userCap: {
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 5,
  },
  caps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHealth: {
    width: width / 2.3,
    padding: 20,
    height: 100,
    borderRadius: 15,
  },
  cardSubtitle: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "400",
    color: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "#707070",
    textShadowRadius: 5,
  },
  cardValue: {
    fontSize: 16,
    color: "#4caf50",
  },
  cardRow: {
    width: width / 2.3,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#000",
    backgroundColor: "#f1f1f1",
    padding: 20,
    borderRadius: 15,
  },
  infoCard: {
    flex: 1,
    marginLeft: 10,
  },
  groupHeader: {
    marginTop: 15,
    marginBottom: 10,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2b2b2b",
  },
  subtestList: {
    gap: 12,
  },
  testItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff7f0",
    padding: 10,
    borderRadius: 8,
  },
  testInfo: {
    flex: 1,
    marginLeft: 10,
  },
  stepsChart: {
    marginTop: 15,
    width: "100%",
    height: "auto",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardGraphic: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#f7f9ff",
  },
});
