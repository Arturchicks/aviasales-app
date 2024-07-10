import { useState } from "react"
import { useDispatch } from "react-redux"
// eslint-disable-next-line import/no-cycle
import {
  sortFastest,
  sortCheapest,
  sortOptimal
} from "../../utilities/combinedSlice"
import classes from "./Tabs.module.scss"
export default function Tabs() {
  const [activeTab, setActiveTab] = useState(null)
  const dispatch = useDispatch()
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex)
    // eslint-disable-next-line default-case
    switch (tabIndex) {
      case 0:
        dispatch({ type: "CHEAP" })
        break
      case 1:
        dispatch({ type: "FAST" })
        break
      case 2:
        dispatch({ type: "OPTIMAL" })
        break
    }
  }
  const getTabStyle = (tabIndex) => {
    return {
      backgroundColor:
        activeTab === tabIndex ? "rgba(33, 150, 243, 1)" : "white",
      color: activeTab === tabIndex ? "white" : "rgba(74, 74, 74)"
    }
  }
  return (
    <div className={classes.tabs}>
      <button
        type="button"
        onClick={() => handleTabClick(0, dispatch(sortCheapest()))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleTabClick(0)
          }
        }}
        style={getTabStyle(0)}
      >
        Самый дешевый
      </button>
      <button
        type="button"
        onClick={() => handleTabClick(1, dispatch(sortFastest()))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleTabClick(1)
          }
        }}
        style={getTabStyle(1)}
      >
        Самый быстрый
      </button>
      <button
        type="button"
        onClick={() => handleTabClick(2, dispatch(sortOptimal()))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleTabClick(2)
          }
        }}
        style={getTabStyle(2)}
      >
        Оптимальный
      </button>
    </div>
  )
}
