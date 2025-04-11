import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Text, TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function RegisterProductScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [fechaCaducidad, setFechaCaducidad] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleRegister = () => {
    if (!nombre || !tipo) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    // Aquí se conectará con la API en el futuro para guardar el producto
    alert(`Producto "${nombre}" registrado.`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Registrar Producto" />
      </Appbar.Header>

      {/* Formulario */}
      <View style={styles.form}>
        <TextInput
          label="Nombre del producto"
          value={nombre}
          onChangeText={setNombre}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Tipo de producto (Ej: Lácteos, Carnes, etc.)"
          value={tipo}
          onChangeText={setTipo}
          mode="outlined"
          style={styles.input}
        />

        <Button
          mode="outlined"
          onPress={() => setShowPicker(true)}
          style={styles.dateButton}
        >
          {fechaCaducidad.toDateString()}
        </Button>

        {showPicker && (
          <DateTimePicker
            value={fechaCaducidad}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setFechaCaducidad(selectedDate);
            }}
          />
        )}

        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
        >
          Guardar Producto
        </Button>
      </View>
    </View>
  );
}

// 🎨 **Estilos Mejorados**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  form: {
    padding: 20,
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
  },
  dateButton: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
