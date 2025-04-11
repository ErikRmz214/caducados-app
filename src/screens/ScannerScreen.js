import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Appbar, Text, ActivityIndicator, Button, FAB } from "react-native-paper";
import { Camera, CameraView } from "expo-camera";

export default function ScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        console.log("Solicitando permisos de cámara...");
        const { status } = await Camera.requestCameraPermissionsAsync();
        console.log("Estado de permisos:", status);
        setHasPermission(status === "granted");
        if (status !== "granted") {
          setError("Permisos de cámara no concedidos");
        }
      } catch (err) {
        console.error("Error al solicitar permisos:", err);
        setError("Error al solicitar permisos: " + err.message);
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (scanned) return;
    setScanned(true);
    console.log("Código escaneado:", data);
    Alert.alert("Código Escaneado", `Código: ${data}`, [
      { text: "OK", onPress: () => setScanned(false) },
    ]);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating={true} color="#007bff" size="large" />
        <Text style={{ marginTop: 10 }}>Solicitando permiso para la cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false || error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>{error || "Acceso denegado. Habilita la cámara en la configuración."}</Text>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          Volver
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Escanear Código QR" />
      </Appbar.Header>

      {/* Vista de Cámara */}
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Botón flotante para reintentar escaneo */}
      {scanned && (
        <FAB
          icon="camera"
          label="Escanear de nuevo"
          style={styles.fab}
          onPress={() => setScanned(false)}
        />
      )}

      {/* Botón flotante para cerrar el escáner */}
      <FAB
        icon="close"
        style={styles.fabClose}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

// 🎨 **Estilos Mejorados**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
  },
  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#28a745",
  },
  fabClose: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#dc3545",
  },
});
