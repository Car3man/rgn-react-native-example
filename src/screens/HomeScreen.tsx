import React, {useEffect, useState} from "react";
import {Alert, Button, StyleSheet, Text, View} from "react-native";
import Loading from "../components/Loading";
import Api from "../utils/Api";
import Auth, {AuthData} from "../utils/Auth";

export const HomeScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(true);
    const [idToken, setIdToken] = useState<string | null>("");

    const clearIdToken = async () => {
        setLoading(true);
        const authData = await Auth.getAuthData();
        authData.idToken = "";
        await Auth.setAuthData(authData);
        setIdToken(authData.idToken);
        setLoading(false);
    };

    const corruptIdToken = async () => {
        setLoading(true);
        const authData = await Auth.getAuthData();
        authData.idToken = "corrupted_id_token_refresh_me_please";
        await Auth.setAuthData(authData);
        setIdToken(authData.idToken);
        setLoading(false);
    };

    const getVirtualItems = async () => {
        setLoading(true);
        const response = await Api.getVirtualItemsByAppId();
        Alert.alert("Response", JSON.stringify(response.data));
        setLoading(false);
    };

    const getMyCurrencies = async () => {
        setLoading(true);
        const response = await Api.getUserCurrencies();
        Alert.alert("Response", JSON.stringify(response.data));
        setLoading(false);
    };

    const signOut = async () => {
        await Auth.setAuthData({} as AuthData);
        navigation.replace("Authorization");
    };

    useEffect(() => {
        setLoading(true);

        Auth.addEventListener('idToken', async () => {
            const authData = await Auth.getAuthData();
            setIdToken(authData.idToken);
        });

        Auth.getAuthData()
            .then((authData) => {
                setIdToken(authData.idToken);
            })
            .catch(() => {
                console.log("read auth data on home screen start error");
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
          Auth.removeAllListeners();
        };
    }, []);

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>idToken: {idToken}</Text>
            <Button title="Clear idToken" onPress={clearIdToken}/>
            <Button title="Corrupt idToken" onPress={corruptIdToken}/>
            <Button title="Get Virtual Items" onPress={getVirtualItems}/>
            <Button title="Get My Currencies" onPress={getMyCurrencies}/>
            <Button title="Log out" onPress={signOut}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    text: {
        maxWidth: "80%",
        fontSize: 10,
    }
});

export default HomeScreen;