import React from "react";
import { Link } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { rootState } from "../../store/rootReducer";
//mui
import { Button, makeStyles } from "@material-ui/core";
import { Box, Grid, Typography, Avatar } from "@material-ui/core";
//date
import dayjs from "dayjs";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  diaryCard: {
    width: "100%",
    background: "#F9F9F9",
    borderRadius: "8px",
  },
  underline: {
    background: theme.palette.primary.main,
    height: "5px",
    width: "50px",
  },
  divider: {
    height: "1px",
    width: "100%",
    background: "#D2D2D2",
    margin: "20px 0",
  },
  cardParent: {
    background: "#f9f9f9",
    paddingTop: "5px",
    borderRadius: "0.5rem",
  },
  card: {
    display: "flex",
    width: "100%",
  },

  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    backgroundColor: theme.palette.primary.main,
  },
}));

const DiaryEntry = () => {
  const classes = useStyle();
  const { activeDiary } = useSelector((state: rootState) => state.editor);

  return (
    <div className={classes.root}>
      <Grid container>
        <Box py={4} px={3} className={classes.diaryCard}>
          <Box pb={1}>
            <Typography style={{ fontWeight: 600 }} variant="h4">
              Diary
            </Typography>
            <div className={classes.underline}></div>
          </Box>

          <Box pt={3}>
            <Typography
              style={{ fontWeight: 600, textTransform: "capitalize" }}
              variant="h5"
              className="textBlackSecondary"
            >
              {activeDiary?.title}
            </Typography>
            <Typography style={{ color: "#B7B7B7" }} variant="subtitle2">
              CreatedAt: {dayjs(activeDiary?.createdAt).format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Box pt={1}>
            <Typography variant="subtitle1" style={{ color: "#B7B7B7" }}>
              {activeDiary?.description === ""
                ? "No Description"
                : activeDiary?.description}
            </Typography>
          </Box>
          <Box pt={2}>
            <Link to={"/"}>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                style={{ fontSize: "12px", textDecoration: "none" }}
              >
                All Diaries
              </Button>
            </Link>
          </Box>
          <div className={classes.divider}></div>
          {/* user Info */}
          <div className={classes.cardParent}>
            <div className={classes.card}>
              <div>
                <Avatar
                  className={classes.large}
                  style={{ textTransform: "uppercase" }}
                >
                  {activeDiary?.username.charAt(0)}
                </Avatar>
              </div>
              <div>
                <Box pl={2}>
                  <Box>
                    <Typography
                      variant="h5"
                      className="textBlackSecondary"
                      style={{
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    >
                      {activeDiary?.username}
                      {/* {diaries.username} */}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      style={{ color: "#B7B7B7" }}
                    >
                      {activeDiary?.email}
                    </Typography>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        </Box>
      </Grid>
    </div>
  );
};

export default DiaryEntry;
