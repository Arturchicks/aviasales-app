import { configureStore, applyMiddleware, middleware } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import combinedSlice from "./combinedSlice"
const store = configureStore({
  reducer: combinedSlice,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false
    }).concat(thunk)
})
export default store
