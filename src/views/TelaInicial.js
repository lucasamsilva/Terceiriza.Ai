import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import HamburguerMenu from './HamburguerMenu'
import loginContext from '../context/loginContext';


export default props => {

    const { state, dispatch } = useContext(loginContext);

    console.log(props.route);

    return (
        <View style={{ flex: 1 }}>
            <HamburguerMenu navigation={props.navigation} />
        </View>
    )

}