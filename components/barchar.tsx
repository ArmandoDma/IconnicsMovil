import { getMediciones } from "@/hooks/apiMediciones";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

// Definimos el tipo de una medición
interface Medicion {
  id_medicion: number;
  id_sensor: number;
  hidratacion: number;
  temperatura: number;
  frecuencia_cardiaca: number;
  fecha_hora: string;
}

// Tipo para los datos del gráfico
interface ChartBar {
  label: string;
  value: number;
  frontColor: string;
  tooltipValue: string;
}

export const BarcharGraph: React.FC = () => {
  const { width } = Dimensions.get("window");
  const [chartData, setChartData] = useState<ChartBar[]>([]);

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

        // Inicializar array con los días de la semana
        const weekLabels = ["S", "M", "T", "W", "T", "F", "S"];
        const weekData: { [key: string]: Medicion[] } = {
          S: [], M: [], T: [], W: [], T2: [], F: [], S2: []
        };

        // Mapear fechas a días de la semana
        mediciones.forEach(m => {
          const dayIndex = new Date(m.fecha_hora).getDay(); // 0=Dom, 6=Sáb
          const key = weekLabels[dayIndex] + (dayIndex === 0 || dayIndex === 6 ? (dayIndex === 0 ? "S" : "S2") : dayIndex === 4 ? "T2" : ""); // Para distinguir T y S repetidos
          weekData[key || weekLabels[dayIndex]].push(m);
        });

        // Crear chartData
        const chartDataArray: ChartBar[] = weekLabels.map((label, index) => {
          const key =
            label === "S" && index === 0 ? "S" :
            label === "S" && index === 6 ? "S2" :
            label === "T" && index === 4 ? "T2" :
            label;

          const dayMeasurements = weekData[key];
          const avgHidratacion = dayMeasurements.length
            ? dayMeasurements.reduce((acc, cur) => acc + cur.hidratacion, 0) / dayMeasurements.length
            : 0;
          const avgTemp = dayMeasurements.length
            ? dayMeasurements.reduce((acc, cur) => acc + cur.temperatura, 0) / dayMeasurements.length
            : 0;
          const avgBPM = dayMeasurements.length
            ? dayMeasurements.reduce((acc, cur) => acc + cur.frecuencia_cardiaca, 0) / dayMeasurements.length
            : 0;

          return {
            label,
            value: avgHidratacion,
            frontColor: dayMeasurements.length ? "#107be5ff" : "#4da6ff", // azul fuerte si hay datos, azul claro si proyectado
            tooltipValue: dayMeasurements.length
              ? `Temp: ${avgTemp.toFixed(1)}°C\nBPM: ${avgBPM.toFixed(0)}`
              : "Proyectado",
          };
        });

        setChartData(chartDataArray);
      } catch (error) {
        console.error("Error fetching mediciones:", error);
      }
    };

    fetchData();
  }, []);

  if (chartData.length === 0) return <Text>Cargando datos...</Text>;

  return (
    <View>
      <BarChart
        data={chartData}
        barWidth={30}
        width={width - 60}
        height={220}
        maxValue={100}
        noOfSections={4}
        isAnimated
        hideRules
        hideYAxisText
        xAxisThickness={0}
        yAxisThickness={0}
        barBorderRadius={30}
        barStyle={{ paddingRight: 20 }}
      />
    </View>
  );
};
