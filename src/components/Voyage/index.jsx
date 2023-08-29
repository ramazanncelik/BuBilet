import { useNavigation } from '@react-navigation/native'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const Voyage = ({ voyage }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("VoyageDetails", { voyageData: voyage })
        }} style={styles.baseView}>
            <Text style={{ flex: 2, fontSize: 14 }}>{voyage.company}</Text>
            <Text style={{ flex: 1, fontSize: 14 }}>{voyage.time}</Text>
            <Text style={{ flex: 2, fontSize: 14 }}>{voyage.emptySeat}</Text>
            <Text style={{ flex: 1, fontSize: 14 }}>{voyage.price}</Text>
        </TouchableOpacity>
    )
}

export default Voyage

const styles = StyleSheet.create({
    baseView: {
        width: '100%',
        flexDirection: 'row',
        gap: 3,
        borderBottomWidth: 1,
        padding: 5,
        borderRadius: 5
    }
})