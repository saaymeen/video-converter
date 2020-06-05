import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from "./components/organisms/sidebar";
import ConvertPage from "./pages/convert";
import DownloadPage from "./pages/download";
import GlobalStyles from "./styles/global";

// {/*<AnimatePresence exitBeforeEnter initial={false}>*/}
// 	{/*</AnimatePresence>*/}
function App() {
  return (
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
  );
}

export default App;
