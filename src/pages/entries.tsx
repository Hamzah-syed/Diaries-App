import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
//mui
import { makeStyles } from "@material-ui/core";
import { Box, Container, Grid, Hidden } from "@material-ui/core";
//components
import AddEntries from "../components/entries/addEntries";
import EntriesList from "../components/entries/entriesList";
//inderface
import { Entry } from "../interfaces/entry.interface";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    // padding: "20px",
  },
}));

const Entries = () => {
  const classes = useStyle();
  const [rerender, setRerender] = useState<Boolean>(false);

  return (
    <div className="sectionPadding">
      <Container>
        <div className={classes.root}>
          <Grid container>
            <Grid item sm={8} xs={12} container>
              <Grid direction="column" container item sm={12}>
                <AddEntries setRerender={setRerender} />

                <EntriesList setRerender={setRerender} rerender={rerender} />
              </Grid>
            </Grid>
            <Grid item sm={4} container>
              <Hidden xsDown>hamzah</Hidden>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Entries;
