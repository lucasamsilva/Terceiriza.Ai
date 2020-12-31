import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Toast from 'react-native-tiny-toast'
import api from '../../api'
import HamburguerMenu from '../HamburguerMenu'

export default props => {

    const [empregos, setEmpregos] = useState([]);

    const { navigation } = props

    useEffect(() => {
        console.log(api.defaults.headers.common)
        navigation.addListener('focus', () => {
            api.get('/empregos').then(data => {setEmpregos(data.data)}).catch(err => Toast.show(err));
          });
    }, [navigation])

    function renderEmpregos() {
        return (empregos.map((l, i) => (
            <ListItem key={l.id} onPress={() => navigation.navigate('MostraEmprego', l)} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{l.titulo}</ListItem.Title>
                    <ListItem.Subtitle>{l.descricao}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        )))
    }

    return (
        <>
            <HamburguerMenu navigation={props.navigation} />
            <View style={{backgroundColor:'white'}}>
                <Text style={{alignSelf: 'center', fontSize: 20,}}>Vagas Disponíveis</Text>
            </View>
            <ScrollView style={{flex: 0.8, backgroundColor: 'white'}}>
                {renderEmpregos()}
            </ScrollView>
        </>
    )

}