import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingOutlined } from "@ant-design/icons"
import { Alert, Spin } from "antd"
import Filters from "../Filters/Filters"
import Tabs from "../Tabs/Tabs"
import Tickets from "../Tickets/Tickets"
import { fetchOn } from "../Service/service"
import { getId } from "../Service/getId"
import {
  setOne,
  loadTickets,
  setTwo,
  setThree,
  setWithout,
  setCheapest,
  setFastest,
  setOptimal
} from "../Store/combinedSlice"
// import { filterValue } from "../../utilities/filterValue"
import classes from "./App.module.scss"
export default function App() {
  const { stop, check, searchId, value, tabs } = useSelector((state) => state)
  const dispatch = useDispatch()
  const all =
    check.all || check.one || check.two || check.three || check.without
  // eslint-disable-next-line consistent-return
  const filterValue = () => {
    switch (true) {
      case check.one:
        dispatch(setOne())
        break
      case check.two:
        dispatch(setTwo())
        break
      case check.three:
        dispatch(setThree())
        break
      case check.without:
        dispatch(setWithout())
        break
      default:
        return value
    }
  }

  const filterTabs = () => {
    // eslint-disable-next-line default-case
    switch (true) {
      case tabs.cheapest:
        dispatch(setCheapest())
        break
      case tabs.fastest:
        dispatch(setFastest())
        break
      case tabs.optimal:
        dispatch(setOptimal())
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
  }, [dispatch, searchId, stop, value, check, tabs])

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
          {all && (
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
