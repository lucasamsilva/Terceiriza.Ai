import React, { useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { Button, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Toast from 'react-native-tiny-toast'
import api from '../../api'
import loginContext from '../../context/loginContext'
import HamburguerMenu from '../HamburguerMenu'

export default props => {

    const { state, dispatch } = useContext(loginContext);

    const [empregos, setEmpregos] = useState([]);

    const { navigation } = props

    useEffect(() => {
        navigation.addListener('focus', () => {
            api.get(`/empregos/usuario/${state.id}`).then(data => setEmpregos(data.data)).catch(err => Toast.show(err));
          });
    }, [navigation])

    function excluir(id) {
        Alert.alert('Excluir Usuário', 'Deseja excluir a vaga?', [
            {
                text: 'Sim',
                onPress() {
                    api.delete(`/empregos/${id}`).then(res => Toast.showSuccess(res.data))
                    .catch(err => Toast.show("Erro: " + err));
                    api.get(`/empregos/usuario/${state.id}`).then(data => setEmpregos(data.data)).catch(err => Toast.show(err));
                }
            },
            { text: 'Não' }
        ])
    }

    function renderEmpregos() {
        return (empregos.map((l, i) => (
            <ListItem key={l.id} bottomDivider>
                    <ListItem.Content>
                    <ListItem.Title>{l.titulo}</ListItem.Title>
                    <ListItem.Subtitle>{l.descricao}</ListItem.Subtitle>
                    <View style={{flex: 1, width: '100%', flexDirection:'row', justifyContent:'center'}} >
                        <Button type="clear" onPress={() => navigation.navigate('Cadastrar Nova Vaga', l)} icon={<Icon name='pencil' type='font-awesome' />} />
                        <Button type="clear" onPress={() => excluir(l.id)} icon={<Icon name='trash' type='font-awesome' />} />
                    </View>
                </ListItem.Content>
            </ListItem>
        )))
    }

    return (
        <>
            <HamburguerMenu navigation={props.navigation} />
            <View style={{backgroundColor:'white'}}>
                <Text style={{alignSelf: 'center', fontSize: 20,}}>Minhas Vagas</Text>
            </View>
            <ScrollView style={{flex: 0.8, backgroundColor: 'white'}}>
                {renderEmpregos()}
            </ScrollView>
        </>
    )

}