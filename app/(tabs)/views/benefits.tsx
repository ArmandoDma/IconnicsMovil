import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export default function benefits() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Beneficios Iconnics</Text>
        <Text style={styles.subtitle}>
          Explora tus recompensas, logros y ventajas exclusivas
        </Text>

        <View style={styles.cardGrid}>
          <BenefitCard
            title="Desbloqueo de Rutinas"
            icon="flame"
            onPress={() => console.log("Ir a rutinas desbloqueadas")}
          />
          <BenefitCard
            title="Premios por Progreso"
            icon="trophy"
            onPress={() => console.log("Ir a premios")}
          />
          <BenefitCard
            title="Acceso VIP"
            icon="star"
            onPress={() => console.log("Ir a beneficios VIP")}
          />
          <BenefitCard
            title="Descuentos en Productos"
            icon="pricetag"
            onPress={() => console.log("Ir a descuentos")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function BenefitCard({
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