import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import HamburguerMenu from './HamburguerMenu'
import loginContext from '../context/loginContext';


export default props => {

    const { state, dispatch } = useContext(loginContext);

    console.log(state)

    return (
        <View style={{ flex: 1 }}>
            <HamburguerMenu navigation={props.navigation} />
            <Text>{toString(state.token)}</Text>
        </View>
    )

}