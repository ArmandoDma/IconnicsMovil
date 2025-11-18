import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bienvenido a Iconnics</Text>
        <Text style={styles.subtitle}>
          Tu espacio para conectar, entrenar y evolucionar
        </Text>

        <View style={styles.cardGrid}>
          <HomeCard
            title="Mi Progreso"
            icon="stats-chart"
            onPress={() => console.log("Ir a progreso")}
          />
          <HomeCard
            title="Notificaciones"
            icon="notifications"
            onPress={() => console.log("Ir a notificaciones")}
          />
          <HomeCard
            title="Entrenamientos"
            icon="walk"
            onPress={() => console.log("Ir a entrenamientos")}
          />
          <HomeCard
            title="Mi Equipo"
            icon="people"
            onPress={() => console.log("Ir a equipo")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeCard({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Icon name={icon} size={32} color="#007AFF" />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 24,
    gap: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
    marginTop: 24,
  },
  card: {
    width: "47%",
    aspectRatio: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  cardText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
});
