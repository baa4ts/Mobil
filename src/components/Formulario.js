import React, { useRef, useState, useEffect } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

export const Formulario = ({
  cerrarModal,
  modalVisible,
  setPacientes,
  pacientes,
  setPaciente: setPacienteInstancia,
  paciente: PacienteOBJ,
}) => {
  const [paciente, setPaciente] = useState("");
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [sintomas, setSintomas] = useState("");

  useEffect(() => {
    if (Object.keys(PacienteOBJ).length > 0) {
      setPaciente(PacienteOBJ.paciente);
      setId(PacienteOBJ.id);
      setNombre(PacienteOBJ.nombre);
      setEmail(PacienteOBJ.email);
      setTelefono(PacienteOBJ.telefono);
      setFecha(new Date(PacienteOBJ.fecha));
      setSintomas(PacienteOBJ.sintomas);
    }
  }, [PacienteOBJ]);

  const propietarioRef = useRef();
  const emailRef = useRef();
  const telefonoRef = useRef();
  const sintomasRef = useRef();

  const handleCita = () => {
    if ([paciente, nombre, email, telefono, sintomas].includes("") || !fecha) {
      Alert.alert("Datos Incompletos", "Todos los campos son obligatorios");
      return;
    }

    const nuevoPaciente = {
      paciente,
      nombre,
      email,
      telefono,
      fecha,
      sintomas,
    };

    if (id) {
      nuevoPaciente.id = id;

      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === id ? nuevoPaciente : pacienteState
      );
      console.log("pacinete actualizado");
      setPacientes(pacientesActualizados);
      setPacienteInstancia({});
    } else {
      console.log("nuevo");
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }

    setPaciente("");
    setNombre("");
    setEmail("");
    setTelefono("");
    setFecha(new Date());
    setSintomas("");
    cerrarModal();
  };

  const formatearFecha = (date) =>
    date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <Modal animationType="fade" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {PacienteOBJ.id ? "Editar" : "Nuevo"}{" "}
            <Text style={styles.tituloBold}>cita</Text>
          </Text>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre paciente"
              returnKeyType="next"
              onSubmitEditing={() => propietarioRef.current.focus()}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre propietario</Text>
            <TextInput
              ref={propietarioRef}
              style={styles.input}
              placeholder="Nombre propietario"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email propietario</Text>
            <TextInput
              ref={emailRef}
              style={styles.input}
              keyboardType="email-address"
              placeholder="Email propietario"
              returnKeyType="next"
              onSubmitEditing={() => telefonoRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono propietario</Text>
            <TextInput
              ref={telefonoRef}
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Teléfono propietario"
              returnKeyType="next"
              onSubmitEditing={() => sintomasRef.current.focus()}
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha alta</Text>
            <Pressable onPress={() => setMostrarPicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Selecciona fecha"
                value={formatearFecha(fecha)}
                editable={false}
              />
            </Pressable>
            {mostrarPicker && (
              <DateTimePicker
                value={fecha}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setMostrarPicker(false);
                  if (selectedDate) setFecha(selectedDate);
                }}
              />
            )}
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              ref={sintomasRef}
              style={[styles.input, styles.sintomasInput]}
              placeholder="Describe los síntomas"
              returnKeyType="done"
              value={sintomas}
              onChangeText={setSintomas}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.contenedorBotones}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Aviso ❓",
                  "Mantén presionado para salir del formulario"
                );
              }}
              onLongPress={() => {
                cerrarModal();
                setPacienteInstancia({});
              }}
              style={[styles.btnFormulario, styles.btnCancelar]}
            >
              <Text style={styles.textoBtn}>Salir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnFormulario, styles.btnGuardar]}
              onPress={handleCita}
            >
              <Text style={styles.textoBtn}>
                {PacienteOBJ.id ? "Editar" : "Agregar"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    backgroundColor: "#6D28D9",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#fff",
  },
  tituloBold: {
    fontWeight: "900",
  },
  campo: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  label: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
    textAlignVertical: "top",
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginVertical: 30,
    gap: 10,
  },
  btnFormulario: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCancelar: {
    backgroundColor: "#EF4444",
    marginRight: 10,
  },
  btnGuardar: {
    backgroundColor: "#22C55E",
  },
  textoBtn: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
