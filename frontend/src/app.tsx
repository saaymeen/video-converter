import React, { useReducer } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import useCombinedReducers from "use-combined-reducers";

import Sidebar from "./components/organisms/sidebar";
import ConvertPage from "./pages/convert";
import DownloadPage from "./pages/download";
import GlobalStyles from "./styles/global";
import { Provider } from "react-redux";

import store from "./services/state/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyles />
        <Sidebar />
        <Route
          render={({ location }) => (
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={ConvertPage} />
              <Route exact path="/download" component={DownloadPage} />
            </Switch>
          )}
        />
      </Router>
    </Provider>
  );
}

export default App;
