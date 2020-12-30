import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native';
import { Text } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Toast from 'react-native-tiny-toast';
import api from '../../api';
import loginContext from '../../context/loginContext';

export default props => {

    const { state, dispatch } = useContext(loginContext);

    const estadoInicial = {
        usuarioId: state.id, servicoprestado: "", area: "", equipamentos: ""
    }

    const [terceirizado, setTerceirizado] = useState(estadoInicial)
    
    useEffect(() => {
        if(props.route.params) {
            setTerceirizado(props.route.params)
        }
    }, [props.route.params])

    const salvarTerceirizado = () => {
        api.post("/terceirizado", terceirizado)
        .then(_ => { setTerceirizado(estadoInicial);props.navigation.navigate("Buscar Vagas");
         Toast.showSuccess("Vaga Cadastrada com Sucesso"); })
        .catch(err => Toast.show(err.response.data))
    }

    function voltar() {
        setTerceirizado(estadoInicial);
        props.navigation.goBack();
    }

    const texto = () => {
        if(props.route.params !== undefined) {
            return <Text style={{ marginBottom: 30, fontSize: 20 }}>Editar Informações</Text>
        } else {
            return <Text style={{ marginBottom: 30, fontSize: 20 }}>Cadastrar Novas Informações</Text>
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.view}>
                {texto()}
                <Input placeholder="Qual serviço você presta ?" value={terceirizado.servicoprestado} onChangeText={servicoprestado => setTerceirizado({ ...terceirizado, servicoprestado })} />
                <Input placeholder="Qual a área de atuação ?" value={terceirizado.area} onChangeText={area => setTerceirizado({ ...terceirizado, area })} />
                <Input placeholder="Quais equipamentos você possui ?" value={terceirizado.equipamentos} onChangeText={equipamentos => setTerceirizado({ ...terceirizado, equipamentos })} />
                <Button onPress={salvarTerceirizado} title="Concluir" buttonStyle={styles.buttons} />
                <Button onPress={voltar} title="Voltar" buttonStyle={styles.buttons} />
            </View>
        </KeyboardAvoidingView>
    )

}

var styles = StyleSheet.create({
    container: {
        flex: 1
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
        width: 250,
        margin: 5
    }
})