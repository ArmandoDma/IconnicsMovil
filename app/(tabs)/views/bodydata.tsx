import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";

const {width} = Dimensions.get("window")

export default function DModelSection() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardModel}>
        <View style={styles.anatomyCanvas}>
          <Text style={{ color: "#999" }}>Anatomy Canvas Placeholder</Text>
        </View>
      </View>

      {/* Card Details */}
      <View style={styles.cardDetails}>
        <Text style={styles.sectionTitle}>User Info</Text>
        <View style={styles.metricsList}>
          {/* User Info */}
          <LinearGradient colors={["#1665f8", "#107be5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardInfo}>
            <View style={styles.imgProfile}>
              <Image
                source={require("../../../assets/images/icon.png")}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.userCap}>
              <View style={styles.tabs}>
                <Text>Weight: 70 kg</Text>
                <Text>Blood Type: A+</Text>
              </View>
              <Text style={styles.username}>Username</Text>
              <View style={styles.caps}>
                <Text>Genre: Male</Text>
                <Text>Age: 23 years old</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.grid}>
            <LinearGradient colors={["#0f501b", "#05b047"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }} style={styles.cardHealth}>
              <Text style={styles.cardSubtitle}>Health Status:</Text>
              <Text style={styles.cardValue}>Good</Text>
            </LinearGradient>
            <View style={styles.cardRow}>
              <Ionicons name="flask" size={28} color="#0057ff" />
              <View style={styles.infoCard}>
                <Text style={styles.cardSubtitle}>Blood Pressure</Text>
                <Text>120 / 60 mmHg</Text>
              </View>
            </View>
            <View style={styles.cardRow}>
              <Ionicons name="heart" size={28} color="#ff4d4d" />
              <View style={styles.infoCard}>
                <Text style={styles.cardSubtitle}>Heart Rate</Text>
                <Text>72 bpm</Text>
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
                <Text>Realizado — 7.2h registradas</Text>
              </View>
            </View>
            <View style={styles.testItem}>
              <Ionicons name="calendar" size={22} color="#0057ff" />
              <View style={styles.testInfo}>
                <Text style={styles.cardSubtitle}>Glucose</Text>
                <Text>Programado — 15 Nov 2025 a las 8:00 AM</Text>
              </View>
            </View>
            <View style={styles.testItem}>
              <Ionicons name="checkmark-circle" size={22} color="#4caf50" />
              <View style={styles.testInfo}>
                <Text style={styles.cardSubtitle}>Oxigenation</Text>
                <Text>Realizado — 97% saturación</Text>
              </View>
            </View>
          </View>

          {/* Steps Chart Placeholder */}
          <View style={styles.stepsChart}>
            <Text style={{ color: "#999" }}>Steps Chart Placeholder</Text>
          </View>
        </View>
      </View>

      {/* Card Graphic */}
      <View style={styles.cardGraphic}>
        <Text>Selecciona una parte del cuerpo para ver sus métricas...</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    justifyContent: "center",
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
    marginVertical: 5,
  },
  caps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  grid:{  
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardHealth: {
    width: width / 2.375,
    padding: 20,
    height: 100,
    borderRadius: 15,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  cardValue: {
    fontSize: 16,
    color: "#4caf50",
  },
  cardRow: {
    width: width /2.375,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    color: '#000',
    backgroundColor: "#f7f9ff",
    padding: 20,
    borderRadius: 15,
  },
  infoCard: {
    flex: 1,
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
  },
  stepsChart: {
    marginTop: 15,
    width: "100%",
    height: 150,
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