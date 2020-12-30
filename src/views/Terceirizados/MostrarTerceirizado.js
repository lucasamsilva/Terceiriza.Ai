import React, { useContext, useEffect, useState } from 'react'
import { Linking } from 'react-native';
import { Text } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../api';
import loginContext from '../../context/loginContext';

export default props => {

    const { state, dispatch } = useContext(loginContext);

    const estadoInicial = {
        usuarioId: state.id, servicoprestado: "", area: "", equipamentos: ""
    }

    const [servico, setServico] = useState(estadoInicial)
    const [terceirizado, setContrante] = useState({ nome: "", telefone: "", cidade: "", UF: "", email: "" })

    useEffect(() => {
        if (props.route.params) {
            setServico(props.route.params);
            console.log(servico)
            api.get(`/usuarios/${props.route.params.usuarioId}`).then(res => setContrante(res.data));
        }
    }, [servico])
    
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <Text style={styles.texto}>Serviço Prestado:</Text>
                <Input value={servico.servicoprestado} disabled />
                <Text style={styles.texto}>Area de Atuação da Vaga:</Text>
                <Input value={servico.area} disabled />
                <Text style={styles.texto}>Informações adicionais da Vaga:</Text>
                <Input value={servico.equipamentos} disabled />
                <Text style={styles.texto}>Nome do Prestador de Serviços:</Text>
                <Input value={terceirizado.nome} disabled />
                <Text style={styles.texto}>Cidade do Prestador de Serviços:</Text>
                <Input value={terceirizado.cidade} disabled />
                <Text style={styles.texto}>UF do Prestador de Serviços:</Text>
                <Input value={terceirizado.UF} disabled />
                <Text style={styles.texto}>Telefone do Prestador de Serviços:</Text>
                <Input value={terceirizado.telefone} disabled rightIcon={ <Icon 
                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55${terceirizado.telefone}`)} name='whatsapp' size={34} color='green' />} />
                <Text style={styles.texto}>E-mail do Prestador de Serviços:</Text>
                <Input value={terceirizado.email} disabled rightIcon={ <Icon 
                onPress={() => Linking.openURL(`mailto:${terceirizado.email}`)} name='envelope' size={34} />} />
            </ScrollView>
        </KeyboardAvoidingView>
    )

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    texto: {
        fontSize: 18,
        margin: 10
    },
    view: {
        backgroundColor: "white",
        paddingTop: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttons: {
        alignSelf: 'center',
        width: 250,
        margin: 5
    }
})