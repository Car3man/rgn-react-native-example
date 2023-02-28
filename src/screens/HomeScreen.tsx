import React, {useState} from "react";
import {Alert, Button, StyleSheet, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios/index";
import ApiConsts from "../utils/ApiConsts";
import Loading from "../components/Loading";

export const HomeScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(false);

    const getVirtualItems = async () => {
        setLoading(true);

        const authData = JSON.parse(await AsyncStorage.getItem("authorization") as string);

        const response = await axios.post(ApiConsts.VirtualItemsGetByAppIdEndpoint, {
            data: {
                appPackageName: ApiConsts.ProjectId
            }
        }, {
            headers: {
                Authorization: `Bearer ${authData.idToken}`,
            }
        });

        setLoading(false);
        Alert.alert("Response", JSON.stringify(response.data));
    };

    const getMyCurrencies = async () => {
        setLoading(true);

        const authData = JSON.parse(await AsyncStorage.getItem("authorization") as string);
        console.log(authData.idToken);

        const response = await axios.post(ApiConsts.UserGetUserCurrencies, {
            data: {}
        }, {
            headers: {
                Authorization: `Bearer ${authData.idToken}`,
            }
        });

        Alert.alert("Response", JSON.stringify(response.data));

        setLoading(false);
    };

    const signOut = () => {
        AsyncStorage.removeItem("authorization")
            .then(() => {
                navigation.replace("Authorization");
            })
            .catch(() => {
                console.log("clear authentication data error");
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <View style={styles.container}>
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
    }
});

export default HomeScreen;