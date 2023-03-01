import {useEffect, useState} from "react";
import {Button, Linking, Text} from "react-native";
import Loading from "../components/Loading";
import HttpHelper from "../utils/HttpHelper";
import Utils from "../utils/Utils";
import Api from "../utils/Api";
import Auth, {AuthData} from "../utils/Auth";
import ViewContainer from "../components/ViewContainer";

export const AuthScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(true);

    const onDeepLink = async (url: string) => {
        while (isLoading) {
            await Utils.waitForTime(100);
        }

        const customToken = HttpHelper.getQueryParam(url, "token");
        const { userId, idToken, refreshToken } = await Api.signInWithCustomToken(customToken);
        await Auth.setAuthData({
            userId: userId,
            idToken: idToken,
            refreshToken: refreshToken,
        } as AuthData);
        navigation.replace("Home");
    };

    const handleLoginAnonymouslyButton = async () => {
        const { customToken } = await Api.signUpAnonymously();
        const { userId, idToken, refreshToken } = await Api.signInWithCustomToken(customToken);
        await Auth.setAuthData({
            userId: userId,
            idToken: idToken,
            refreshToken: refreshToken,
        } as AuthData);
        navigation.replace("Home");

        setLoading(false);
    };

    const handleLoginByEmailButton = async () => {
        await Linking.openURL("https://rgn-auth.web.app/?url_redirect=rgnreactnative&customToken=true");
    };

    useEffect(() => {
        Linking.getInitialURL().then(async url => {
            if (url === null) {
                return;
            }

            await onDeepLink(url);
        });

        Linking.addEventListener('url', async handler => {
            await onDeepLink(handler.url);
        });

        return () => {
            Linking.removeAllListeners('url');
        };
    }, [isLoading]);

    useEffect(() => {
        setLoading(true);
        Auth.getAuthData()
            .then((authData) => {
                if (authData.userId) {
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
        <ViewContainer>
            <Text>Not authorized</Text>
            <Button title="Login Anonymously" onPress={handleLoginAnonymouslyButton}/>
            <Button title="Login By Email" onPress={handleLoginByEmailButton}/>
        </ViewContainer>
    );
};

export default AuthScreen;