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
        usuarioId: state.id, descricao: "", area: "",
        titulo: "", equipamentos: ""
    }

    const [emprego, setEmprego] = useState(estadoInicial)
    const [contratante, setContrante] = useState({ nome: "", telefone: "", cidade: "", UF: "", email: "" })

    useEffect(() => {
        if (props.route.params) {
            setEmprego(props.route.params);
            api.get(`/usuarios/${props.route.params.usuarioId}`).then(res => setContrante(res.data));
        }
    }, [emprego])
    
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <Text style={styles.texto}>Titulo da Vaga:</Text>
                <Input value={emprego.titulo} disabled />
                <Text style={styles.texto}>Descrição da Vaga:</Text>
                <Input value={emprego.descricao} disabled />
                <Text style={styles.texto}>Area de Atuação da Vaga:</Text>
                <Input value={emprego.area} disabled />
                <Text style={styles.texto}>Informações adicionais da Vaga:</Text>
                <Input value={emprego.equipamentos} disabled />
                <Text style={styles.texto}>Nome do contratante:</Text>
                <Input value={contratante.nome} disabled />
                <Text style={styles.texto}>Cidade do contratante:</Text>
                <Input value={contratante.cidade} disabled />
                <Text style={styles.texto}>UF do contratante:</Text>
                <Input value={contratante.UF} disabled />
                <Text style={styles.texto}>Telefone do contratante:</Text>
                <Input value={contratante.telefone} disabled rightIcon={ <Icon 
                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55${contratante.telefone}`)} name='whatsapp' size={34} color='green' />} />
                <Text style={styles.texto}>E-mail do contratante:</Text>
                <Input value={contratante.email} disabled rightIcon={ <Icon 
                onPress={() => Linking.openURL(`mailto:${contratante.email}`)} name='envelope' size={34} />} />
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