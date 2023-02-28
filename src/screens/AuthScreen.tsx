import {useEffect, useState} from "react";
import {Button, Linking, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loading from "../components/Loading";
import HttpHelper from "../utils/HttpHelper";
import Utils from "../utils/Utils";
import ApiConsts from "../utils/ApiConsts";

export const AuthScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(true);

    const onDeepLink = async (url: string) => {
        while (isLoading) {
            await Utils.waitForTime(100);
        }

        const customToken = HttpHelper.getQueryParam(url, "token");
        await signInWithCustomToken(customToken);
    };

    const signInWithCustomToken = async (customToken: string) => {
        try {
            setLoading(true);

            const response = await axios.post(ApiConsts.SignInWithCustomTokenEndpoint, {
                customToken: customToken,
            });

            const data = response.data;
            const userId = data.userId as string;
            const idToken = data.idToken as string;

            const authData = {
                userId: userId,
                idToken: idToken,
            };

            await AsyncStorage.setItem("authorization", JSON.stringify(authData));

            setLoading(false);
            navigation.replace("Home");
            console.log("authentication data saved");
        } catch (error) {
            console.log("sign in with custom token error" + error);
        }
    };

    const signUpAnonymously = async () => {
        try {
            setLoading(true);

            const response = await axios.post(ApiConsts.SignUpAnonymouslyEndpoint, {
                appPackageName: ApiConsts.ProjectId
            });
            const data = response.data;
            const customToken = data.customToken as string;

            await signInWithCustomToken(customToken);

            setLoading(false);
        } catch (error) {
            console.log("sign up anonymously error");
        }
    };

    const signInEmailPassword = () => {
        Linking.openURL("https://rgn-auth.web.app/?url_redirect=rgnreactnative&customToken=true");
    };

    useEffect(() => {
        Linking.getInitialURL().then(url => {
            if (url === null) {
                return;
            }

            onDeepLink(url);
        });

        Linking.addEventListener('url', handler => {
            onDeepLink(handler.url);
        });

        return () => {
            Linking.removeAllListeners('url');
        };
    }, [isLoading]);

    useEffect(() => {
        setLoading(true);
        AsyncStorage.getItem("authorization")
            .then((authData) => {
                if (authData) {
                    navigation.replace("Home");
                }
            })
            .catch(() => {
                console.log("error to read authentication local storage");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <View style={styles.container}>
            <Text>Not authorized</Text>
            <Button title="Login Anonymously" onPress={signUpAnonymously}/>
            <Button title="Login By Email" onPress={signInEmailPassword}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    }
});

export default AuthScreen;