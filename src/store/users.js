import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [
        {
            id: 1,
            name: "Bu",
            surname: "Bilet",
            tcIdNo: "11111111111",
            dateOfBirth: "24/12/2000",
            gender: "Male",
            email: "BuBilet@gmail.com",
            password: "123456"
        }
    ],
}

const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        signup: (state, action) => {
            state.users.push(action.payload);
        },
    }
});

export const { signup } = users.actions
export default users.reducer;