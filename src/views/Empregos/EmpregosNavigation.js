import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TelaEmpregos from './TelaEmpregos';
import MostrarEmprego from './MostrarEmprego';

export default props => {

    const StackNav = createStackNavigator();

    return(
        <StackNav.Navigator>
            <StackNav.Screen name="Empregos" component={TelaEmpregos} options={{headerShown: false}} />
            <StackNav.Screen name="MostraEmprego" component={MostrarEmprego} options={{headerTitle: ""}} />
        </StackNav.Navigator>
    )

}