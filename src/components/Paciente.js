import React from 'react'
import { Text } from 'react-native'

const Paciente = ({ paciente }) => {
    return (
        <Text>{paciente.paciente}</Text>
    );
};



export default Paciente