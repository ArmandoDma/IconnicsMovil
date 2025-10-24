
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={28} color="#007AFF" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          /*tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),*/
        }}
      />
    </Tabs>
  );
}