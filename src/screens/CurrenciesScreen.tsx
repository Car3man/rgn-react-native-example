import React, {useState} from "react";
import Api from "../utils/Api";
import {Alert, Button} from "react-native";
import Loading from "../components/Loading";
import ViewContainer from "../components/ViewContainer";

export const CurrenciesScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(false);

    const handleGetMyCurrenciesButton = async () => {
        setLoading(true);
        const response = await Api.getUserCurrencies();
        Alert.alert("My currencies", JSON.stringify(response.data));
        setLoading(false);
    };

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <ViewContainer>
            <Button title="Get My Currencies" onPress={handleGetMyCurrenciesButton}/>
        </ViewContainer>
    );
};

export default CurrenciesScreen;