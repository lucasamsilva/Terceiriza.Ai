import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input } from 'react-native-elements';
import api from '../api';
import toast from 'react-native-tiny-toast'

export default props => {

    const[usuario, setUsuario] = useState({nome: "", cpf: "", email: "", senha: "", confirmeSenha: ""});

    let {navigation} = props

    let voltarAoLogin = () => {
        navigation.navigate('Login');
    }
    
    let salvarUsuario = () => {
        if(usuario.nome === "" || usuario.cnpj === "" || usuario.email === "" || usuario.senha === "" || usuario.confirmeSenha === "") {
            toast.show('Por favor, preencha todos os campos!', { containerStyle: { backgroundColor: "rgb(130,0,0)" } });
        } else if(usuario.confirmeSenha !== usuario.senha) {
            toast.show('Senha e confirmação de senha diferentes!', { containerStyle: { backgroundColor: "rgb(130,0,0)" } });
        } else {
            api.post('/cadastrar', usuario).then(res => {
                navigation.navigate('Login', {email: usuario.email});
                toast.showSuccess(res.data, { containerStyle: { backgroundColor: "green" } });
            }).catch(e => {
                toast.show(e.response.data, { containerStyle: { backgroundColor: "rgb(130,0,0)" } });
            })    
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.view}>
            <Text style={{marginBottom: 30, fontSize: 20}} >Cadastro Pessoa Física</Text>
            <Input placeholder="Nome" onChangeText={nome => setUsuario({...usuario, nome})} leftIcon={{type:'font-awesome', name: 'user-o'}} />
            <Input placeholder="CPF" onChangeText={cpf => setUsuario({...usuario, cpf})} leftIcon={{type:'font-awesome', name: 'address-card-o'}} />
            <Input placeholder="Email" onChangeText={email => setUsuario({...usuario, email})} leftIcon={{type:'font-awesome', name: 'envelope-o'}} />
            <Input placeholder="Senha" onChangeText={senha => setUsuario({...usuario, senha})} secureTextEntry={true} leftIcon={{type:'font-awesome', name: 'lock'}} />
            <Input placeholder="Confirme a senha" onChangeText={confirmeSenha => setUsuario({...usuario, confirmeSenha})} secureTextEntry={true} leftIcon={{type:'font-awesome', name: 'lock'}} />
            <Button onPress={salvarUsuario} title="Concluir" buttonStyle={styles.buttons} />
            <Button onPress={voltarAoLogin} title="Já tem cadastro ? Faça login aqui" buttonStyle={styles.buttons} />
        </View>
        </KeyboardAvoidingView>
    )

}

var styles = StyleSheet.create({  
    container: {
        flex: 1
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