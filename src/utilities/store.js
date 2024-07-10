import { configureStore } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
// eslint-disable-next-line import/no-cycle
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
