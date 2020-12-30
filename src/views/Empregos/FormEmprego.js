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
        usuarioId: state.id, descricao: "", area: "",
        titulo: "", equipamentos: ""
    }

    const [emprego, setEmprego] = useState(estadoInicial)
    
    useEffect(() => {
        if(props.route.params) {
            setEmprego(props.route.params)
        }
    }, [props.route.params])

    const salvarEmprego = () => {
        api.post("/empregos", emprego).then(_ => { setEmprego(estadoInicial);props.navigation.navigate("Buscar Prestadores de Serviço"); Toast.showSuccess("Vaga Cadastrada com Sucesso"); })
        .catch(err => Toast.show(err.response.data))
    }

    function voltar() {
        setEmprego(estadoInicial);
        props.navigation.goBack();
    }

    const texto = () => {
        if(props.route.params !== undefined) {
            return <Text style={{ marginBottom: 30, fontSize: 20 }}>Editar Vaga</Text>
        } else {
            return <Text style={{ marginBottom: 30, fontSize: 20 }}>Cadastrar Nova Vaga</Text>
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.view}>
                {texto()}
                <Input placeholder="Titulo da Vaga" value={emprego.titulo} onChangeText={titulo => setEmprego({ ...emprego, titulo })} />
                <Input placeholder="Descrição da Vaga" value={emprego.descricao} onChangeText={descricao => setEmprego({ ...emprego, descricao })} />
                <Input placeholder="Área de Atuação para a Vaga" value={emprego.area} onChangeText={area => setEmprego({ ...emprego, area })} />
                <Input placeholder="Informações adicionais(Salário, equipamentos necessários etc...)" value={emprego.equipamentos} onChangeText={equipamentos => setEmprego({ ...emprego, equipamentos })} />
                <Button onPress={salvarEmprego} title="Concluir" buttonStyle={styles.buttons} />
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