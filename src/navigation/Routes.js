import { NavigationContainer } from '@react-navigation/native'
import HomeStack from './HomeStack'
import AuthStack from './AuthStack'
import { useAppContext } from './AppProvider'

const Routes = () => {

    const { user } = useAppContext();

    return (
        <NavigationContainer independent={true}>

            {user ? (
                <>
                    <HomeStack />
                </>
            ) : (
                <>
                    <AuthStack />
                </>
            )}

        </NavigationContainer>
    )

}
export default Routes;