import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Appbar, Card, Text, Button, Chip, List } from "react-native-paper";

export default function AlertsScreen({ navigation }) {
  // Simulación de productos próximos a caducar
  const [productos, setProductos] = useState([
    { id: "1", nombre: "Leche", tipo: "Lácteos", caducidad: "2025-03-18" },
    { id: "2", nombre: "Pan", tipo: "Panadería", caducidad: "2025-03-15" },
    { id: "3", nombre: "Tomate", tipo: "Verduras", caducidad: "2025-03-20" },
  ]);

  // Función para calcular el estado del producto (Semáforo)
  const calcularEstado = (fechaCaducidad) => {
    const hoy = new Date();
    const caducidad = new Date(fechaCaducidad);
    const diferencia = Math.ceil((caducidad - hoy) / (1000 * 60 * 60 * 24));

    if (diferencia <= 0) return { color: "red", text: "Caducado" };
    if (diferencia <= 7) return { color: "yellow", text: "Próximo a caducar" };
    return { color: "green", text: "En buen estado" };
  };

  // Sugerencias de reutilización según el tipo de producto
  const sugerencias = {
    Leche: "Puedes hacer yogurt o jocoque.",
    Pan: "Haz pan molido o tostadas.",
    Tomate: "Úsalo en una salsa o ensalada.",
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="⚠️ Alertas de Productos" />
      </Appbar.Header>

      {/* Lista de alertas */}
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const estado = calcularEstado(item.caducidad);

          return (
            <Card style={styles.card}>
              <Card.Content>
                <List.Item
                  title={item.nombre}
                  description={item.tipo}
                  left={() => <Chip style={[styles.chip, { backgroundColor: estado.color }]}>{estado.text}</Chip>}
                />
                {sugerencias[item.nombre] && (
                  <Text style={styles.sugerencia}>💡 {sugerencias[item.nombre]}</Text>
                )}
              </Card.Content>
            </Card>
          );
        }}
      />

      {/* Botón de regreso */}
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("Inicio")}
      >
        Volver al Inventario
      </Button>
    </View>
  );
}

// 🎨 **Estilos Mejorados**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  card: {
    marginVertical: 5,
    padding: 10,
    elevation: 3,
  },
  chip: {
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  sugerencia: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#28a745",
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
  },
});
