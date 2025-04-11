import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Appbar, Card, Text, FAB, Divider, List } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  // Estado para la lista de productos (esto se conectará con la API en el futuro)
  const [productos, setProductos] = useState([
    { id: "1", nombre: "Leche", tipo: "Lácteos", caducidad: "2025-07-22" },
    { id: "2", nombre: "Pan", tipo: "Panadería", caducidad: "2025-01-31" },
    { id: "3", nombre: "Tomate", tipo: "Verduras", caducidad: "2025-01-28" },
  ]);

  // Función para calcular el estado del producto (Semáforo)
  const calcularEstado = (fechaCaducidad) => {
    const hoy = new Date();
    const caducidad = new Date(fechaCaducidad);
    const diferencia = Math.ceil((caducidad - hoy) / (1000 * 60 * 60 * 24));

    if (diferencia <= 0) return "red"; // Caducado
    if (diferencia <= 7) return "yellow"; // Próximo a caducar
    return "green"; // En buen estado
  };

  return (
    <View style={styles.container}>
      {/* Encabezado de la pantalla */}
      <Appbar.Header>
        <Appbar.Content title="Inventario" />
        <Appbar.Action icon="bell" onPress={() => navigation.navigate("Alertas")} />
        <Appbar.Action icon="cog" onPress={() => navigation.navigate("Configuración")} />
      </Appbar.Header>

      {/* Lista de productos */}
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const estadoColor = calcularEstado(item.caducidad);

          return (
            <Card
              style={styles.card}
              onPress={() => navigation.navigate("Details", { producto: item })}
            >
              <Card.Content>
                <List.Item
                  title={item.nombre}
                  description={item.tipo}
                  left={() => <View style={[styles.estado, { backgroundColor: estadoColor }]} />}
                />
              </Card.Content>
            </Card>
          );
        }}
        ItemSeparatorComponent={() => <Divider />}
      />

      {/* Botones flotantes */}
      <FAB
        icon="plus"
        label="Agregar"
        style={[styles.fab, { bottom: 80 }]}
        onPress={() => navigation.navigate("RegisterProduct")}
      />
      <FAB
        icon="camera"
        label="Escanear"
        style={[styles.fab, { bottom: 20 }]}
        onPress={() => navigation.navigate("Scanner")}
      />
    </View>
  );
}

// 🎨 **Estilos Mejorados**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 3,
  },
  estado: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 15,
  },
  fab: {
    position: "absolute",
    right: 20,
  },
});
