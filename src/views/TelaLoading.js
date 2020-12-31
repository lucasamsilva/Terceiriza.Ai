import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import loginContext from '../context/loginContext';
import api from '../api';
import axios from 'axios';

export default props => {

    const { state, dispatch } = useContext(loginContext);

    const loading = (estado) => {
        dispatch({
            type: 'Loading',
            payload: estado
        })
    }

    const getData = async () => {
        try {
            loading(true)
            const jsonValue = await AsyncStorage.getItem('@terceirizaai_token')
            const objValue = JSON.parse(jsonValue);
            if (jsonValue !== null) {
                api.post('/validar', objValue.token).then(res => {
                    if(res) {
                        api.defaults.headers.common['Authorization'] = `Bearer ${objValue.token}`
                        dispatch({
                            type: 'Login',
                            payload: objValue
                        })
                    }
                })
            }
            setTimeout(function() {
                loading(false)
            }, 1000)
        } catch (e) {
            loading(false)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <View style={{ flex: 1, alignContent: "center", justifyContent:"center" }}>
            <Text style={styles.text}>Terceiriza.Ai</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    text: {
        alignSelf: "center",
        fontFamily: "SansitaSwashed-Regular",
        fontSize: 42,
    }
})