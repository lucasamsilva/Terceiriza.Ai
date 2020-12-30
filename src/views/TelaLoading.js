import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import loginContext from '../context/loginContext';
import api from '../api';

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
            const jsonValue = await AsyncStorage.getItem('@terceirizaai_token')
            const objValue = JSON.parse(jsonValue);
            if (jsonValue !== null) {
                api.post('/validar', objValue.token).then(res => {
                    if(res) {
                        dispatch({
                            type: 'Login',
                            payload: objValue
                        })
                    }
                    loading(false)
                })
            }
            loading(false)
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