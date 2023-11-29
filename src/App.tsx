import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Heroes from "./containers/Heroes/Heroes";
import Topbar from "./layout/Topbar";
import { Provider } from "react-redux";
import store from "./app/store";
import HeroInfo from "./containers/Heroes/HeroInfo";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Topbar />
          <Routes>
            <Route path="/" element={<Heroes />} />
            <Route path="/hero/:id" element={<HeroInfo />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
