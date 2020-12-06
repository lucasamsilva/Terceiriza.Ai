import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'

export default ({navigation, route}) => {

    const menu = () => {
        navigation.toggleDrawer();
    }

    return (
        <View style={{flex: 0.1, flexDirection: 'row', justifyContent: "center"}}>
            <Button buttonStyle={styles.button} type="outline" onPress={menu} icon={<Icon name="bars" type="font-awesome" size={24} color="black" />}/>    
            <Text style={styles.logo}>Terceiriza.Ai</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        borderColor: "transparent",
        alignSelf: "center",
        width: 50,
        height: 50
    }, logo: {
        flex: 4,
        alignSelf: "center",
        fontFamily: "SansitaSwashed-Regular",
        fontSize: 24,
    },
})