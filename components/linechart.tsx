import { LineChart } from 'react-native-gifted-charts';

const weeklyCalories = [
  { value: 520, label: 'Lun', dataPointText: '520' },
  { value: 680, label: 'Mar', dataPointText: '680' },
  { value: 450, label: 'Mié', dataPointText: '450' },
  { value: 700, label: 'Jue', dataPointText: '700' },
  { value: 810, label: 'Vie', dataPointText: '810' },
  { value: 900, label: 'Sáb', dataPointText: '900' },
  { value: 610, label: 'Dom', dataPointText: '610' },
];

export function WeeklyChart() {
  return (
    <LineChart
      data={weeklyCalories}
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
      maxValue={1000}
      isAnimated
      animationDuration={800}
      spacing={40}
      initialSpacing={10}
      hideYAxisText={false}
      yAxisThickness={1}
      xAxisThickness={0}
      yAxisLabelWidth={30}
      width={350}
      height={220}
    />
  );
}