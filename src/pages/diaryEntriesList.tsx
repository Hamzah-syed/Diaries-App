import React, { FC, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "../store/rootReducer";
import http from "../services/api";
import { Entry } from "../interfaces/entry.interface";
import { addEntry } from "../features/entry/entriesSlice";
import {
  setcurrentlyEditting,
  setCanEdit,
} from "../features/entry/editorSlice";
import dayjs from "dayjs";
import { useAppDispatch } from "../store";
//mui
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  [theme.breakpoints.down("md")]: {
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    background: "white",
  },
}));

const DiaryEntriesList: FC = () => {
  const { entries } = useSelector((state: rootState) => state);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
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
  }, [id, dispatch]);

  const classes = useStyle();
  return (
    <div>
      <div className="entries">
        <header>
          <Link to="/">
            <h3>← Go Back</h3>
          </Link>
        </header>
        <ul>
          {entries.map((entry) => (
            <li
              key={entry.id}
              onClick={() => {
                dispatch(setcurrentlyEditting(entry));
                dispatch(setCanEdit(true));
              }}
            >
              {entry.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiaryEntriesList;
