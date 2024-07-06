import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
// eslint-disable-next-line import/no-cycle
import store from "../Store/index"
import {
  toggleOne,
  toggleTwo,
  toggleThree,
  toggleWithout,
  toggleAll,
  toggleAllTrue,
  setOne,
  setTwo,
  setThree,
  setWithout,
  setAll,
  setCheapest,
  setFastest,
  setOptimal
} from "../Store/combinedSlice"
import classes from "./Filters.module.scss"

export default function Filters() {
  const dispatch = useDispatch()
  const { check, tabs } = useSelector((state) => state)
  // eslint-disable-next-line consistent-return

  useEffect(() => {
    if (check.one && check.two && check.three && check.without && !check.all) {
      store.dispatch(toggleAllTrue())
    }
  }, [dispatch, check])
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
  const handleOne = (checked) => {
    dispatch(toggleOne(checked))
    dispatch(setOne())
    filterTabs()
  }
  const handleTwo = (checked) => {
    dispatch(toggleTwo(checked))
    dispatch(setTwo())
    filterTabs()
  }
  const handleThree = (checked) => {
    dispatch(toggleThree(checked))
    dispatch(setThree())
    filterTabs()
  }
  const handleWithout = (checked) => {
    dispatch(toggleWithout(checked))
    dispatch(setWithout())
    filterTabs()
  }
  const handleAll = (checked) => {
    dispatch(toggleAll(checked))
    dispatch(setAll())
    filterTabs()
  }

  return (
    <div className={classes.filters}>
      <h4 className={classes.header}>Количество пересадок</h4>
      <ul className={classes["filters-list"]}>
        <li>
          <label>
            <input
              id="all"
              type="checkbox"
              onChange={(e) => {
                handleAll(e.target.checked)
              }}
              checked={check.one && check.two && check.three && check.without}
              className={classes["real-checkbox"]}
            />
            <span className={classes["custom-checkbox"]} />
            Все
          </label>
        </li>
        <li>
          <label>
            <input
              id="without"
              type="checkbox"
              onChange={(e) => handleWithout(e.target.checked)}
              checked={check.without}
              className={classes["real-checkbox"]}
            />
            <span className={classes["custom-checkbox"]} />
            Без пересадок
          </label>
        </li>
        <li>
          <label>
            <input
              id="one"
              type="checkbox"
              onChange={(e) => handleOne(e.target.checked)}
              checked={check.one}
              className={classes["real-checkbox"]}
            />
            <span className={classes["custom-checkbox"]} />1 пересадка
          </label>
        </li>
        <li>
          <label>
            <input
              id="two"
              type="checkbox"
              onChange={(e) => handleTwo(e.target.checked)}
              checked={check.two}
              className={classes["real-checkbox"]}
            />
            <span className={classes["custom-checkbox"]} />2 пересадки
          </label>
        </li>
        <li>
          <label>
            <input
              id="three"
              type="checkbox"
              checked={check.three}
              onChange={(e) => handleThree(e.target.checked)}
              className={classes["real-checkbox"]}
            />
            <span className={classes["custom-checkbox"]} />3 пересадки
          </label>
        </li>
      </ul>
    </div>
  )
}
