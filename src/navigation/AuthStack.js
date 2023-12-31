import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/Login';
import SignUpScreen from '../screens/Auth/SignUp';

export default function App() {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                    }} />

                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{
                        headerShown: false,
                    }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}