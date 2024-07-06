import { createSlice } from "@reduxjs/toolkit"
// eslint-disable-next-line import/no-cycle
import { fetchOn } from "../Service/service"
import { getId } from "../Service/getId"
// eslint-disable-next-line import/no-cycle

const initialState = {
  check: {
    all: false,
    one: true,
    two: false,
    three: false,
    without: false
  },
  tabs: {
    fastest: false,
    cheapest: false,
    optimal: false
  },
  tickets: [],
  ticketsData: [],
  value: [],
  counter: 5,
  loading: null,
  searchId: null,
  stop: null,
  idLoad: false
}

const combinedSlice = createSlice({
  name: "combined",
  initialState,
  reducers: {
    toggleOne: (state, action) => ({
      ...state,
      check: {
        ...state.check,
        one: action.payload,
        all: false
      }
    }),
    toggleTwo: (state, action) => ({
      ...state,
      check: {
        ...state.check,
        two: action.payload,
        all: false
      }
    }),
    toggleThree: (state, action) => ({
      ...state,
      check: {
        ...state.check,
        three: action.payload,
        all: false
      }
    }),
    toggleWithout: (state, action) => ({
      ...state,
      check: {
        ...state.check,
        without: action.payload,
        all: false
      }
    }),
    toggleAll: (state) => ({
      ...state,
      check: {
        ...state.check,
        all: !state.check.all,
        one: !state.check.all,
        two: !state.check.all,
        three: !state.check.all,
        without: !state.check.all
      }
    }),
    toggleAllTrue: (state) => ({
      ...state,
      check: {
        ...state.check,
        all: true
      }
    }),
    toggleFastest: (state) => ({
      ...state,
      tabs: {
        ...state.tabs,
        fastest: !state.tabs.fastest,
        cheapest: false,
        optimal: false
      }
    }),
    toggleCheapest: (state) => ({
      ...state,
      tabs: {
        ...state.tabs,
        cheapest: !state.tabs.cheapest,
        fastest: false,
        optimal: false
      }
    }),
    toggleOptimal: (state) => ({
      ...state,
      tabs: {
        ...state.tabs,
        optimal: !state.tabs.optimal,
        fastest: false,
        cheapest: false
      }
    }),

    setAll: (state) => {
      if (state.check.all) {
        state.value = [...state.ticketsData]
      } else {
        state.value = []
      }
    },
    setOne: (state) => {
      const filterArr = state.ticketsData.filter(
        (e) => e.segments[0].stops.length === 1
      )
      if (state.check.one) {
        if (Object.values(state.check).filter((e) => !!e === true).length > 1) {
          state.value = [...state.value, ...filterArr]
        } else {
          state.value = [...filterArr]
        }
      } else if (
        Object.values(state.check).filter((e) => !!e === true).length === 0
      ) {
        state.value = []
      } else {
        state.value = state.value.filter(
          (e) => e.segments[0].stops.length !== 1
        )
      }
    },
    setTwo: (state) => {
      const filterArr = state.ticketsData.filter(
        (e) => e.segments[0].stops.length === 2
      )
      if (state.check.two) {
        if (Object.values(state.check).filter((e) => !!e === true).length > 1) {
          state.value = [...state.value, ...filterArr]
        } else {
          state.value = [...filterArr]
        }
      } else if (
        Object.values(state.check).filter((e) => !!e === true).length === 0
      ) {
        state.value = []
      } else {
        state.value = state.value.filter(
          (e) => e.segments[0].stops.length !== 2
        )
      }
    },
    setThree: (state) => {
      const filterArr = state.ticketsData.filter(
        (e) => e.segments[0].stops.length === 3
      )
      if (state.check.three) {
        if (Object.values(state.check).filter((e) => !!e === true).length > 1) {
          state.value = [...state.value, ...filterArr]
        } else {
          state.value = [...filterArr]
        }
      } else if (
        Object.values(state.check).filter((e) => !!e === true).length === 0
      ) {
        state.value = []
      } else {
        state.value = state.value.filter(
          (e) => e.segments[0].stops.length !== 3
        )
      }
    },
    setWithout: (state) => {
      const filterArr = state.ticketsData.filter(
        (e) => e.segments[0].stops.length === 0
      )
      if (state.check.without) {
        if (Object.values(state.check).filter((e) => !!e === true).length > 1) {
          state.value = [...state.value, ...filterArr]
        } else {
          state.value = [...filterArr]
        }
      } else if (
        Object.values(state.check).filter((e) => !!e === true).length === 0
      ) {
        state.value = []
      } else {
        state.value = state.value.filter(
          (e) => e.segments[0].stops.length !== 0
        )
      }
    },
    setFastest: (state) => {
      state.tabs.fastest = true
      state.tabs.cheapest = false
      state.tabs.optimal = false
      state.value = state.value.sort(
        (a, b) => a.segments[1].duration - b.segments[1].duration
      )
    },
    setCheapest: (state) => {
      state.tabs.cheapest = true
      state.tabs.optimal = false
      state.tabs.fastest = false
      state.value = state.value.sort((a, b) => a.price - b.price)
    },
    setOptimal: (state) => {
      state.tabs.optimal = true
      state.tabs.fastest = false
      state.tabs.cheapest = false
      state.value = state.value.sort((a, b) => {
        const firstEl =
          a.segments[0].duration * 100 +
          a.price +
          a.segments[0].stops.length * 100
        const secEl =
          b.segments[0].duration * 100 +
          b.price +
          b.segments[0].stops.length * 100
        return firstEl - secEl
      })
    },
    loadTickets: (state) => {
      state.counter += 5
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOn.pending, (state) => {
      state.loading = "pending"
    })
    builder.addCase(fetchOn.fulfilled, (state, action) => {
      state.loading = "fullfilled"
      state.ticketsData = [...state.ticketsData, ...action.payload.tickets]
      state.stop = action.payload.stop
    })
    builder.addCase(fetchOn.rejected, (state) => {
      state.loading = "rejected"
    })
    builder.addCase(getId.fulfilled, (state, action) => {
      state.searchId = action.payload.searchId
      state.idLoad = true
    })
  }
})

export const {
  toggleOne,
  toggleTwo,
  toggleThree,
  toggleWithout,
  toggleAll,
  toggleAllTrue,
  toggleFastest,
  toggleCheapest,
  toggleOptimal,
  setTickets,
  setOne,
  setTwo,
  setThree,
  setWithout,
  setAll,
  setIds,
  loadTickets,
  setFastest,
  setCheapest,
  setOptimal
} = combinedSlice.actions

export default combinedSlice.reducer
