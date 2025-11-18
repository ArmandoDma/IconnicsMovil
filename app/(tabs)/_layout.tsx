import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="views/performance"
        options={{
          title: "Performance",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "speedometer" : "speedometer-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="views/bodydata"
        options={{
          title: "Body Data",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "body" : "body-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="views/benefits"
        options={{
          title: "Benefits",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "medkit" : "medkit-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="views/profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "person-circle" : "person-circle-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
