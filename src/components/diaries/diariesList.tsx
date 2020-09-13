import React, { FC } from "react";
import { useSelector } from "react-redux";
//dayjs
import dayjs from "dayjs";
//useDispatch for updating diaries
import { useAppDispatch } from "../../store";
import { setActiveDiary } from "../../features/entry/editorSlice";
//ReactROuter
import { Link } from "react-router-dom";

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
//root reducer Type
import { rootState } from "../../store/rootReducer";

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
  IsEditing: boolean;
}

const DiariesList: FC<props> = ({
  diaries,
  setDiaryId,
  setIsEditing,
  IsEditing,
}) => {
  const classes = mystyle();
  //dispatch
  const dispatch = useAppDispatch();
  //sorting diaries data according to updatedDate
  const sortedByUpdatedAt = diaries.slice().sort((a, b) => {
    return dayjs(b.updatedAt).isAfter(dayjs(a.updatedAt)) ? 1 : -1;
  });

  //User stored in redux
  const user = useSelector((state: rootState) => state.user);

  return (
    <div>
      <div>
        <div className={classes.root}>
          <Grid container style={{ width: "100%", margin: 0 }} spacing={2}>
            {!!sortedByUpdatedAt &&
              sortedByUpdatedAt.map((diaries: Diary, i: number) => (
                <Grid item md={6} xs={12} key={i}>
                  <div className={classes.cardParent}>
                    <div className={classes.card}>
                      <div className={`${classes.diaryUser}`}>
                        <Avatar
                          className={classes.large}
                          style={{ textTransform: "uppercase" }}
                        >
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
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`diary/${diaries.id}`}
                        >
                          <Button
                            color="secondary"
                            variant="contained"
                            disableElevation
                            style={{ fontSize: "12px", marginRight: "10px" }}
                            onClick={() => dispatch(setActiveDiary(diaries))}
                          >
                            Notes (
                            {!!diaries.entryIds && diaries.entryIds.length
                              ? diaries.entryIds?.length
                              : 0}
                            )
                          </Button>
                        </Link>

                        {user?.id === diaries.userId && !IsEditing ? (
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
                              Edit
                            </a>
                          </Button>
                        ) : (
                          ""
                        )}
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
