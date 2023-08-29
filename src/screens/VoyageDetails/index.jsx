import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import Seat from '../../components/Seat';
import SelectedSeat from '../../components/SelectedSeat';
import { TouchableOpacity } from 'react-native';
import { getToastMessage } from '../../utils/Toast';
import { useNavigation } from '@react-navigation/native';

const VoyageDetails = ({ route }) => {

  const { voyageData } = route.params;
  const navigation = useNavigation();
  const numDoubleSeats = Math.floor(voyageData.totalSeatNumber / 3);
  const numSingleSeats = Math.floor(voyageData.totalSeatNumber / 3) + 1;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSubmit = async () => {
    for (let i = 0; i < selectedSeats.length; i++) {
      const { tcIdNo, gender } = selectedSeats[i];
      if (tcIdNo === '' || tcIdNo.length !== 11 || gender === '') {
        await getToastMessage({
          type: "error",
          text1: "Hata",
          text2: "Lütfen Tüm Alanları Doldurunuz!"
        });
        return;
      }
    }

    for (let i = 0; i < selectedSeats.length; i++) {
      const { id, gender, type } = selectedSeats[i];
      if (type === "double") {
        if (id % 3 === 0) {
          const previousSeat = voyageData.seatNumbersTaken.find(seatTaken => seatTaken.id === (id - 1));
          if (previousSeat && previousSeat.gender !== gender) {
            await getToastMessage({
              type: "error",
              text1: "Uyarı",
              text2: "Karşı Cinsinizin Yanındaki Koltuğu Alamazsınız"
            });
            return;
          }
        } else {
          if (id % 3 === 2) {
            const previousSeat = voyageData.seatNumbersTaken.find(seatTaken => seatTaken.id === (id + 1));
            if (previousSeat && previousSeat.gender !== gender) {
              await getToastMessage({
                type: "error",
                text1: "Uyarı",
                text2: "Karşı Cinsinizin Yanındaki Koltuğu Alamazsınız"
              });
              return;
            }
          }
        }
      }
    }

    await navigation.navigate("Payment", {
      totalPrice: (voyageData.price * selectedSeats.length),
      voyageData,
      selectedSeats
    });

  }

  return (
    <ScrollView style={styles.pageView}>
      <View style={{ width: '100%', flexDirection: 'column', marginBottom: 20 }}>
        <View style={styles.tableView}>
          <Text style={{ flex: 2, fontSize: 16 }}>Firma</Text>
          <Text style={{ flex: 1, fontSize: 16 }}>Saat</Text>
          <Text style={{ flex: 2, fontSize: 16 }}>Boş Koltuk</Text>
          <Text style={{ flex: 1, fontSize: 16 }}>Fiyat</Text>
        </View>
        <View style={styles.tableView}>
          <Text style={{ flex: 2, fontSize: 14 }}>{voyageData.company}</Text>
          <Text style={{ flex: 1, fontSize: 14 }}>{voyageData.time}</Text>
          <Text style={{ flex: 2, fontSize: 14 }}>{voyageData.emptySeat}</Text>
          <Text style={{ flex: 1, fontSize: 14 }}>{voyageData.price} TL</Text>
        </View>
      </View>

      <ScrollView horizontal style={{ maxHeight: 200, marginBottom: 20 }}>
        <View style={{ flexDirection: 'column', gap: 5 }}>
          <View style={styles.seatsView}>
            {[...Array(numDoubleSeats)].map((_, index) => {
              const seatNumber = index * 3 + 3;

              return (
                <Seat
                  key={index}
                  index={index}
                  seatId={seatNumber}
                  voyageData={voyageData}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  numDoubleSeats={numDoubleSeats}
                  type="double" />
              );
            })}
          </View>

          <View style={styles.seatsView}>
            {[...Array(numDoubleSeats)].map((_, index) => {
              const seatNumber = index * 3 + 2;

              return (
                <Seat
                  key={index}
                  index={index}
                  seatId={seatNumber}
                  voyageData={voyageData}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  numDoubleSeats={numDoubleSeats}
                  type="double" />
              );
            })}
          </View>

          <View style={styles.space}></View>

          <View style={styles.seatsView}>
            {[...Array(numSingleSeats)].map((_, index) => {
              const seatNumber = index * 3 + 1;
              return (
                <Seat
                  key={index}
                  index={index}
                  seatId={seatNumber}
                  voyageData={voyageData}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  type="single" />
              );
            })}
          </View>
        </View>
      </ScrollView>

      {selectedSeats.length !== 0 &&
        selectedSeats.map((seat) => {
          return (
            <SelectedSeat key={seat.id}
              seatData={seat}
              voyageData={voyageData}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats} />
          )
        })}

      {selectedSeats.length !== 0 &&
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
          <Text style={{ color: "white" }}>
            Ödeme Yap: {selectedSeats.length * voyageData.price} TL
          </Text>
        </TouchableOpacity>}

    </ScrollView>
  )
}

export default VoyageDetails

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 5,
    backgroundColor: 'white',
    flexDirection: 'column',
  }, tableView: {
    width: '100%',
    flexDirection: 'row',
    gap: 3,
    padding: 5,
  }, seatsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  }, space: {
    height: 45,
  }, button: {
    width: 200,
    padding: 10,
    backgroundColor: "#3b82f6",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }
})