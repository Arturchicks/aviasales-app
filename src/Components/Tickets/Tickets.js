import { useSelector } from "react-redux"
import { nanoid } from "nanoid"
import Ticket from "../Ticket/Ticket"
export default function Tickets() {
  const { value, counter } = useSelector((state) => state)
  if (value) {
    return value
      .map((e) => {
        return (
          <Ticket
            key={nanoid()}
            price={e.price}
            iata={e.carrier}
            originThere={e.segments[0].origin}
            routeThere={e.segments[0].destination}
            dateThere={e.segments[0].date}
            durationThere={e.segments[0].duration}
            originBack={e.segments[1].origin}
            routeBack={e.segments[1].destination}
            dateBack={e.segments[1].date}
            durationBack={e.segments[1].duration}
            stopsThere={e.segments[0].stops}
            stopsBack={e.segments[1].stops}
          />
        )
      })
      .toSpliced(counter)
  }
}
