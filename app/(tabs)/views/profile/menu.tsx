import { getUserById } from "@/hooks/api";
import { logoutToken } from "@/hooks/apiToken";
import { useAuth } from "@/hooks/authcontext";
import { useNotifications } from "@/hooks/notifications";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuScreen() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);
  const { enableNotifications, disableNotifications } = useNotifications();

  useFocusEffect(
    useCallback(() => {
      const fetchUserDetails = async () => {
        if (user?.id) {
          try {
            const data = await getUserById(user.id);
            setUserDetails(data);
            setDailyReminders(!!data.push_token)
          } catch (err) {
            console.log("Error al traer usuario:", err);
          }
        }
      };

      fetchUserDetails();
    }, [user])
  );

  const toggleSwitch = async () => {
    if (!dailyReminders) {
      // Estaba OFF → Activar
      const ok = await enableNotifications();
      if (ok) setDailyReminders(true);
    } else {
      // Estaba ON → Desactivar
      const ok = await disableNotifications();
      if (ok) setDailyReminders(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (user) {
        const res = await logoutToken(user.id);

        await setUser(null);
        router.replace("/login");
      } else {
        console.log("No hay usuario en contexto");
      }
    } catch (err: any) {
      console.error("Error en logout:", err.message);
    }
  };

  const [dailyReminders, setDailyReminders] = useState<boolean>(false);
  const [promotions, setPromotions] = useState(false);
  const [activityAlerts, setActivityAlerts] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);
  const [vibration, setVibration] = useState(false);
  const [language] = useState("English");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="settings" size={20} color="#1a73e8" />
            <Text style={styles.sectionTitle}>Account Settings</Text>
          </View>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemLabel}>Email</Text>
            <Text>{userDetails?.correo}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemLabel}>Change Password</Text>
            <Ionicons name="lock-closed" size={20} color="#1a73e8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemLabel}>Phone Number</Text>
            <Ionicons name="chevron-forward" size={20} color="#1a73e8" />
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="notifications" size={20} color="#1a73e8" />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>
          <View style={styles.item}>
            <Text>Daily Reminders</Text>
            <Switch
              value={dailyReminders}
              onValueChange={toggleSwitch}
            />
          </View>
          <View style={styles.item}>
            <Text>Promotions & Discounts</Text>
            <Switch value={promotions} onValueChange={setPromotions} />
          </View>
          <View style={styles.item}>
            <Text>Activity Alerts</Text>
            <Switch value={activityAlerts} onValueChange={setActivityAlerts} />
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="cog" size={20} color="#1a73e8" />
            <Text style={styles.sectionTitle}>App Preferences</Text>
          </View>
          <View style={styles.item}>
            <Text>Dark Theme</Text>
            <Switch value={darkTheme} onValueChange={setDarkTheme} />
          </View>
          {/* Language without Picker */}
          <TouchableOpacity style={styles.item}>
            <Text>Language</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text style={{ color: "#333", fontWeight: "600" }}>
                {language}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#1a73e8" />
            </View>
          </TouchableOpacity>
          <View style={styles.item}>
            <Text>Vibration & Haptics</Text>
            <Switch value={vibration} onValueChange={setVibration} />
          </View>
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="shield" size={20} color="#1a73e8" />
            <Text style={styles.sectionTitle}>Privacy</Text>
          </View>
          <TouchableOpacity style={styles.item}>
            <Text>Location Permissions</Text>
            <Ionicons name="chevron-forward" size={20} color="#1a73e8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text>Activity & Data</Text>
            <Ionicons name="chevron-forward" size={20} color="#1a73e8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text>PIN Lock</Text>
            <Ionicons name="key" size={20} color="#1a73e8" />
          </TouchableOpacity>
        </View>

        {/* Help & Support */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="help-circle" size={20} color="#1a73e8" />
            <Text style={styles.sectionTitle}>Help & Support</Text>
          </View>
          <TouchableOpacity style={styles.item}>
            <Text>Help Center</Text>
            <Ionicons name="chevron-forward" size={20} color="#1a73e8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text>Report a Problem</Text>
            <Ionicons name="chevron-forward" size={20} color="#1a73e8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={20} color="#1a73e8" />
          </TouchableOpacity>
        </View>

        {/* Account */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="person-remove" size={20} color="#d64f3a" />
            <Text style={[styles.sectionTitle, { color: "#d64f3a" }]}>
              Account
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.item, styles.danger]}
          >
            <Text style={{ color: "#d64f3a" }}>Log Out</Text>
            <Ionicons name="log-out" size={20} color="#d64f3a" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item, styles.danger]}>
            <Text style={{ color: "#d64f3a" }}>Delete Account</Text>
            <Ionicons name="trash" size={20} color="#d64f3a" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  section: { marginBottom: 35 },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#1a73e8",
    fontWeight: "600",
  },
  item: {
    backgroundColor: "#f7f9fb",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e4e7eb",
  },
  itemLabel: { fontWeight: "600", marginBottom: 4 },
  danger: {
    backgroundColor: "#fff4f2",
    borderColor: "#ffdad3",
  },
});
