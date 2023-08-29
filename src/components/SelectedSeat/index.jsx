import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';

const SelectedSeat = ({ seatData, voyageData, selectedSeats, setSelectedSeats }) => {

    const seatIndex = selectedSeats.findIndex(seat => seat.id === seatData.id);
    const [newSeatData, setNewSeatData] = useState({})

    const handleChange = async (newData) => {
        await setNewSeatData({ ...newSeatData, ...newData });
        selectedSeats[seatIndex] = {
            ...selectedSeats[seatIndex],
            ...newData,
        };
        await setSelectedSeats(selectedSeats);
    }

    useEffect(() => {
        setNewSeatData(selectedSeats[seatIndex])
    }, [seatIndex]);

    return (
        <View style={styles.container}>
            <View style={{ width: 45, height: 50, borderRadius: 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    {seatData.id}
                </Text>
            </View>

            <TextInput
                maxLength={11}
                keyboardType='number-pad'
                onChangeText={(value) => handleChange({ tcIdNo: value })}
                value={newSeatData.tcIdNo}
                placeholder='TC Kimlik Numarası'
                style={{ ...styles.textInput, borderWidth: 1, borderColor: !newSeatData.tcIdNo ? "#ef4444" : "black" }} />

            <SelectDropdown
                buttonStyle={{
                    ...styles.dropDown,
                    borderColor: !newSeatData.gender ? "#ef4444" : "black"
                }} buttonTextStyle={{
                    width: '100%',
                    color: "black",
                    borderWidth: 0
                }} renderDropdownIcon={() => {
                    return (
                        <MaterialCommunityIcons style={{
                            color: "black"
                        }}
                            name='chevron-down'
                            size={24} />
                    )
                }} dropdownIconPosition='right' dropdownStyle={{
                    borderRadius: 10
                }}
                data={["Erkek", "Kadın"]}
                defaultButtonText={"Cinsiyet"}
                onSelect={(value) => handleChange({ gender: value })}
            />
        </View>
    )
}

export default SelectedSeat

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        gap: 5,
        marginBottom:5
    }, textInput: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#000',
        fontSize: 14,
        borderRadius: 8,
        padding: 10,
    }, dropDown: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        backgroundColor: "white",
    }
});