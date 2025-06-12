import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { formatearFecha } from "../helpers/fecha";

const Paciente = ({
  item,
  setModalVisible,
  setPaciente,
  pacienteEditar,
  eliminarPaciente,
  setModalPaciente,
}) => {
  const { nombre, fecha, id } = item;

  return (
    <Pressable
      style={styles.contenedor}
      onPress={() => {
        setModalPaciente(true);
        setPaciente(item);
      }}
    >
      <Text style={styles.label}>Paciente:</Text>
      <Text style={styles.texto}>{nombre}</Text>
      <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>

      <View style={styles.contenedorBotones}>
        <TouchableOpacity
          onLongPress={() => {
            setModalVisible(true);
            pacienteEditar(id);
          }}
          style={[styles.btn, styles.btnEditar]}
        >
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnBorrar]}
          onLongPress={() => {
            eliminarPaciente(id);
          }}
        >
          <Text style={styles.btnText}>Borrar</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#fcf7f7",
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },
  label: {
    color: "#374151",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 10,
  },
  texto: {
    color: "#6d28d9",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  fecha: {
    color: "#374151",
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: "#F97316",
  },
  btnBorrar: {
    backgroundColor: "#EF4444",
  },
  btnText: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 12,
    color: "#FFF",
  },
});

export default Paciente;
