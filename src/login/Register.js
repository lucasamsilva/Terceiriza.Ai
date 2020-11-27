import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input } from 'react-native-elements';

export default props => {

    const[usuario, setUsuario] = useState({});

    let {navigation} = props

    let voltarAoLogin = () => {
        navigation.goBack();
    }
    
    let salvarUsuario = () => {
        let email = usuario.email;
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.view}>
            <Input placeholder="Nome" onChangeText={nome => setUsuario({...usuario, nome})} leftIcon={{type:'font-awesome', name: 'user-o'}} />
            <Input placeholder="CPF/CNPJ" onChangeText={cpfcnpj => setUsuario({...usuario, cpfcnpj})} leftIcon={{type:'font-awesome', name: 'address-card-o'}} />
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