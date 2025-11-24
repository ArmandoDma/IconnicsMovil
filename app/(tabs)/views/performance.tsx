import { WeeklyChart } from "@/components/linechart";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const quickStats = [
  { title: "Calories", value: "523 kcal" },
  { title: "Active Time", value: "1h 32m" },
  { title: "Heart Rate", value: "124 bpm" },
  { title: "Workouts", value: "2" },
];

const history = [
  { day: "Monday", data: "612 kcal • 3.4 km • 1h 12m" },
  { day: "Sunday", data: "428 kcal • 2.1 km • 43m" },
  { day: "Saturday", data: "885 kcal • 6.2 km • 1h 55m" },
];

const highlights = [
  "🔥 New personal record: 6.2 km",
  "💧 Optimal hydration level",
  "💤 Good rest: 7h 48m",
];

export default function PerformanceScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Quick Summary</Text>
        <View style={styles.statsGrid}>
          {quickStats.map((item, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statTitle}>{item.title}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Weekly Progress</Text>
        <View style={styles.graphContainer}>
          <WeeklyChart />
        </View>

        <Text style={styles.sectionTitle}>History</Text>
        <View style={styles.historyList}>
          {history.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyDay}>{item.day}</Text>
              <Text style={styles.historyData}>{item.data}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Daily Highlights</Text>
        <View style={styles.highlightsList}>
          {highlights.map((text, index) => (
            <Text key={index} style={styles.highlightItem}>
              {text}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  sectionTitle: {
    fontSize: 22,
    marginTop: 15,
    marginBottom: 15,
    color: "#000",
    fontWeight: "700",
  },
  statsGrid: {
    width: width - 40,
    flexDirection: "row",
    overflow: "hidden",
    flexWrap: "wrap",
    gap: 10,
  },
  statCard: {
    width: width / 2.3,
    padding: 15,
    backgroundColor: "#f7f9ff",
    borderWidth: 1,
    borderColor: "#e6e6e6",
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
    color: "#ff7a00",
    fontSize: 20,
    fontWeight: "bold",
  },

  // Graph
  graphContainer: {
    backgroundColor: "#f7f9ff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    alignItems: "center",
    marginBottom: 10,
  },

  // History
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
    color: "#0057ff",
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
    borderLeftColor: "#ff7a00",
    borderRadius: 8,
    marginBottom: 10,
    color: "#222",
  },
});