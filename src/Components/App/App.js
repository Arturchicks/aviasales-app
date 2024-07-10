import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingOutlined } from "@ant-design/icons"
import { Alert, Spin } from "antd"
// eslint-disable-next-line import/no-cycle
import Filters from "../Filters/Filters"
import Tabs from "../Tabs/Tabs"
import Tickets from "../Tickets/Tickets"
import { fetchOn } from "../../utilities/service"
import { getId } from "../../utilities/getId"
import {
  filterOne,
  loadTickets,
  filterTwo,
  filterThree,
  filterWithout,
  sortCheapest,
  sortFastest,
  sortOptimal
} from "../../utilities/combinedSlice"
// import { filterValue } from "../../utilities/filterValue"
import classes from "./App.module.scss"
export default function App() {
  const { stop, check, searchId, displayedTickets, tabs, didMount } =
    useSelector((state) => state)
  const dispatch = useDispatch()
  const all =
    check.all || check.one || check.two || check.three || check.without
  // eslint-disable-next-line consistent-return
  const filterValue = () => {
    switch (true) {
      case check.one:
        dispatch(filterOne())
        break
      case check.two:
        dispatch(filterTwo())
        break
      case check.three:
        dispatch(filterThree())
        break
      case check.without:
        dispatch(filterWithout())
        break
      default:
        return displayedTickets
    }
  }

  const filterTabs = () => {
    // eslint-disable-next-line default-case
    switch (true) {
      case tabs.cheapest:
        dispatch(sortCheapest())
        break
      case tabs.fastest:
        dispatch(sortFastest())
        break
      case tabs.optimal:
        dispatch(sortOptimal())
        break
    }
  }

  useEffect(() => {
    if (!stop && searchId) {
      const timer = setInterval(() => {
        dispatch(fetchOn(searchId))
        filterValue()
        filterTabs()
      }, 200)
      return () => {
        clearInterval(timer)
      }
    }

    return () => undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchId, stop, displayedTickets, check, tabs])

  useEffect(() => {
    dispatch(getId())
  }, [dispatch])

  return (
    <>
      {!stop ? (
        <Spin
          className={classes.spin}
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 66,
                color: "rgba(33, 150, 243, 1)"
              }}
              spin
            />
          }
        />
      ) : (
        <div className={classes.image} />
      )}
      <div className={classes.wrapper}>
        <Filters />
        <div className={classes["tickets-list"]}>
          <Tabs />
          {all && <Tickets />}
          {didMount && all && (
            <button
              type="button"
              className={classes.showButton}
              onClick={() => dispatch(loadTickets())}
            >
              ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
            </button>
          )}
          {!check.all &&
            !check.one &&
            !check.two &&
            !check.three &&
            !check.without && (
              <Alert
                className={classes.alert}
                type="info"
                message="Рейсов, подходящих под заданные фильтры, не найдено"
              />
            )}
        </div>
      </div>
    </>
  )
}
export const { filterValue } = App
