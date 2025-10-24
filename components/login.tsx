// app/login.tsx
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Correo inválido', 'Ingresa un correo electrónico válido.');
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Contraseña inválida',
        'La contraseña debe tener al menos 6 caracteres, incluyendo una letra y un número.'
      );
      return;
    }

    // Si pasa la validación, navega a la app
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Inicia sesión</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="ejemplo@correo.com"
          keyboardType="email-address"
          placeholderTextColor={"#000"}
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Mínimo 6 caracteres, con número"
          secureTextEntry
          placeholderTextColor={"#000"}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});