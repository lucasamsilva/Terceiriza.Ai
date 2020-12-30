import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TelaTerceirizados from './TelaTerceirizados';
import MostrarTerceirizado from './MostrarTerceirizado'

export default props => {

    const StackNav = createStackNavigator();

    return(
        <StackNav.Navigator>
            <StackNav.Screen name="Terceirizados" component={TelaTerceirizados} options={{headerShown: false}} />
            <StackNav.Screen name="MostraTerceirizado" component={MostrarTerceirizado} options={{headerTitle: ""}} />
        </StackNav.Navigator>
    )

}