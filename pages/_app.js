import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'
import theme from './themes/theme'
import userSlice from './features/user'
import tokenSlice from './features/token'
import { configureStore } from '@reduxjs/toolkit'

const queryClient = new QueryClient()

const store = configureStore({
  reducer: {
    user: userSlice,
    token: tokenSlice
  }
})

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme} >
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
