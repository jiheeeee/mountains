import React from "react";
import TopAppBar from "./components/TopAppBar";
import Main from "./components/Main";

import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root:{
    width: "100%",
  },
});

const App = () => {
  return(
    <div>
      <TopAppBar/>
      <Main/>
    </div>
  );
}

export default withStyles(styles)(App);