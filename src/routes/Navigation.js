import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from '../login/Login'
import CadastroPF from '../login/CadastroPF'
import CadastroPJ from '../login/CadastroPJ'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import loginContext from '../context/loginContext'
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EmpregosNavigation from '../views/Empregos/EmpregosNavigation'
import TelaLoading from '../views/TelaLoading'
import FormEmprego from '../views/Empregos/FormEmprego'
import EmpregosUsuarios from '../views/Empregos/EmpregosUsuario'
import TerceirizadoNavigation from '../views/Terceirizados/TerceirizadoNavigation'
import FormTerceirizado from '../views/Terceirizados/FormTerceirizado'

const Stack = createStackNavigator();
const Draw = createDrawerNavigator();
const Tab = createBottomTabNavigator();


export default props => {

    const { state, dispatch } = useContext(loginContext);

    removeValue = async () => {
        try {
            await AsyncStorage.removeItem('@terceirizaai_token')
        } catch (e) {
            // remove error
        }
    }


    const logout = () => {
        removeValue();
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
                tabBarIcon: ({ focused, color, size }) => {
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
            })} tabBarOptions={{ tabStyle: { padding: 5 }, labelStyle: { fontSize: 16 } }} >
                <Tab.Screen name="Pessoa Física" component={CadastroPF} ></Tab.Screen>
                <Tab.Screen name="Pessoa Jurídica" component={CadastroPJ} ></Tab.Screen>
            </Tab.Navigator>
        )
    }

    const renderNav = (props) => {
        if (state.loading) {
            return <TelaLoading />
        } else if (!state.logado) {
            return (
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: !state.loading }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Cadastro" component={Cadastro} />
                </Stack.Navigator>
            )
        } else {
            if (state.cpf) {
                return (
                    <Draw.Navigator initialRouteName="Buscar Vagas" drawerContent={props => drawerOptions(props)}>
                        <Draw.Screen name="Buscar Vagas" component={EmpregosNavigation} />
                        <Draw.Screen name="Cadastro Prestador de Serviço" component={FormTerceirizado} />
                    </Draw.Navigator>
                )
            }
            else {
                return (
                    <Draw.Navigator initialRouteName="Buscar Prestadores de Serviço" drawerContent={props => drawerOptions(props)}>
                        <Draw.Screen name="Buscar Prestadores de Serviço" component={TerceirizadoNavigation} />
                        <Draw.Screen name="Cadastrar Nova Vaga" component={FormEmprego} />
                        <Draw.Screen name="Minhas Vagas" component={EmpregosUsuarios} />
                    </Draw.Navigator>
                )
            }
        }
    }

    return (
        <NavigationContainer>
            {renderNav()}
        </NavigationContainer>
    )

}