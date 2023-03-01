import React, {useEffect, useState} from "react";
import {Button, StyleSheet, Text} from "react-native";
import Loading from "../components/Loading";
import Auth, {AuthData} from "../utils/Auth";
import ViewContainer from "../components/ViewContainer";

export const HomeScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>("");
    const [idToken, setIdToken] = useState<string | null>("");

    const handleSignOuButton = async () => {
        await Auth.setAuthData({} as AuthData);
        navigation.replace("Authorization");
    };

    useEffect(() => {
        setLoading(true);

        Auth.addEventListener('idToken', async () => {
            const authData = await Auth.getAuthData();
            setUserId(authData.userId);
            setIdToken(authData.idToken);
        });

        Auth.getAuthData()
            .then((authData) => {
                setUserId(authData.userId);
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
        <ViewContainer>
            <Text style={styles.userIdText}>userId: {userId}</Text>
            <Text style={styles.tokenText}>idToken: {idToken}</Text>
            <Button title="Currencies Screen" onPress={() => {
                navigation.navigate("Currencies")
            }}/>
            <Button title="Virtual Items Screen" onPress={() => {
                navigation.navigate("VirtualItems")
            }}/>
            <Button title="Wallets Screen" onPress={() => {
                navigation.navigate("Wallets")
            }}/>
            <Button title="Log out" onPress={handleSignOuButton}/>
        </ViewContainer>
    );
};

const styles = StyleSheet.create({
    userIdText: {
        maxWidth: "80%",
        fontSize: 14,
    },
    tokenText: {
        maxWidth: "80%",
        fontSize: 10,
    }
});

export default HomeScreen;