import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from '../login/Login'
import CadastroPF from '../login/CadastroPF'
import CadastroPJ from '../login/CadastroPJ'
import TelaInicial from '../views/TelaInicial'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import loginContext from '../context/loginContext'
import { Icon } from 'react-native-elements'

const Stack = createStackNavigator();
const Draw = createDrawerNavigator();
const Tab = createBottomTabNavigator();


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
                <DrawerItem label="Terceiriza.Ai" labelStyle={{ fontFamily: "SansitaSwashed-Regular", fontSize: 24, color: "black" }} />
                <DrawerItemList {...props} />
                <DrawerItem label="Sair" inactiveTintColor="red" onPress={logout} icon={() => <Icon name='sign-out' color="red" type='font-awesome' />} />
            </DrawerContentScrollView>
        )
    }

    const Cadastro = () => {
        return (
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size}) => {
                    let iconName;
                    let iconColor;

                    switch (route.name) {
                        case 'Pessoa Física': {
                            iconName = 'user-o';
                            iconColor = focused ? '#2089dc' : 'gray';
                            break;
                        }
                        case 'Pessoa Jurídica': {
                            iconName = 'building-o';
                            iconColor = focused ? '#2089dc' : 'gray';
                            break;
                        }
                    }
                    return <Icon name={iconName} color={iconColor} type='font-awesome' />
                },
            })} tabBarOptions={{ tabStyle: { padding: 5 },labelStyle: { fontSize: 16 } }} >
                <Tab.Screen name="Pessoa Física" component={CadastroPF} ></Tab.Screen>
                <Tab.Screen name="Pessoa Jurídica" component={CadastroPJ} ></Tab.Screen>
            </Tab.Navigator>
        )
    }

    const renderNav = (props) => {
        if (!state.logado) {
            return (
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Cadastro" component={Cadastro} />
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