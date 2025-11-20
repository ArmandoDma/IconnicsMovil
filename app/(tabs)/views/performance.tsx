import { WeeklyChart } from "@/components/linechart";
import { StyleSheet, Text, View } from "react-native";

const quickStats = [
  { title: "Calorías", value: "523 kcal" },
  { title: "Tiempo Activo", value: "1h 32m" },
  { title: "Ritmo Cardíaco", value: "124 bpm" },
  { title: "Entrenamientos", value: "2" },
];

const history = [
  { day: "Lunes", data: "612 kcal • 3.4 km • 1h 12m" },
  { day: "Domingo", data: "428 kcal • 2.1 km • 43m" },
  { day: "Sábado", data: "885 kcal • 6.2 km • 1h 55m" },
];

const highlights = [
  "🔥 Nuevo récord personal: 6.2 km",
  "💧 Nivel de hidratación óptimo",
  "💤 Buen descanso: 7h 48m",
];

export default function PerformanceScreen() {
  return (
    <View style={styles.container}>
      {/* Resumen Rápido */}
      <Text style={styles.sectionTitle}>Resumen Rápido</Text>
      <View style={styles.statsGrid}>
        {quickStats.map((item, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statTitle}>{item.title}</Text>
            <Text style={styles.statValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Progreso Semanal */}
      <Text style={styles.sectionTitle}>Progreso Semanal</Text>
      <View style={styles.graphContainer}>
        <WeeklyChart />
      </View>

      {/* Historial */}
      <Text style={styles.sectionTitle}>Historial</Text>
      <View style={styles.historyList}>
        {history.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyDay}>{item.day}</Text>
            <Text style={styles.historyData}>{item.data}</Text>
          </View>
        ))}
      </View>

      {/* Highlights del Día */}
      <Text style={styles.sectionTitle}>Highlights del Día</Text>
      <View style={styles.highlightsList}>
        {highlights.map((text, index) => (
          <Text key={index} style={styles.highlightItem}>{text}</Text>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 30,
    backgroundColor: "#ffffff", // var(--bg)
  },
  sectionTitle: {
    fontSize: 22, // 1.4rem aprox
    marginBottom: 15,
    color: "#0057ff", // var(--primary)
    fontWeight: "700",
  },

  // Quick Stats
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  statCard: {
    width: "48%",
    padding: 15,
    backgroundColor: "#f7f9ff",
    borderWidth: 1,
    borderColor: "#e6e6e6", // var(--border)
    borderRadius: 12,
    alignItems: "center",
  },
  statTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#222",
  },
  statValue: {
    color: "#ff7a00", // var(--accent)
    fontSize: 20,
    fontWeight: "bold",
  },

  // Gráfica
  graphContainer: {
    backgroundColor: "#f7f9ff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    alignItems: "center",
    marginBottom: 10,
  },

  // Historial
  historyList: {
    gap: 12,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f7f9ff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  historyDay: {
    color: "#0057ff", // var(--primary)
    fontWeight: "bold",
  },
  historyData: {
    color: "#222",
  },

  // Highlights
  highlightsList: {
    marginTop: 10,
  },
  highlightItem: {
    padding: 12,
    backgroundColor: "#fff7f0",
    borderLeftWidth: 4,
    borderLeftColor: "#ff7a00", // var(--accent)
    borderRadius: 8,
    marginBottom: 10,
    color: "#222",
  },
});