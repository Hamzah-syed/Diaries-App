import React, { FC } from "react";
//mui
import {
  makeStyles,
  Box,
  Grid,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import { User } from "../interfaces/user.interface";
import { Diary } from "../interfaces/diary.interface";
//interfaces

const mystyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: "30px",
  },
  cardParent: {
    background: "#f9f9f9",
    padding: "25px",
    borderRadius: "0.5rem",
  },
  card: {
    display: "flex",
  },
  diaryUser: {},
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    backgroundColor: theme.palette.secondary.main,
  },
  divider: {
    height: "1px",
    width: "100%",
    background: "#D2D2D2",
    margin: "20px 0",
  },
}));

interface props {
  diaries: Diary[];
}

const DiariesList: FC<props> = ({ diaries }) => {
  console.log(diaries);
  const classes = mystyle();
  return (
    <div>
      <div>
        <Grid container>
          <div className={classes.root}>
            <Grid item md={6}>
              <div className={classes.cardParent}>
                <div className={classes.card}>
                  <div className={`${classes.diaryUser}`}>
                    <Avatar className={classes.large}>N</Avatar>
                  </div>
                  <div className={`${classes.diaryUser}`}>
                    <Box pl={3}>
                      <Box>
                        <Typography
                          variant="h5"
                          className="textBlackSecondary"
                          style={{
                            fontWeight: 600,
                            textTransform: "capitalize",
                          }}
                        >
                          Hamzah Syed
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          style={{ color: "#B7B7B7" }}
                        >
                          hamzah@abc.com
                        </Typography>
                      </Box>
                      <Box py={1}>
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          disableElevation
                          style={{ fontSize: "10px" }}
                        >
                          Follow
                        </Button>
                        {/* <Typography
                        variant="subtitle2"
                        style={{ color: "#B7B7B7" }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis quas expedita ex similique optio! Velit et
                        ducimus debitis iusto, est beatae eius suscipit
                      </Typography> */}
                      </Box>
                    </Box>
                  </div>
                </div>
                <div className={classes.divider}></div>
                <div>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      style={{ textTransform: "capitalize" }}
                    >
                      Public
                    </Typography>
                    <Typography
                      variant="h5"
                      className="textBlackSecondary"
                      style={{
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    >
                      Hamzah Syed
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      style={{ color: "#B7B7B7" }}
                    >
                      CreatedAt:{" "}
                    </Typography>
                  </Box>
                  <Box py={2}>
                    <Typography
                      variant="subtitle2"
                      style={{ color: "#B7B7B7" }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corporis quas expedita ex similique optio! Velit et
                      ducimus debitis iusto, est beatae eius suscipit
                    </Typography>
                  </Box>
                  <Box py={1}>
                    <Button
                      color="secondary"
                      variant="contained"
                      disableElevation
                      style={{ fontSize: "12px", marginRight: "10px" }}
                    >
                      Add Note
                    </Button>

                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                      style={{ fontSize: "12px" }}
                    >
                      All Notes ()
                    </Button>
                  </Box>
                </div>
              </div>
            </Grid>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default DiariesList;
