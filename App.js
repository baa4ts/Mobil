import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";

import { Formulario } from "./src/components/Formulario";
import Paciente from "./src/components/Paciente";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  const pacienteEditar = (id) => {
    const pacienteEditar = pacientes.filter((paciente) => paciente.id === id);
    setPaciente(pacienteEditar[0]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrador</Text>

      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
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
          renderItem={({ item }) => (
            <Paciente
              setModalVisible={setModalVisible}
              item={item}
              pacienteEditar={pacienteEditar}
            />
          )}
          style={styles.flatList}
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
    paddingTop: 40,
    flexDirection: "column",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  btnNuevo: {
    marginBottom: 10,
    backgroundColor: "#6D28D9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "center",
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
  flatList: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: 15,
  },
  noPacientes: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
});
