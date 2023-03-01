import React, {useState} from "react";
import Api from "../utils/Api";
import {Alert, Button, StyleSheet, TextInput} from "react-native";
import Loading from "../components/Loading";
import ViewContainer from "../components/ViewContainer";

export const CreateWalletScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

    const handlePasswordInput = (text: string) => {
        setPassword(text);
    };

    const handleCreateButton = async () => {
        setLoading(true);
        const response = await Api.createUserWallet(password);
        Alert.alert("Create wallet result", JSON.stringify(response.data));
        navigation.navigate("Wallets");
        setLoading(false);
    };

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <ViewContainer>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={handlePasswordInput}
                value={password}
                secureTextEntry={true}
            />
            <Button title="Create" onPress={handleCreateButton}/>
        </ViewContainer>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
});

export default CreateWalletScreen;