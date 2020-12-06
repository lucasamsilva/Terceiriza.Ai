import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Alert } from 'react-native'
import { Button, Input } from 'react-native-elements';

export default props => {

    const[usuario, setUsuario] = useState({nome: "", cnpj: "", email: "", senha: "", confirmeSenha: ""});

    let {navigation} = props

    let voltarAoLogin = () => {
        navigation.navigate('Login');
    }
    
    let salvarUsuario = () => {
        if(usuario.nome === "" || usuario.cnpj === "" || usuario.email === "" || usuario.senha === "" || usuario.confirmeSenha === "") {
            Alert.alert('Preencha todos os campos!', 'Existem Campos em Branco.')
        } else if(usuario.confirmeSenha !== usuario.senha) {
            Alert.alert('Senhas não coincidem!', 'Os campos senha e confirmação de senha não são iguais! Preencha novamente')
        } else {
            navigation.navigate('Login', {email: usuario.email});
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.view}>
            <Text style={{marginBottom: 30, fontSize: 20}} >Cadastro Pessoa Jurídica</Text>
            <Input placeholder="Nome" onChangeText={nome => setUsuario({...usuario, nome})} leftIcon={{type:'font-awesome', name: 'user-o'}} />
            <Input placeholder="CNPJ" onChangeText={cnpj => setUsuario({...usuario, cnpj})} leftIcon={{type:'font-awesome', name: 'address-card-o'}} />
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