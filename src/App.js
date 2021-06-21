import React, { Component, useEffect, useState } from "react";
import TopAppBar from "./components/TopAppBar";
import Main from "./components/Main";

import { withStyles } from "@material-ui/core";
import Container from '@material-ui/core/Container';

const styles = theme => ({
  root:{
    width: "100%",
  },
});

const App = (props) => {
  const {classes} = props;
  const [category, setCategory] = useState('CE7');
  useEffect(() => { 
    //Render
  }, []);
  
  return(
    <div>
      <TopAppBar/>
      <Main/>
    </div>
  );
}

export default withStyles(styles)(App);