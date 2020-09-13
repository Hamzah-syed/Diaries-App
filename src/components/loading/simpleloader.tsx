import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function Simpleloader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}
