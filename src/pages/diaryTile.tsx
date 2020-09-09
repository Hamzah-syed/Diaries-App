import React, { FC, useState } from "react";
import { Diary } from "../interfaces/diary.interface";
import http from "../services/api";
import { updateDiary } from "../features/diary/diariesSlice";
import {
  setCanEdit,
  setActiveDiary,
  setcurrentlyEditting,
} from "../features/entry/editorSlice";
import { showAlert } from "../util";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store";
//mui
import { makeStyles } from "@material-ui/core";

//interface
interface props {
  diary: Diary;
}

const useStyle = makeStyles((theme) => ({
  [theme.breakpoints.down("md")]: {
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    background: "white",
  },
}));

const DiaryTile: FC<props> = (props) => {
  const classes = useStyle();
  const [diary, setDiary] = useState(props.diary);
  const [isEditing, setIsEditing] = useState(false);
  //dispatch
  const dispatch = useAppDispatch();

  const totalEntries = props.diary.entryIds?.length;

  const saveChanges = () => {
    const path = `/diaries/${diary.id}`;
    http
      .put<Diary, Diary>(path, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
          showAlert("Saved!", "success");
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return <div></div>;
};

export default DiaryTile;
