import {Alert, Button, Text, View} from "react-native";
import React, {useState} from "react";
import ViewContainer from "../components/ViewContainer";
import Api from "../utils/Api";
import Loading from "../components/Loading";

export const VirtualItemsScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(false);

    const handleGetVirtualItemsButton = async () => {
        setLoading(true);
        const response = await Api.getVirtualItemsByAppId();
        Alert.alert("Virtual items", JSON.stringify(response.data));
        setLoading(false);
    };

    if (isLoading) {
        return (
          <Loading />
        );
    }

    return (
        <ViewContainer>
            <Button title="Get Virtual Items" onPress={handleGetVirtualItemsButton}/>
        </ViewContainer>
    );
};

export default VirtualItemsScreen;