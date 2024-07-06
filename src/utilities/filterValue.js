// eslint-disable-next-line import/no-cycle
import {
  setOne,
  setTwo,
  setThree,
  setWithout
} from "../Components/Store/combinedSlice"
// eslint-disable-next-line import/prefer-default-export, consistent-return
export const filterValue = (statement, value) => {
  switch (statement) {
    case statement.one:
      setOne(value)
      break
    case statement.two:
      setTwo(value)
      break
    case statement.three:
      setThree(value)
      break
    case statement.without:
      setWithout(value)
      break
    default:
      return value
  }
}
