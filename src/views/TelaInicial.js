import React from 'react'
import { Text, View } from 'react-native'
import HamburguerMenu from './HamburguerMenu'


export default props => {

    return (
        <View style={{flex: 1}}>
            <HamburguerMenu navigation={props.navigation} />
            <Text>Olá</Text>
        </View>
    )

}