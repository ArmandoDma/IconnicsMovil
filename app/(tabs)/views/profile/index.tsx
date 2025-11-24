import { BarcharGraph } from "@/components/barchar";
import { useAuth } from "@/hooks/authcontext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const {user} = useAuth();

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>

          <TouchableOpacity onPress={() => router.push("/views/profile/menu")}>
            <Ionicons name="menu" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Perfil */}
        <View style={styles.profileCard}>
          <Image
            source={require("../../../../assets/images/cemex_dma_spgg.png")}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.nombre}</Text>
            <Text style={styles.level}>{user?.correo}</Text>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>1,208</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>380</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>120h</Text>
                <Text style={styles.statLabel}>Activity</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actividad semanal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.metrics}>
            <Text style={styles.metric}>Calories: 160.5 kcal</Text>
            <Text style={styles.metric}>Time: 01:03:30</Text>
          </View>
          <View style={styles.graphPlaceholder}>
            <BarcharGraph></BarcharGraph>
          </View>
        </View>

        {/* Entrenamientos recientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Trainings</Text>
          <View style={styles.trainingCard}>
            <Ionicons name="barbell" size={24} color="#107be5" />
            <View style={styles.trainingInfo}>
              <Text style={styles.trainingTitle}>Bulgarian Squat</Text>
              <Text style={styles.trainingNote}>
                Keep-fit Exce · 4 days ago
              </Text>
            </View>
          </View>
        </View>

        {/* Galería */}
        {/* Logros recientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementRow}>
            <View style={styles.achievement}>
              <Ionicons name="trophy" size={24} color="#f5a623" />
              <Text style={styles.achievementText}>7-Day Streak</Text>
            </View>
            <View style={styles.achievement}>
              <Ionicons name="walk" size={24} color="#05b047" />
              <Text style={styles.achievementText}>10k Steps</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#2b2b2b" },
  submenu: {
    backgroundColor: "#f7f9ff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 10,
  },
  menuText: { fontSize: 16, color: "#333" },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  profileCard: {
    width: width - 40,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2b2b2b",
  },
  level: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
  },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  metrics: { flexDirection: "row", justifyContent: "space-between" },
  metric: { fontSize: 14, color: "#555" },
  graphPlaceholder: {
    width: width - 40,
    height: 300,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  trainingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f9ff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  trainingInfo: { marginLeft: 10 },
  trainingTitle: { fontSize: 16, fontWeight: "600" },
  trainingNote: { fontSize: 13, color: "#777" },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  achievementRow: {
    flexDirection: "row",
    gap: 15,
  },
  achievement: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    padding: 10,
    width: width / 5,
    height: 120,
    borderRadius: 10,
  },
  achievementText: {
    fontSize: 13,
    color: "#555",
    marginTop: 5,
    textAlign: 'center'
  },
});
