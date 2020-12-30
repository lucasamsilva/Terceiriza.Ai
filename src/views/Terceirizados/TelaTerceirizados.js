import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Toast from 'react-native-tiny-toast'
import api from '../../api'
import HamburguerMenu from '../HamburguerMenu'

export default props => {

    const [terceirizados, setTerceirizados] = useState([]);

    const { navigation } = props

    useEffect(() => {
        navigation.addListener('focus', () => {
            api.get('/terceirizado').then(data => setTerceirizados(data.data)).catch(err => Toast.show(err));
          });
    }, [navigation])

    function renderterceirizados() {
        return (terceirizados.map((l, i) => (
            <ListItem key={l.id} onPress={() => navigation.navigate('MostraTerceirizado', l)} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{l.servicoprestado}</ListItem.Title>
                    <ListItem.Subtitle>{l.area}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        )))
    }

    return (
        <>
            <HamburguerMenu navigation={props.navigation} />
            <View style={{backgroundColor:'white'}}>
                <Text style={{alignSelf: 'center', fontSize: 20,}}>Prestadores de Serviços Disponíveis</Text>
            </View>
            <ScrollView style={{flex: 0.8, backgroundColor: 'white'}}>
                {renderterceirizados()}
            </ScrollView>
        </>
    )

}