import { createAsyncThunk } from "@reduxjs/toolkit"
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/prefer-default-export
export const fetchOn = createAsyncThunk(
  "combined/fetchOn",
  // eslint-disable-next-line consistent-return
  async function (searchId) {
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      )
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      )
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      const data = await response.json()
      return data
    }
  }
)
