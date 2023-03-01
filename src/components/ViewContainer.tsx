import {StyleSheet, View} from "react-native";

export const ViewContainer = (props: any) => {
    return (
      <View style={styles.container}>
          {props.children}
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

export default ViewContainer;