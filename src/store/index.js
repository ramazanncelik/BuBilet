import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import users from './users'
import voyages from './voyages'

const store = configureStore({
    reducer: {
        auth,
        users,
        voyages,
    }
})

export default store;