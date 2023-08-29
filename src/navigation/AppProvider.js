import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux';
import { setUserData } from '../utils/utils'

const AppContext = createContext({});

const AppProvider = ({ children }) => {

    const { user } = useSelector(state => state.auth);
    const { users } = useSelector(state => state.users);
    const { voyages } = useSelector(state => state.voyages);
    const [firstUse, setFirstUse] = useState(true)

    const getData = async () => {
        try {
            const firstUseValue = await AsyncStorage.getItem("firstUse");
            if (firstUseValue !== null) {
                setFirstUse(firstUseValue === "true" ? true : false);
            } else {
                await AsyncStorage.setItem("firstUse", "true")
                setFirstUse(true);
            }

            const userValue = await AsyncStorage.getItem("user");
            if (userValue !== null) {
                setUserData(JSON.parse(userValue));
            } else {
                setUserData(null);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const data = useMemo(
        () => ({
            user,
            firstUse,
            setFirstUse,
            setUserData,
            users,
            voyages,
        }),
        [user, firstUse, users, voyages]
    );

    useEffect(() => {
        getData();
    }, [AsyncStorage.getItem("firstUse"), AsyncStorage.getItem("user")]);

    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
}

export { AppContext, AppProvider, useAppContext };
