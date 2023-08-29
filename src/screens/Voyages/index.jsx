import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../navigation/AppProvider';
import Voyage from '../../components/Voyage';
import { FlatList } from 'react-native';

const Voyages = ({ route }) => {

    const { data } = route.params;
    const [voyagesList, setVoyagesList] = useState([]);
    const { voyages } = useAppContext();

    const getVoyages = async () => {
        const filterVoyages = voyages.filter(voyage => voyage.fromWhere === data.fromWhere && voyage.whereTo === data.whereTo && voyage.date === data.selectedDate);
        setVoyagesList(filterVoyages);
    }

    const renderItem = ({ item }) => (
        <React.Fragment>
            <Voyage voyage={item} />
        </React.Fragment>
    );

    useEffect(() => {
        getVoyages()
    }, [data]);

    return (
        <SafeAreaView style={styles.pageView}>

            <View style={styles.tableView}>
                <Text style={{ flex: 2, fontSize: 16 }}>Firma</Text>
                <Text style={{ flex: 1, fontSize: 16 }}>Saat</Text>
                <Text style={{ flex: 2, fontSize: 16 }}>Boş Koltuk</Text>
                <Text style={{ flex: 1, fontSize: 16 }}>Fiyat</Text>
            </View>

            {voyagesList.length !== 0 &&
                <FlatList className="flex-1"
                    data={voyagesList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
                ||
                <View style={{ backgroundColor: "#bfdbfe", borderRadius: 5, padding: 10 }}>
                    <Text style={{ color: "#1d4ed8" }}>
                        {"Girdiğiniz Bilgilere Ait Sefer Bulunmamaktadır"}
                    </Text>
                </View>}
        </SafeAreaView>
    )
}

export default Voyages;

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
    },
    tableView: {
        width: '100%',
        flexDirection: 'row',
        gap: 3,
        padding: 5,
    }
});