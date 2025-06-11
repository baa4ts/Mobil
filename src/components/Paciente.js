import React, { startTransition } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { formatearFecha } from '../helpers/fecha';

const Paciente = ({ item }) => {
    const { nombre, fecha } = item
    return (
        <View style={style.contenedor}>
            <Text style={style.label}>Paciente:</Text>
            <Text style={style.texto}>{nombre}</Text>
            <Text style={style.fecha}>{formatearFecha(fecha)}</Text>
            <View style={style.contenedorBotones}>
                <TouchableOpacity style={[style.btn, style.btnEditar]}>
                    <Text style={style.btnText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btn, style.btnBorrar]}>
                    <Text style={style.btnText}>Borrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const style = StyleSheet.create({
    contenedor: {
        backgroundColor: "#fcf7f7",
        borderRadius: 20,
        padding: 20,
        marginBottom: 10
    },
    label: {
        color: "#374151",
        textTransform: "uppercase",
        fontWeight: "700",
        marginBottom: 10,
    },
    texto: {
        color: "#6d28d9",
        fontSize: 20, fontWeight: 700,
        marginBottom: 10
    },
    fecha: {
        color: "#374151",

    }, contenedorBotones: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    }, btn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5
    }, btnEditar: {
        backgroundColor: "#F97316",
        color: "#fff"
    }, btnBorrar: {
        backgroundColor: "#EF4444"
    }, btnText: {
        textTransform: "uppercase ",
        fontWeight: "700",
        fontSize: 12,
        color: "#FFF"
    }
})

export default Paciente