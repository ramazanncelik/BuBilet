import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchForTickets from '../screens/SearchForTickets';
import Voyages from '../screens/Voyages';
import VoyageDetails from '../screens/VoyageDetails';
import PaymentPage from '../screens/Payment';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="SearchForTickets" component={SearchForTickets}
          options={{
            headerTitle: "Bilet Ara"
          }}
        />

        <Stack.Screen name="Voyages" component={Voyages}
          options={{
            headerTitle: "Sefer Seç"
          }}
        />

        <Stack.Screen name="VoyageDetails" component={VoyageDetails}
          options={{
            headerTitle: "Sefer Detayı"
          }}
        />

        <Stack.Screen name="Payment" component={PaymentPage}
          options={{
            headerTitle: "Ödeme Yap"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}