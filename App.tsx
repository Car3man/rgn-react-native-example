import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from './src/screens/HomeScreen';
import CurrenciesScreen from "./src/screens/CurrenciesScreen";
import VirtualItemsScreen from "./src/screens/VirtualItemsScreen";
import WalletsScreen from "./src/screens/WalletsScreen";
import CreateWalletScreen from "./src/screens/CreateWalletScreen";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Authorization" component={AuthScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Currencies" component={CurrenciesScreen} />
                <Stack.Screen name="VirtualItems" component={VirtualItemsScreen} />
                <Stack.Screen name="Wallets" component={WalletsScreen} />
                <Stack.Screen name="CreateWallet" component={CreateWalletScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;