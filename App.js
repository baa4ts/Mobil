import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";

import { Formulario } from "./src/components/Formulario";
import Paciente from "./src/components/Paciente";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={({ pressed }) => [
          styles.btnNuevo,
          pressed && styles.btnNuevoPressed,
        ]}
      >
        <Text style={styles.btnNuevoTexto}>Nuevo</Text>
      </Pressable>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes</Text>
      ) : (
        <FlatList
          data={pacientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Paciente paciente={item} />}
        />
      )}

      <Formulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        pacientes={pacientes}
        setPacientes={setPacientes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  btnNuevo: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#6D28D9",
    marginBottom: "5%",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  btnNuevoPressed: {
    backgroundColor: "#5B21B6",
    transform: [{ scale: 1.1 }],
  },
  btnNuevoTexto: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  noPacientes: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
});
