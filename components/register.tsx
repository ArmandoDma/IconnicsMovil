import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface FormData {
    username: string;
    lastname: string;
    weight: string;
    height: string;
    age: string;
    email: string;
    password: string;
    sport: string;
    role: string;
}

export default function RegisterScreen() {
    const [form, setForm] = useState<FormData>({
        username: "",
        lastname: "",
        weight: "",
        height: "",
        age: "",
        email: "",
        password: "",
        sport: "",
        role: "Deportista",
    });

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
    const edadRegex = /^\d{1,3}$/;
    const pesoRegex = /^\d{1,3}(\.\d{1,2})?$/;
    const alturaRegex = /^\d{1}(\.\d{1,2})?m$/;
    const deporteRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const rolesValidos = ["Entrenador", "Deportista"];

    const handleSubmit = () => {
        const {
            username,
            lastname,
            weight,
            height,
            age,
            email,
            password,
            sport,
            role,
        } = form;

        if (!nombreRegex.test(username)) {
            alert("Nombre inválido. Solo letras y espacios, mínimo 2 caracteres.");
            return;
        }
        if (!nombreRegex.test(lastname)) {
            alert("Apellido inválido. Solo letras y espacios, mínimo 2 caracteres.");
            return;
        }
        if (!edadRegex.test(age)) {
            alert("Edad inválida. Solo números, máximo 3 dígitos.");
            return;
        }
        if (!rolesValidos.includes(role)) {
            alert("Rol inválido. Selecciona uno válido.");
            return;
        }
        if (!pesoRegex.test(weight)) {
            alert("Peso inválido. Usa formato numérico (ej. 70 o 70.5).");
            return;
        }
        if (!alturaRegex.test(height)) {
            alert("Altura inválida. Usa formato tipo 1.75m.");
            return;
        }
        if (!deporteRegex.test(sport)) {
            alert("Deporte inválido. Solo letras y espacios.");
            return;
        }
        if (!emailRegex.test(email)) {
            alert("Correo inválido.");
            return;
        }
        if (!passwordRegex.test(password)) {
            alert("Contraseña inválida. Mínimo 6 caracteres, con letra y número.");
            return;
        }

        // Si todo pasa:
        console.log("Formulario válido:", form);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.wrapper}>
                <ScrollView contentContainerStyle={styles.formContainer}>
                    <View style={styles.form}>
                        <Text style={styles.title}>Create An Account</Text>

                        {/* Name + Lastname */}
                        <View style={styles.row}>
                            <View style={styles.inputGroupHalf}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Write your name"
                                    value={form.username}
                                    onChangeText={(text) => handleChange("username", text)}
                                />
                            </View>
                            <View style={styles.inputGroupHalf}>
                                <Text style={styles.label}>Lastname(s)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Write your last name"
                                    value={form.lastname}
                                    onChangeText={(text) => handleChange("lastname", text)}
                                />
                            </View>
                        </View>

                        {/* Weight + Height + Age */}
                        <View style={styles.row}>
                            <View style={styles.inputGroupThird}>
                                <Text style={styles.label}>Weight</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Put your weight"
                                    keyboardType="numeric"
                                    value={form.weight}
                                    onChangeText={(text) => handleChange("weight", text)}
                                />
                            </View>
                            <View style={styles.inputGroupThird}>
                                <Text style={styles.label}>Height</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Write your height"
                                    value={form.height}
                                    onChangeText={(text) => handleChange("height", text)}
                                />
                            </View>
                            <View style={styles.inputGroupThird}>
                                <Text style={styles.label}>Age</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Write your age"
                                    keyboardType="numeric"
                                    value={form.age}
                                    onChangeText={(text) => handleChange("age", text)}
                                />
                            </View>
                        </View>

                        {/* Email + Password */}
                        <View style={styles.row}>
                            <View style={styles.inputGroupHalf}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Write your email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={form.email}
                                    onChangeText={(text) => handleChange("email", text)}
                                />
                            </View>
                            <View style={styles.inputGroupHalf}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Set your password"
                                    secureTextEntry
                                    value={form.password}
                                    onChangeText={(text) => handleChange("password", text)}
                                />
                            </View>
                        </View>
                        {/* Sport */}
                        <View style={styles.fullWidth}>
                            <Text style={styles.label}>Sport</Text>
                            <View style={styles.selectBox}>
                                <Picker
                                    selectedValue={form.sport}
                                    onValueChange={(value) => handleChange("sport", value)}
                                    mode="dropdown"
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Select sport" value="" />
                                    <Picker.Item label="Cycling" value="Cycling" />
                                    <Picker.Item label="Running" value="Running" />
                                    <Picker.Item label="Swimming" value="Swimming" />
                                    <Picker.Item label="Gymnastics" value="Gymnastics" />
                                </Picker>
                            </View>
                        </View>

                        {/* Role */}
                        <View style={styles.fullWidth}>
                            <Text style={styles.label}>Role</Text>
                            <View style={styles.selectBox}>
                                <Picker
                                    selectedValue={form.role}
                                    onValueChange={(value) => handleChange("role", value)}
                                    mode="dropdown"
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Select role" value="" />
                                    <Picker.Item label="Entrendor" value="Entrenador" />
                                    <Picker.Item label="Deportista" value="Deportista" />
                                </Picker>
                            </View>
                        </View>

                        {/* Submit */}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    formContainer: {
        padding: 24,
        width: "90%",
        margin: "auto",
        alignItems: "center",
        zIndex: 1,
    },
    form: {
        width: "100%",
        maxWidth: 400,
        padding: 16,
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 8,
        backgroundColor: "#fff",
        shadowColor: "#5f5e5e",
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        color: "#f69708",
        marginBottom: 24,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 20,
    },
    inputGroupHalf: {
        flex: 1,
        minWidth: "48%",
    },
    inputGroupThird: {
        flex: 1,
        minWidth: "30%",
    },
    fullWidth: {
        width: "100%",
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        marginBottom: 4,
        color: "#000",
    },
    input: {
        borderWidth: 1,
        borderColor: "#aaa",
        padding: 10,
        borderRadius: 5,
        fontSize: 14,
        color: "#297bef",
    },
    button: {
        backgroundColor: "#297bef",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    selectBox: {
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 6,
        overflow: "hidden",
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    picker: {
        color: "#297bef",
        fontSize: 14,
        backgroundColor: "transparent",
        borderWidth: 0,
    },
});