import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Registro from './login/Register'
import Login from './login/Login'
import TelaInicial from './views/TelaInicial'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Navigation from './routes/Navigation'
import { LoginProvider } from './context/loginContext'


export default props => {

    return (
        <LoginProvider>
            <Navigation />
        </LoginProvider>
    )

}