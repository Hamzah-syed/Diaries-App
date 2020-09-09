import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { rootState } from "../store/rootReducer";
import Markdown from "markdown-to-jsx";
import http from "../services/api";
import { Entry } from "../interfaces/entry.interface";
import { Diary } from "../interfaces/diary.interface";
import {
  setcurrentlyEditting,
  setCanEdit,
} from "../features/entry/editorSlice";
import { updateDiary } from "../features/diary/diariesSlice";
import { updateEntry } from "../features/entry/entriesSlice";
import { showAlert } from "../util";
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
const Editor: FC = () => {
  const classes = useStyle();

  const { currentlyEditting: entry, canEdit, activeDiaryId } = useSelector(
    (state: rootState) => state.editor
  );
  //state
  const [editedEntry, updateEditedEntry] = useState(entry);
  //dispatch
  const dispatch = useAppDispatch();

  const saveEntry = async () => {
    if (activeDiaryId === null) {
      return showAlert("Please select diary.", "warning");
    }

    if (entry === null) {
      const path = `/diaries/entry/${activeDiaryId}`;
      http
        .post<{ diary: Diary; entry: Entry }>(path, editedEntry)
        .then((data) => {
          if (data != null) {
            const { diary, entry: _entry } = data.data;
            dispatch(setcurrentlyEditting(_entry));
            dispatch(updateDiary(diary));
          }
        });
    } else {
      const path = `/diaries/entries/${entry.id}`;
      http.put<Entry, Entry>(path, editedEntry).then((_entry) => {
        if (_entry != null) {
          dispatch(setcurrentlyEditting(_entry));
          dispatch(updateEntry(_entry));
        }
      });
    }

    dispatch(setCanEdit(false));
  };
  useEffect(() => {
    updateEditedEntry(entry);
  }, [entry]);

  console.log(entry);
  return (
    <div>
      <h1 onClick={saveEntry}>hamzah</h1>
    </div>
  );
};

export default Editor;