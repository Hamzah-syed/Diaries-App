import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//dayjs
import dayjs from "dayjs";
//redux
import { addEntry } from "../../features/entry/entriesSlice";
import { useAppDispatch } from "../../store";

//root reducer Type
import { rootState } from "../../store/rootReducer";
//api
import http from "../../services/api";

//mui
import { makeStyles, Box, Grid, Typography, Button } from "@material-ui/core";
//interfaces

import { Entry } from "../../interfaces/entry.interface";

const mystyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: "20px",
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
    marginTop: "10px 0",
  },
}));

//props interface
// interface props {
//   diaries: Diary[];
//   setDiaryId: React.Dispatch<React.SetStateAction<string | undefined>>;
//   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
//   IsEditing: boolean;
// }

//interface
interface props {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  IsEditing: Boolean;
}

const EntriesList: FC<props> = ({ setIsEditing, IsEditing }) => {
  const classes = mystyle();
  const dispatch = useAppDispatch();
  const { entries } = useSelector((state: rootState) => state);
  //   const { setcurrentlyEditting } = useSelector((state: rootState) => state);
  const { id } = useParams();
  const { currentlyEditting: entry } = useSelector(
    (state: rootState) => state.editor
  );

  useEffect(() => {
    const fetchDiaries = async () => {
      if (id != null) {
        http
          .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
          .then(({ entries: _entries }) => {
            if (_entries) {
              const sortByLastUpdated = _entries.sort((a, b) => {
                return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
              });
              dispatch(addEntry(sortByLastUpdated));
            }
          });
      }
    };
    fetchDiaries();
  }, [id, dispatch, entry]);

  //sorting diaries data according to updatedDate
  //   const sortedByUpdatedAt = diaries.slice().sort((a, b) => {
  //     return dayjs(b.updatedAt).isAfter(dayjs(a.updatedAt)) ? 1 : -1;
  //   });

  //User stored in redux

  return (
    <div>
      <div>
        <div className={classes.root}>
          <Grid container style={{ width: "100%", margin: 0 }} spacing={2}>
            {!!entries &&
              entries.map((entries: Entry, i: number) => (
                <Grid item md={12} xs={12} key={i}>
                  <div className={classes.cardParent}>
                    <div>
                      <Box>
                        <Typography
                          variant="h5"
                          className="textBlackSecondary"
                          style={{
                            fontWeight: 600,
                            textTransform: "capitalize",
                          }}
                        >
                          {entries.title}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          style={{ color: "#B7B7B7" }}
                        >
                          CreatedAt:{" "}
                          {dayjs(entries.createdAt).format("DD/MM/YYYY")}
                        </Typography>
                      </Box>
                      <Box py={2}>
                        <Typography
                          variant="subtitle2"
                          style={{ color: "#B7B7B7" }}
                        >
                          {entries.content === ""
                            ? "No Description"
                            : entries.content}
                        </Typography>
                      </Box>
                      {!IsEditing ? (
                        <Box py={1}>
                          <Button
                            onClick={() => setIsEditing(true)}
                            color="secondary"
                            variant="contained"
                            disableElevation
                            style={{ fontSize: "12px", marginRight: "10px" }}
                          >
                            <a
                              style={{ textDecoration: "none", color: "white" }}
                              href="#editForm"
                            >
                              Edit
                            </a>
                          </Button>
                        </Box>
                      ) : null}
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

export default EntriesList;
