import React, { FC } from "react";
//dayjs
import dayjs from "dayjs";
//useDispatch for updating diaries
import { useAppDispatch } from "../../store";

//mui
import {
  makeStyles,
  Box,
  Grid,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
//interfaces
import { Diary } from "../../interfaces/diary.interface";

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
    width: "100%",
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

//props interface
interface props {
  diaries: Diary[];
  setDiaryId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiariesList: FC<props> = ({ diaries, setDiaryId, setIsEditing }) => {
  const classes = mystyle();
  //sorting diaries data according to updatedDate
  const sortedByUpdatedAt = diaries.slice().sort((a, b) => {
    return dayjs(b.updatedAt).isAfter(dayjs(a.updatedAt)) ? 1 : -1;
  });
  //for updating diary
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <div className={classes.root}>
          <Grid container spacing={2}>
            {!!sortedByUpdatedAt &&
              sortedByUpdatedAt.map((diaries: Diary, i: number) => (
                <Grid item md={6} key={i}>
                  <div className={classes.cardParent}>
                    <div className={classes.card}>
                      <div className={`${classes.diaryUser}`}>
                        <Avatar className={classes.large}>
                          {diaries.username.charAt(0)}
                        </Avatar>
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
                              {diaries.username}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              style={{ color: "#B7B7B7" }}
                            >
                              {diaries.email}
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
                          {diaries.type}
                        </Typography>
                        <Typography
                          variant="h5"
                          className="textBlackSecondary"
                          style={{
                            fontWeight: 600,
                            textTransform: "capitalize",
                          }}
                        >
                          {diaries.title}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          style={{ color: "#B7B7B7" }}
                        >
                          CreatedAt:{" "}
                          {dayjs(diaries.createdAt).format("DD/MM/YYYY")}
                        </Typography>
                      </Box>
                      <Box py={2}>
                        <Typography
                          variant="subtitle2"
                          style={{ color: "#B7B7B7" }}
                        >
                          {diaries.description === ""
                            ? "No Description"
                            : diaries.description}
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
                        <Button
                          color="primary"
                          variant="contained"
                          disableElevation
                          onClick={() => {
                            setDiaryId(diaries.id);
                            setIsEditing(true);
                          }}
                          style={{ fontSize: "12px" }}
                        >
                          <a
                            style={{ textDecoration: "none", color: "white" }}
                            href="#editForm"
                          >
                            edit
                          </a>
                        </Button>
                      </Box>
                    </div>
                  </div>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default DiariesList;
