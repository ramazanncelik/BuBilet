import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import turkishCities from '../../utils/turkishCities'
import { useFormik } from 'formik'
import { ticketFormValidations } from '../../utils/validations';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native'

const SearchForTickets = () => {

    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isClicked, setIsClicked] = useState(false)

    const { handleChange, handleReset, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            fromWhere: "",
            whereTo: "",
        },
        onSubmit: async (values) => {
            await setIsClicked(true);
            if (values.fromWhere && values.whereTo && selectedDate) {
                navigation.navigate("Voyages", { data: { ...values, selectedDate } });
            }
        },
        validationSchema: ticketFormValidations
    });

    const showDatePicker = async () => {
        await setDatePickerVisibility(true);
    };

    const hideDatePicker = async () => {
        await setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        const inputDate = new Date(date);

        const formatDate = (date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1; // JavaScript'te aylar 0'dan başlar, 1 eklememiz gerekiyor
            const year = date.getFullYear();

            return `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}/${year}`;
        };

        const formattedDateStr = formatDate(inputDate);
        setSelectedDate(formattedDateStr)

        hideDatePicker();
    };

    return (
        <SafeAreaView style={styles.pageView}>
            <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={{ fontSize: 18 }}>Nereden</Text>
                <SelectDropdown
                    name="fromWhere"
                    buttonStyle={styles.dropDown} buttonTextStyle={{
                        color: "black",
                        fontSize: 16,
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
                    search={true}
                    searchInputTxtColor='black'
                    searchPlaceHolder='Şehir Adı Giriniz'
                    searchPlaceHolderColor='black'
                    data={turkishCities.filter(city => city !== values.whereTo)}
                    defaultButtonText={"Lütfen Bir İl Seçiniz"}
                    onSelect={handleChange("fromWhere")}
                />
                {errors.fromWhere && touched.fromWhere && (
                    <Text style={styles.errorText}>
                        {errors.fromWhere}
                    </Text>
                )}
            </View>

            <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={{ fontSize: 18 }}>Nereye</Text>
                <SelectDropdown
                    name="whereTo"
                    buttonStyle={styles.dropDown} buttonTextStyle={{
                        color: "black",
                        fontSize: 16,
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
                    search={true}
                    searchInputTxtColor='black'
                    searchPlaceHolder='Şehir Adı Giriniz'
                    searchPlaceHolderColor='black'
                    data={turkishCities.filter(city => city !== values.fromWhere)}
                    defaultButtonText={"Lütfen Bir İl Seçiniz"}
                    onSelect={handleChange("whereTo")}
                />
                {errors.whereTo && touched.whereTo && (
                    <Text style={styles.errorText}>
                        {errors.whereTo}
                    </Text>
                )}
            </View>

            <View style={{ flexDirection: "column", gap: 5, justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>Gidiş Tarihi</Text>

                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => showDatePicker()} style={{ flex: 1, borderWidth: 1, padding: 15, borderRadius: 10 }}>
                        <Text style={{ fontSize: 14 }}>
                            {selectedDate &&
                                selectedDate || "Lütfen Tarih Seçiniz!"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <DateTimePickerModal
                    minimumDate={new Date()}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                {(isClicked && !selectedDate) && (
                    <Text style={styles.errorText}>
                        Lütfen Gidiş Tarihini Seçiniz!
                    </Text>
                )}
            </View>

            <TouchableOpacity onPress={handleSubmit} style={{ width: '100%', padding: 12, borderRadius: 10, backgroundColor: "#3b82f6" }}>
                <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                    Bilet Bul
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default SearchForTickets;

const styles = StyleSheet.create({
    pageView: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 5,
        backgroundColor: 'white',
        flexDirection: 'column',
        gap: 10
    }, dropDown: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        backgroundColor: "white",
    }, errorText: {
        width: '100%',
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 8,
        color: 'white',
        marginBottom: 12
    }, textInput: {
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#000',
        fontSize: 14,
        borderRadius: 8,
        padding: 10,
    }
});