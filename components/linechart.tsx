import { getMediciones } from "@/hooks/apiMediciones";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

// Definimos tipo
interface Medicion {
  id_medicion: number;
  id_sensor: number;
  hidratacion: number;
  temperatura: number;
  frecuencia_cardiaca: number;
  fecha_hora: string;
}

// Tipo para los datos de la línea
interface ChartPoint {
  value: number;
  label: string;
  dataPointText: string;
}

export const WeeklyLineChart: React.FC = () => {
  const { width } = Dimensions.get("window");
  const [chartData, setChartData] = useState<ChartPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicionesRaw: any[] = await getMediciones();
        const mediciones: Medicion[] = medicionesRaw.map(m => ({
          ...m,
          frecuencia_cardiaca: Number(m.frecuencia_cardiaca),
        }));

        // Inicializar array de días de la semana
        const weekLabels = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        const weekData: { [key: string]: Medicion[] } = {};
        weekLabels.forEach(label => (weekData[label] = []));

        // Agrupar mediciones por día
        mediciones.forEach(m => {
          const dayIndex = new Date(m.fecha_hora).getDay(); // 0=Dom
          const label = weekLabels[dayIndex];
          weekData[label].push(m);
        });

        // Crear datos de la gráfica
        const chartPoints: ChartPoint[] = weekLabels.map(label => {
          const dayMeasurements = weekData[label];
          const avgBPM = dayMeasurements.length
            ? dayMeasurements.reduce((acc, cur) => acc + cur.frecuencia_cardiaca, 0) / dayMeasurements.length
            : 0;

          return {
            value: avgBPM,
            label,
            dataPointText: dayMeasurements.length ? avgBPM.toFixed(0) : "0",
          };
        });

        setChartData(chartPoints);
      } catch (error) {
        console.error("Error fetching mediciones:", error);
      }
    };

    fetchData();
  }, []);

  if (chartData.length === 0) return <Text>Cargando datos...</Text>;

  return (
    <View>
      <LineChart
        data={chartData}
        areaChart
        curved
        thickness={3}
        color="#0057ff"
        startFillColor="rgba(0, 87, 255, 0.15)"
        endFillColor="rgba(0, 87, 255, 0.15)"
        startOpacity={1}
        endOpacity={0.2}
        hideDataPoints={false}
        dataPointsColor="#ff7a00"
        dataPointsRadius={4}
        dataPointsWidth={2}
        dataPointsShape="circle"
        yAxisColor="#dcdcdc"
        yAxisTextStyle={{ color: '#222' }}
        xAxisColor="transparent"
        hideRules={false}
        rulesColor="#dcdcdc"
        noOfSections={4}
        maxValue={Math.max(...chartData.map(d => d.value)) * 1.2 || 100}
        isAnimated
        animationDuration={800}
        spacing={40}
        initialSpacing={10}
        hideYAxisText={false}
        yAxisThickness={1}
        xAxisThickness={0}
        yAxisLabelWidth={30}
        width={width - 40}
        height={220}
      />
    </View>
  );
};
