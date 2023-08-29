import React from 'react'
import { AppProvider } from './src/navigation/AppProvider'
import Routes from './src/navigation/Routes'
import Toast from 'react-native-toast-message'
import { toastConfig } from './src/utils/Toast'
import store from './src/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <Routes />
        <Toast config={toastConfig} />
      </AppProvider>
    </Provider>
  )
}

export default App;