import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Text, Switch, List, Button, Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export default function SettingsScreen({ navigation }) {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [notificaciones, setNotificaciones] = useState(true);

  // Alternar Modo Oscuro (Solo funcional dentro de la sesión actual)
  const toggleModoOscuro = () => setModoOscuro((prev) => !prev);

  // Alternar Notificaciones
  const toggleNotificaciones = () => setNotificaciones((prev) => !prev);

  // Función de Cierre de Sesión
  const handleLogout = () => {
    navigation.replace("Login"); // Redirige a LoginScreen
  };

  // Tema dinámico (No se guarda al reiniciar la app)
  const theme = modoOscuro ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Encabezado */}
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Configuración" />
        </Appbar.Header>

        {/* Opciones de Configuración */}
        <List.Section>
          <List.Item
            title="Notificaciones"
            left={(props) => <List.Icon {...props} icon="bell-outline" />}
            right={() => <Switch value={notificaciones} onValueChange={toggleNotificaciones} />}
          />

          <List.Item
            title="Modo Oscuro"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => <Switch value={modoOscuro} onValueChange={toggleModoOscuro} />}
          />
        </List.Section>

        {/* Botón de Cerrar Sesión */}
        <Button mode="contained" buttonColor="#dc3545" onPress={handleLogout} style={styles.button}>
          Cerrar Sesión
        </Button>
      </View>
    </PaperProvider>
  );
}

// 🎨 **Estilos Mejorados**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
  },
});
