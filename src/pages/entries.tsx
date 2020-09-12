import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
//mui
import { makeStyles } from "@material-ui/core";
import { Box, Container, Grid, Hidden } from "@material-ui/core";
//components
import AddEntries from "../components/entries/addEntries";
import EntriesList from "../components/entries/entriesList";
import EntryEdit from "../components/entries/editEntry";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    // padding: "20px",
  },
}));

const Entries = () => {
  const classes = useStyle();
  //isEditing

  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <div className="sectionPadding">
      <Container>
        <div className={classes.root}>
          <Grid container>
            <Grid item sm={8} xs={12} container>
              <Grid direction="column" container item sm={12}>
                {!isEditing ? (
                  <AddEntries />
                ) : (
                  <Routes>
                    <Route
                      path="/"
                      element={<EntryEdit setIsEditing={setIsEditing} />}
                    ></Route>
                  </Routes>
                )}
                <EntriesList setIsEditing={setIsEditing} />
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
