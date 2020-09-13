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

  return (
    <div>
      <div className="diary-tile">
        <h2
          className="title"
          title="Click to edit"
          onClick={() => setIsEditing(true)}
          style={{
            cursor: "pointer",
          }}
        >
          {isEditing ? (
            <input
              value={diary.title}
              onChange={(e) => {
                setDiary({
                  ...diary,
                  title: e.target.value,
                });
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  saveChanges();
                }
              }}
            />
          ) : (
            <span>{diary.title}</span>
          )}
        </h2>
        <p className="subtitle">{totalEntries ?? "0"} saved entries</p>
        <div style={{ display: "flex" }}>
          <button
            onClick={() => {
              // dispatch(setCanEdit(true));
              // // dispatch(setActiveDiary(diary.id as string));
              // dispatch(setcurrentlyEditting(null));
            }}
          >
            Add New Entry
          </button>
          <Link to={`diary/${diary.id}`} style={{ width: "100%" }}>
            <button className="secondary">View all →</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiaryTile;
