import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../navigation/AppProvider';
import { getToastMessage } from '../../utils/Toast'

const Seat = ({ seatId, numDoubleSeats, voyageData, index, selectedSeats, setSelectedSeats, type }) => {

    const { voyages, user } = useAppContext();
    const [isBuyed, setIsBuyed] = useState(null);
    const [isSelected, setIsSelected] = useState(null);

    const querySeat = async () => {
        const findSeat = voyageData.seatNumbersTaken.find(seat => seat.id === seatId);
        if (findSeat) {
            await setIsBuyed(findSeat)
        } else {
            await setIsBuyed(null)
        }
    }

    const querySelected = async () => {
        const findSeat = selectedSeats.find(seat => seat.id === seatId);
        if (findSeat) {
            await setIsSelected(findSeat)
        } else {
            await setIsSelected(null)
        }
    }

    const selectSeat = async () => {
        if (isSelected) {
            await setSelectedSeats(selectedSeats.filter(seat => seat.id !== isSelected.id))
        } else {
            if (selectedSeats.length !== 5) {
                await setSelectedSeats([
                    ...selectedSeats,
                    {
                        id: seatId,
                        userId: user.id,
                        tcIdNo: "",
                        gender: "",
                        type
                    }
                ]);
            } else {
                await getToastMessage({
                    type: "error",
                    text1: "Koltuk Seçme Hatası",
                    text2: "Maalesef 5 Koltuktan Fazla Koltuk Seçemez ve Alamazsınız.",
                });
            }

        }

    }

    useEffect(() => {
        querySeat();
    }, [seatId]);

    useEffect(() => {
        querySelected();
    }, [selectedSeats]);

    return (
        <React.Fragment>
            {(index === Math.floor(numDoubleSeats / 2) && type === "double") && <View style={styles.space}></View>}
            <TouchableOpacity onPress={() => selectSeat()} disabled={isBuyed && true || false} style={{ ...styles.seat, backgroundColor: isBuyed ? (isBuyed.gender == "Kadın" && "#ec4899" || "#3b82f6") : (isSelected ? "#22c55e" : '#CCCCCC') }}>
                <Text style={styles.seatNumber}>{seatId}</Text>
            </TouchableOpacity>
        </React.Fragment>
    )
}

export default Seat

const styles = StyleSheet.create({
    seat: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        borderRadius: 10
    },
    seatNumber: {
        color: 'white',
    }, space: {
        width: 45,
    },
})