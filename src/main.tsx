import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter} from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import ProductsReducer, { productsFetch } from './utils/ProductSlice.ts'
import { productsApi } from './utils/ProductsApi.ts'
import cartReducer, { getTotals } from './utils/cartSLice.ts'

const store = configureStore({
  reducer:{
    products: ProductsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware)
  } 
})

store.dispatch(productsFetch())
store.dispatch(getTotals());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
        <ToastContainer/>
          <Provider store={store}>
            <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
)
