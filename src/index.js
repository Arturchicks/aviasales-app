import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./Components/App/App"
import store from "./utilities/store"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
