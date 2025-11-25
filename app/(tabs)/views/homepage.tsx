import { BarcharGraph } from "@/components/barchar";
import { getMediciones } from "@/hooks/apiMediciones";
import { useNotifications } from "@/hooks/notifications";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { healthTips, notifications } from "../../../components/tips";

const { width } = Dimensions.get("window");

interface Medicion {
  id_medicion: number;
  id_sensor: number;
  hidratacion: number;
  temperatura: number;
  frecuencia_cardiaca: number;
  fecha_hora: string;
}

export function HomeScreen() {
  useNotifications();

  const [avgHeartRate, setAvgHeartRate] = useState(0);
  const [avgHydratation, setAvgHydratation] = useState(0);
  const [avgBloodOxygen, setAvgBloodOxygen] = useState(0);
  const [avgLoseCalories, setAvgLoseCalories] = useState(0);

  const fetchData = async () => {
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
      setAvgHeartRate(Math.round(totalBPM / mediciones.length));

      // Hidratación promedio
      const totalHydra = mediciones.reduce((acc, cur) => acc + cur.hidratacion, 0);
      setAvgHydratation(Math.round(totalHydra / mediciones.length));

      // Simular oxígeno en sangre
      const avgOxygen = 95 + Math.min(5, Math.round(totalBPM / mediciones.length / 20));
      setAvgBloodOxygen(avgOxygen);

      // Simular calorías perdidas
      const totalCalories = mediciones.reduce(
        (acc, cur) => acc + cur.frecuencia_cardiaca * 0.12 + cur.hidratacion * 0.5 + cur.temperatura * 0.3,
        0
      );
      setAvgLoseCalories(Math.round(totalCalories));
    } catch (error) {
      console.error("Error fetching mediciones:", error);
    }
  };

  useEffect(() => {
    // Primera carga
    fetchData();

    // Actualizar cada 5 segundos (ajustable)
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval); // limpiar al desmontar
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>
            Welcome back! Here's an overview of your health metrics and recent activity.
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          <View style={[styles.metricCard, styles.cardBlue]}>
            <Text style={styles.metricTitle}>Average Heart Rate</Text>
            <Text style={styles.metricValue}>{avgHeartRate} bpm</Text>
          </View>
          <View style={[styles.metricCard, styles.cardOrange]}>
            <Text style={styles.metricTitle}>Average Blood Oxygen</Text>
            <Text style={styles.metricValue}>{avgBloodOxygen}%</Text>
          </View>
          <View style={[styles.metricCard, styles.cardBlue]}>
            <Text style={styles.metricTitle}>Average Hydratation</Text>
            <Text style={styles.metricValue}>{avgHydratation}%</Text>
          </View>
          <View style={[styles.metricCard, styles.cardOrange]}>
            <Text style={styles.metricTitle}>Average Lose Calories</Text>
            <Text style={styles.metricValue}>{avgLoseCalories} kcal</Text>
          </View>

          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Project Analytics</Text>
            <View style={styles.chart}>
              <BarcharGraph />
            </View>
          </View>

          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Health Tips</Text>
            {healthTips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Image source={tip.icon} style={styles.tipImage} />
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>{tip.food}</Text>
                  <Text style={styles.tipNutrients}>
                    <Text style={styles.tipLabel}>Nutrients:</Text> {tip.nutrients.join(", ")}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.notifySection}>
            <Text style={styles.sectionTitle}>Last Notifications</Text>
            {notifications.map((note, index) => (
              <View key={index} style={styles.notiItem}>
                <View style={styles.notiIcon}>
                  <Image
                    source={require("../../../assets/images/iconnics_logo.png")}
                    style={styles.notiImage}
                  />
                </View>
                <View style={styles.notiContent}>
                  <Text style={styles.notiTitle}>{note.title}</Text>
                  <Text style={styles.notiText}>{note.content}</Text>
                  <Text style={styles.notiTime}>{note.time}</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.seeMoreBtn}>
              <Text style={styles.seeMoreText}>See More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  metricsGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  metricCard: {
    width: "48%",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  cardBlue: {
    backgroundColor: "#1665f8",
  },
  cardOrange: {
    backgroundColor: "#f85e16",
  },
  metricTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#fff",
  },
  metricValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginTop: 10,
  },
  chartSection: {
    width: "100%",
    height: 300,
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 20,
    borderColor: "#aaa",
    borderWidth: 1,
    marginBottom: 20,
    position: "relative",
  },
  chart: {
    width: width - 40,
    alignItems: "center",
    justifyContent: "center",
    left: -20,
    position: "absolute",
    zIndex: 100,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  notifySection: {
    width: "100%",
    maxHeight: 400,
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 20,
    borderColor: "#aaa",
    borderWidth: 1,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 20,
  },
  notifyList: {
    width: "100%",
    height: "80%",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  notiItem: {
    width: "100%",
    padding: 10,
    minHeight: 60,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  notiIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    overflow: "hidden",
  },
  notiImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  notiContent: {
    flex: 1,
  },
  notiTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 2,
  },
  notiText: {
    fontSize: 12,
    color: "#333",
  },
  notiTime: {
    fontSize: 10,
    color: "#ed8a08",
    fontWeight: "600",
    marginTop: 2,
  },
  seeMoreBtn: {
    marginTop: 10,
    backgroundColor: "#f85e16",
    padding: 10,
    borderRadius: 5,
  },
  seeMoreText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  tipsSection: {
    width: "100%",
    maxHeight: 350,
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 20,
    borderColor: "#aaa",
    borderWidth: 1,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 20,
  },
  tipsList: {
    flexDirection: "column",
    width: "100%",
  },
  tipItem: {
    width: "100%",
    padding: 10,
    minHeight: 60,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  tipIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    borderColor: "#ccc",
    borderWidth: 1,
    overflow: "hidden",
  },
  tipImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  tipNutrients: {
    fontSize: 12,
    color: "#333",
  },
  tipLabel: {
    color: "#ed8a08",
    fontWeight: "600",
  },
  tipLabelAlt: {
    color: "#168bf8",
    fontWeight: "600",
  },
});
