import { WeeklyLineChart } from "@/components/linechart";
import { getMediciones } from "@/hooks/apiMediciones";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Tipos
interface Medicion {
  id_medicion: number;
  id_sensor: number;
  hidratacion: number;
  temperatura: number;
  frecuencia_cardiaca: number;
  fecha_hora: string;
}

interface QuickStat {
  title: string;
  value: string;
}

interface HistoryItem {
  day: string;
  data: string;
}

export default function PerformanceScreen() {
  const [quickStats, setQuickStats] = useState<QuickStat[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicionesRaw: any[] = await getMediciones();
        const mediciones: Medicion[] = medicionesRaw.map(m => ({
          ...m,
          hidratacion: Number(m.hidratacion),
          temperatura: Number(m.temperatura),
          frecuencia_cardiaca: Number(m.frecuencia_cardiaca),
        }));

        // Agrupar por día
        const grouped: { [day: string]: Medicion[] } = {};
        mediciones.forEach(m => {
          const day = new Date(m.fecha_hora).toLocaleDateString("en-US", { weekday: "long" });
          if (!grouped[day]) grouped[day] = [];
          grouped[day].push(m);
        });

        // Calcular stats
        let totalCalories = 0;
        let totalMinutes = 0;
        let bpmSum = 0;
        let bpmCount = 0;
        let workoutsCount = 0;

        const historyArray: HistoryItem[] = [];

        Object.keys(grouped).forEach(day => {
          const dayMeasurements = grouped[day];

          // Simular calorías y duración basadas en hidratación, BPM y temperatura
          const dayCalories = dayMeasurements.reduce((acc, cur) => {
            const calories = cur.frecuencia_cardiaca * 0.12 + cur.hidratacion * 0.5 + cur.temperatura * 0.3;
            return acc + calories;
          }, 0);

          const dayMinutes = Math.min(dayMeasurements.length * 30, 120); // máximo 2h por día
          const dayBPM = dayMeasurements.reduce((acc, cur) => acc + cur.frecuencia_cardiaca, 0) / dayMeasurements.length;

          totalCalories += dayCalories;
          totalMinutes += dayMinutes;
          bpmSum += dayBPM;
          bpmCount += 1;
          workoutsCount += dayMeasurements.length ? 1 : 0;

          historyArray.push({
            day,
            data: `${Math.round(dayCalories)} kcal • ${(
              dayMinutes / 60
            ).toFixed(1)} h • BPM: ${Math.round(dayBPM)}`,
          });
        });

        setQuickStats([
          { title: "Calories", value: `${Math.round(totalCalories)} kcal` },
          { title: "Active Time", value: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m` },
          { title: "Heart Rate", value: `${Math.round(bpmSum / bpmCount)} bpm` },
          { title: "Workouts", value: `${workoutsCount}` },
        ]);

        setHistory(historyArray);

        setHighlights([
          `🔥 Highest daily calories: ${Math.round(Math.max(...historyArray.map(h => parseFloat(h.data.split(" ")[0]))))} kcal`,
          `💧 Optimal hydration detected`,
          `💤 Average BPM: ${Math.round(bpmSum / bpmCount)} bpm`,
        ]);
      } catch (error) {
        console.error("Error fetching mediciones:", error);
      }
    };

    fetchData();
  }, []);

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
          <WeeklyLineChart />
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
