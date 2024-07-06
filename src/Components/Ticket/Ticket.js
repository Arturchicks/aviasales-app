import classes from "./Ticket.module.scss"
export default function Ticket({
  price,
  iata,
  originThere,
  routeThere,
  originBack,
  routeBack,
  dateThere,
  dateBack,
  durationThere,
  durationBack,
  stopsThere,
  stopsBack
}) {
  const hoursThere = new Date(dateThere).getHours()
  const minutesThere = new Date(dateThere).getMinutes()
  const durationHoursThere = (durationThere / 60).toFixed(0)
  const durationMinutesThere = durationThere % 60
  const intervalThere =
    new Date(dateThere).getTime() + durationThere * 60 * 1000
  const hoursBack = new Date(dateBack).getHours()
  const minutesBack = new Date(dateBack).getMinutes()
  const durationHoursBack = (durationBack / 60).toFixed(0)
  const durationMinutesBack = durationBack % 60
  const intervalBack = new Date(dateBack).getTime() + durationBack * 60 * 1000
  const prices = price.toString().split("")
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < prices.length; i++) {
    if (i === prices.length - 4) {
      prices[i] += " "
    }
  }
  return (
    <div className={classes.ticket}>
      <div className={classes.header}>
        <span className={classes.price}>{`${prices.join("")} Р`}</span>
        <img
          src={`http://pics.avs.io/120/40/${iata}.png`}
          alt="company"
          className={classes.image}
        />
      </div>

      <div className={classes.info}>
        <div className={classes.route}>
          <div className={classes.routeWrap}>
            <span className={classes.routeThere}>
              {`${originThere} - ${routeThere}`}
            </span>
            <span
              className={classes.length}
            >{`${hoursBack.toString().padStart(2, "0")}:${minutesBack.toString().padStart(2, "0")} - ${new Date(intervalBack).getHours().toString().padStart(2, "0")}:${new Date(intervalBack).getMinutes().toString().padStart(2, "0")}`}</span>
          </div>
          <div className={classes.routeWrap}>
            <span className={classes.routeBack}>
              {`${originBack} - ${routeBack}`}
            </span>
            <span
              className={classes.length}
            >{`${hoursThere.toString().padStart(2, "0")}:${minutesThere.toString().padStart(2, "0")} - ${new Date(intervalThere).getHours().toString().padStart(2, "0")}:${new Date(intervalThere).getMinutes().toString().padStart(2, "0")}`}</span>
          </div>
        </div>
        <div className={classes.times}>
          <div className={classes.time}>
            <span>В ПУТИ</span>
            <span
              className={classes.duration}
            >{`${durationHoursBack.toString().padStart(2, "0")}ч ${durationMinutesBack.toString().padStart(2, "0")}м`}</span>
          </div>
          <div className={classes.time}>
            <span>В ПУТИ</span>
            <span
              className={classes.duration}
            >{`${durationHoursThere.toString().padStart(2, "0")}ч ${durationMinutesThere.toString().padStart(2, "0")}м`}</span>
          </div>
        </div>
        <div className={classes.stops}>
          <div className={classes.stopsWrapper}>
            <span className={classes.stopsQuantity}>
              {stopsThere.length > 0
                ? `${stopsThere.length} ${stopsThere.length === 1 ? "ПЕРЕСАДКА" : "ПЕРЕСАДКИ"}`
                : null}
            </span>
            <span className={classes.stopsThere}>
              {stopsThere.map((e, index, arr) => {
                if (e[index] !== e[arr.length - 1]) {
                  return `${e.toString()}, `
                }
                return e
              })}
            </span>
          </div>
          <div className={classes.stopsWrapper}>
            <span className={classes.stopsQuantity}>
              {stopsBack.length > 0
                ? `${stopsBack.length} ${stopsBack.length === 1 ? "ПЕРЕСАДКА" : "ПЕРЕСАДКИ"}`
                : null}
            </span>
            <span className={classes.stopsBack}>
              {stopsBack.map((e, index, arr) => {
                if (e[index] !== e[arr.length - 1]) {
                  return `${e.toString()}, `
                }
                return e
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
