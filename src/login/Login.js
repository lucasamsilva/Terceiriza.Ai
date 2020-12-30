import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements';
import loginContext from '../context/loginContext';
import api from '../api'
import toast from 'react-native-tiny-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default props => {

    const { state, dispatch } = useContext(loginContext);
    let { navigation } = props;

    const [usuario, setUsuario] = useState({ email: "", senha: "" });
    const [entrando, setEntrando] = useState(false)

    const loading = (estado) => {
        dispatch({
            type: 'Loading',
            payload: estado
        })
    }
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@terceirizaai_token', jsonValue)
        } catch (e) {

        }
    }

    let cadastro = () => {
        navigation.navigate('Cadastro');
    }

    let login = () => {
        setEntrando(true)
        api.post('/login', usuario).then(res => {
            dispatch({
                type: 'Login',
                payload: res.data
            })
            storeData(res.data)
        }).catch(e => {
            setEntrando(false);
            toast.show(e.response.data, { containerStyle: { backgroundColor: "rgb(130,0,0)" } });
        })
    }

    return (
        <View style={styles.view}>
            <Text style={styles.logo}>Terceiriza.Ai</Text>
            <Input placeholder="Email" value={usuario.email} onChangeText={email => setUsuario({ ...usuario, email })} leftIcon={{ type: 'font-awesome', name: 'envelope-o' }} />
            <Input placeholder="Senha" onChangeText={senha => setUsuario({ ...usuario, senha })} secureTextEntry={true} leftIcon={{ type: 'font-awesome', name: 'lock' }} />
            <Button onPress={login} loading={entrando} title="Login" buttonStyle={styles.buttons} />
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