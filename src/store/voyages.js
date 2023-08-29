import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    voyages: [
        {
            id: 1,
            fromWhere: "İstanbul",
            whereTo: "Malatya",
            company: "Kamil Koç",
            price: 500,
            emptySeat: 44,
            totalSeatNumber: 49,
            date: "28/10/2023",
            time: "17:05",
            seatNumbersTaken: [
                {
                    id: 1,
                    userId: 1,
                    gender: "Erkek",
                    tcIdNo: "12345678910",
                    type: "single"
                }, {
                    id: 2,
                    userId: 1,
                    gender: "Erkek",
                    tcIdNo: "12345678910",
                    type: "double"
                }, {
                    id: 5,
                    userId: 1,
                    gender: "Kadın",
                    tcIdNo: "12345678910",
                    type: "double"
                }, {
                    id: 6,
                    userId: 1,
                    gender: "Kadın",
                    tcIdNo: "12345678910",
                    type: "double"
                }, {
                    id: 11,
                    userId: 1,
                    gender: "Erkek",
                    tcIdNo: "12345678910",
                    type: "double"
                }, {
                    id: 15,
                    userId: 1,
                    gender: "Kadın",
                    tcIdNo: "12345678910",
                    type: "double"
                }
            ]
        }, {
            id: 2,
            fromWhere: "İzmir",
            whereTo: "Kocaeli",
            company: "Kamil Koç",
            price: 450,
            emptySeat: 32,
            totalSeatNumber: 37,
            date: "10/09/2023",
            time: "13:20",
            seatNumbersTaken: [
                {
                    id: 7,
                    userId: 1,
                    gender: "Erkek",
                    tcIdNo: "12345678910",
                    type: "single"
                }, {
                    id: 30,
                    userId: 1,
                    gender: "Kadın",
                    tcIdNo: "12345678910",
                    type: "double"
                }, {
                    id: 25,
                    userId: 1,
                    gender: "Erkek",
                    tcIdNo: "12345678910",
                    type: "single"
                }, {
                    id: 28,
                    userId: 1,
                    gender: "Kadın",
                    tcIdNo: "12345678910",
                    type: "single"
                }, {
                    id: 11,
                    userId: 1,
                    gender: "Kadın",
                    tcIdNo: "12345678910",
                    type: "double"
                }
            ]
        }
    ]
}

const voyages = createSlice({
    name: 'voyages',
    initialState,
    reducers: {
        updateVoyage: (state, action) => {
            const { id, newData } = action.payload;
            const voyageIndex = state.voyages.findIndex(voyage => voyage.id === id);

            if (voyageIndex !== -1) {
                state.voyages[voyageIndex] = {
                    ...state.voyages[voyageIndex],
                    ...newData,
                };
            }
        },
        buySeat: (state, action) => {
            const { id, newSeat } = action.payload;
            const voyageIndex = state.voyages.findIndex(voyage => voyage.id === id);
            if (voyageIndex !== -1) {
                state.voyages[voyageIndex].seatNumbersTaken.push(newSeat);
            }

        }
    }
});

export const { updateVoyage, buySeat } = voyages.actions
export default voyages.reducer;