import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements';
import loginContext from '../context/loginContext';

export default props => {

    const {state, dispatch} = useContext(loginContext);
    let { navigation } = props;

    const [usuario, setUsuario] = useState({});


    let cadastro = () => {
        navigation.navigate('Cadastro');
    }

    let login = () => {
        dispatch({
            type: 'Login',
            payload: usuario
        })
    }

    return (

        <View style={styles.view}>
            <Text style={styles.logo}>Terceiriza.Ai</Text>
            <Input placeholder="Email"  onChangeText={email => setUsuario({...usuario, email})} leftIcon={{ type: 'font-awesome', name: 'envelope-o' }} />
            <Input placeholder="Senha" secureTextEntry={true} leftIcon={{ type: 'font-awesome', name: 'lock' }} />
            <Button onPress={login} title="Login" buttonStyle={styles.buttons} />
            <Button onPress={cadastro} title="Cadastre-se" buttonStyle={styles.buttons} />
        </View>

    )

}

var styles = StyleSheet.create({
    logo: {
        fontFamily: "SansitaSwashed-Regular",
        fontSize: 36,
        marginBottom: 30
    },
    view: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttons: {
        width: 200,
        margin: 5
    }
})