import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Registro from '../login/Register'
import Login from '../login/Login'
import TelaInicial from '../views/TelaInicial'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import loginContext from '../context/loginContext'
import { Button, Icon } from 'react-native-elements'
import { Text } from 'react-native'

const Stack = createStackNavigator();
const Draw = createDrawerNavigator();


export default props => {

    const { state, dispatch } = useContext(loginContext);

    const logout = () => {
        dispatch({
            type: 'Logout'
        })
    }

    function drawerOptions(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItem label="Terceiriza.Ai" labelStyle={{fontFamily: "SansitaSwashed-Regular", fontSize: 24, color: "black"}} />
                <DrawerItemList {...props} />
                <DrawerItem label="Sair" inactiveTintColor="red" onPress={logout} icon={() => <Icon name='sign-out' color="red" type='font-awesome' />} /> 
            </DrawerContentScrollView>
        )
    }

    const renderNav = (props) => {
        if (!state.logado) {
            return (
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Cadastro" component={Registro} />
                </Stack.Navigator>
            )
        } else {
            return (
                <Draw.Navigator initialRouteName="Início" drawerContent={props => drawerOptions(props)}>
                    <Draw.Screen name="Início" component={TelaInicial} />
                </Draw.Navigator>
            )
        }
    }

    return (
        <NavigationContainer>
            {renderNav()}
        </NavigationContainer>
    )

}