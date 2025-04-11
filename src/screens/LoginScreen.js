import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log("Iniciando sesión con:", email);
      navigation.replace("Main"); // Simulación de inicio de sesión
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Iniciar Sesión
      </Text>

      <TextInput
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      {loading ? (
        <ActivityIndicator animating={true} color="#007bff" size="large" />
      ) : (
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Entrar
        </Button>
      )}
    </View>
  );
}

// 🎨 **Estilos Mejorados**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
  },
});

