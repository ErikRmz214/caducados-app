import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Card, Text, Button, Chip } from "react-native-paper";

export default function DetailsScreen({ route, navigation }) {
  const { producto } = route.params;

  // Función para calcular estado del producto (semáforo)
  const calcularEstado = (fechaCaducidad) => {
    const hoy = new Date();
    const caducidad = new Date(fechaCaducidad);
    const diferencia = Math.ceil((caducidad - hoy) / (1000 * 60 * 60 * 24));

    if (diferencia <= 0) return { color: "red", text: "Caducado" };
    if (diferencia <= 7) return { color: "yellow", text: "Próximo a caducar" };
    return { color: "green", text: "En buen estado" };
  };

  const estado = calcularEstado(producto.caducidad);

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
        <Appbar.Content title="Detalles del Producto" />
      </Appbar.Header>

      {/* Tarjeta con la información del producto */}
      <Card style={styles.card}>
        <Card.Title title={producto.nombre} subtitle={producto.tipo} />
        <Card.Content>
          <Text variant="bodyLarge">Fecha de caducidad: {producto.caducidad}</Text>
          <Chip style={[styles.chip, { backgroundColor: estado.color }]}>{estado.text}</Chip>
          {sugerencias[producto.nombre] && (
            <Text style={styles.sugerencia}>💡 {sugerencias[producto.nombre]}</Text>
          )}
        </Card.Content>

        {/* Botones de acción */}
        <Card.Actions>
          <Button mode="contained" onPress={() => alert("Función de edición próximamente")}>
            ✏️ Editar
          </Button>
          <Button mode="contained" buttonColor="#dc3545" onPress={() => alert("Función de eliminación próximamente")}>
            🗑 Eliminar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

// 🎨 **Estilos Mejorados**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  card: {
    marginVertical: 20,
    padding: 10,
  },
  chip: {
    marginTop: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  sugerencia: {
    marginTop: 15,
    fontStyle: "italic",
    color: "#28a745",
  },
});
