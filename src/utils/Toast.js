import { View, Text, StyleSheet } from "react-native"
import React from "react"
import Toast from "react-native-toast-message"

export const toastConfig = {
    "success": (internalState) => (
        <View style={{ ...styles.view, borderColor: "#22c55e" }}>
            {internalState.text1 &&
                <Text style={styles.text1}>{internalState.text1}</Text>}
            {internalState.text2 &&
                <Text style={styles.text2}>{internalState.text2}</Text>}
        </View>
    ),
    "error": (internalState) => (
        <View style={{ ...styles.view, borderColor: "#ef4444" }}>
            {internalState.text1 &&
                <Text style={styles.text1}>{internalState.text1}</Text>}
            {internalState.text2 &&
                <Text style={styles.text2}>{internalState.text2}</Text>}
        </View>
    ),
    "info": (internalState) => (
        <View style={{ ...styles.view, borderColor: "#3b82f6" }}>
            {internalState.text1 &&
                <Text style={styles.text1}>{internalState.text1}</Text>}
            {internalState.text2 &&
                <Text style={styles.text2}>{internalState.text2}</Text>}
        </View>
    ),
    "any_custom_type": () => { }
}

export function getToastMessage(toast) {

    Toast.show({
        type: toast.type,
        position: "top",
        text1: toast.text1,
        text2: toast.text2,
        visibilityTime: 4000,
        autoHide: true,
        onShow: () => { },
        onHide: () => { }
    });

}

const styles = StyleSheet.create({
    view: {
        width: '75%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        backgroundColor: '#f9fafb',
        flexDirection: 'column',
        gap: 2
    }, text1: {
        width: '100%',
        fontWeight: 'bold',
        color: 'black'
    }, text2: {
        width: '100%',
        color: 'black'
    }
});