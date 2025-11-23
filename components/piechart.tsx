import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function StepsDonut() {
  const stepsCompleted = 7200;
  const stepsGoal = 10000;
  const stepsRemaining = stepsGoal - stepsCompleted;

  const data = [
    { value: stepsCompleted, color: "#107be5" },
    { value: stepsRemaining, color: "#e0e0e0" },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        donut
        showText
        textColor="#e5101b"
        textSize={16}
        radius={100}       
        innerRadius={70}
        centerLabelComponent={() => (
          <Text style={styles.centerText}>
            {stepsCompleted.toLocaleString()} steps
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  centerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e5101b",
    textAlign: "center",
  },
});