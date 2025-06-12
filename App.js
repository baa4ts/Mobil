import React, { use, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  Modal,
} from "react-native";

import { Formulario } from "./src/components/Formulario";
import Paciente from "./src/components/Paciente";
import InformacionPaciente from "./src/components/InformacionPaciente";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);

  const pacienteEditar = (id) => {
    const pacienteEditar = pacientes.filter((paciente) => paciente.id === id);
    setPaciente(pacienteEditar[0]);
  };

  const eliminarPaciente = (id) => {
    Alert.alert(
      "¿ estas seguro de eliminar ?",
      "Si lo eliminas no se podra recuperar",
      [
        { text: "Cancelar" },
        {
          text: "Si, Eliminar",
          onPress: () => {
            const pacientesActualizados = pacientes.filter(
              (pacientesState) => pacientesState.id !== id
            );

            setPacientes(pacientesActualizados);
          },
        },
      ]
    );
    console.log(`Eliminando: ${id}`);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrador</Text>

      <Pressable
        onPress={() => {
          setModalVisible(!modalVisible);
          setPaciente({});
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
          renderItem={({ item }) => (
            <Paciente
              setModalVisible={setModalVisible}
              item={item}
              setPaciente={setPaciente}
              pacienteEditar={pacienteEditar}
              eliminarPaciente={eliminarPaciente}
              setModalPaciente={setModalPaciente}
            />
          )}
          style={styles.flatList}
        />
      )}

      {modalVisible && (
        <Formulario
          cerrarModal={cerrarModal}
          pacientes={pacientes}
          paciente={paciente}
          setPacientes={setPacientes}
          setPaciente={setPaciente}
        />
      )}

      <Modal visible={modalPaciente} animationType="fade">
        <InformacionPaciente
          paciente={paciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
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
