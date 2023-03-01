import React, {useState} from "react";
import Api from "../utils/Api";
import {Alert, Button} from "react-native";
import Loading from "../components/Loading";
import ViewContainer from "../components/ViewContainer";

export const WalletsScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(false);

    const handleGetMyWalletsButton = async () => {
        setLoading(true);
        const response = await Api.getUserWallets();
        Alert.alert("My wallets", JSON.stringify(response.data));
        setLoading(false);
    };

    const handlePrimaryWalletCheckButton = async () => {
        setLoading(true);
        const response = await Api.isUserHavePrimaryWallet();
        Alert.alert("My primary wallet", JSON.stringify(response.data));
        setLoading(false);
    };

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <ViewContainer>
            <Button title="Get my wallets" onPress={handleGetMyWalletsButton}/>
            <Button title="Am i have primary wallet" onPress={handlePrimaryWalletCheckButton}/>
            <Button title="Create wallet" onPress={() => {
                navigation.navigate("CreateWallet");
            }}/>
        </ViewContainer>
    );
};

export default WalletsScreen;