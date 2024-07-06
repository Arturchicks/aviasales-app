import { createAsyncThunk } from "@reduxjs/toolkit"

// eslint-disable-next-line import/prefer-default-export
export const getId = createAsyncThunk("id/searchId", async () => {
  const search = await fetch("https://aviasales-test-api.kata.academy/search")
  if (!search.ok) {
    throw new Error(`${search.status}`)
  } else {
    const id = await search.json()
    return id
  }
})
