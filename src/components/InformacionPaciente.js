import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { formatearFecha } from "../helpers/fecha";

const InformacionPaciente = ({ paciente = {}, setModalPaciente }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setModalPaciente(false)}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>
        Información <Text style={styles.titleBold}>Paciente</Text>
      </Text>

      <View style={styles.card}>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{paciente.paciente || "Desconocido"}</Text>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Propietario:</Text>
          <Text style={styles.value}>{paciente.nombre || "Desconocido"}</Text>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{paciente.email || "Desconocido"}</Text>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{paciente.telefono || "Desconocido"}</Text>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>
            {formatearFecha(paciente.fecha) || "Desconocido"}
          </Text>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Síntomas:</Text>
          <Text style={styles.value}>{paciente.sintomas || "Desconocido"}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F97316",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#FFFFFF",
  },
  titleBold: {
    fontWeight: "900",
  },
  card: {
    marginTop: 30,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  campo: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    marginBottom: 3,
  },
  value: {
    fontSize: 18,
    color: "#000",
    fontWeight: "700",
  },
});

export default InformacionPaciente;
