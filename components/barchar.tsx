import { BarChart } from "react-native-gifted-charts";

export const BarcharGraph = () => {
    const data = [28, 32, 34, 45, 65, 70, 90];
    const projectedDays = [false, false, false, false, true, true, true];
    const backgroundColors = projectedDays.map((isProjected) =>
        isProjected ? "#4da6ff" : "#107be5ff"
    );
    const labels = ["S", "M", "T", "W", "T", "F", "S"];
    const chartData = data.map((value, index) => ({
        value,
        label: labels[index],
        frontColor: backgroundColors[index]
    }));

    return (
        <BarChart
            data={chartData}
            barWidth={30}
            width={screen.width - 60}
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
    )
}
