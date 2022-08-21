import { configureStore } from '@reduxjs/toolkit'
import ApiReducer from "./features/ApiKey";
export default configureStore({
  reducer: {
    apiHandle: ApiReducer
  }
})