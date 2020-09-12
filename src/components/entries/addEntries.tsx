import React, { FC } from "react";
import { useParams } from "react-router-dom";
//mui
import { makeStyles } from "@material-ui/core";
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Diary } from "../../interfaces/diary.interface";
import { Entry } from "../../interfaces/entry.interface";
//api
import http from "../../services/api";
//redux
import { setcurrentlyEditting } from "../../features/entry/editorSlice";
import { updateDiary } from "../../features/diary/diariesSlice";
import { useAppDispatch } from "../../store";
import { showAlert } from "../../util";

const useStyle = makeStyles((theme) => ({
  root: {
    background: "#fff",
    width: "100%",
  },
  addEntry: {
    width: "100%",
    background: "#F9F9F9",
    borderRadius: "7px",
    padding: "30px 30px",
  },
  textFeild: {
    width: "100%",
    backgorund: "white",
    padding: "12px 15px",
    borderRadius: "5px",
    border: "none",
    "&:focus": {
      outline: "red",
      border: "red",
    },
  },
  [theme.breakpoints.down("md")]: {
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    background: "white",
  },
}));

const schema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title length should be less than 50"),
  content: Yup.string()
    .max(1000, "description length should be less than 1000")
    .required("Description is required"),
});

const AddEntries: FC = () => {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { handleSubmit, errors, control, reset } = useForm<Entry>({
    resolver: yupResolver(schema),
  });

  //form submit funtion
  const formSubmit = (data: Partial<Entry>) => {
    const path = `/diaries/entry/${id}`;
    http
      .post<Entry, { diary: Diary; entry: Entry }>(path, data)
      .then((entry) => {
        if (data != null) {
          showAlert("Entry added successfully", "success");
          const { diary, entry: _entry } = entry;
          dispatch(setcurrentlyEditting(_entry));
          dispatch(updateDiary(diary));
        }
      });
    reset({ title: "", content: "" });
  };

  return (
    <div>
      <Grid item className={classes.addEntry}>
        <Box pb={2}>
          <Typography
            variant="h5"
            className="textBlackSecondary"
            style={{ fontWeight: 600 }}
          >
            Add Entry
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(formSubmit)}>
          <Box py={1}>
            <Controller
              as={<TextField />}
              name="title"
              fullWidth
              label="Entry Title"
              size="small"
              color="secondary"
              variant="outlined"
              control={control}
              style={{ background: "white" }}
              helperText={errors.title?.message}
              error={errors && errors.title && true}
              defaultValue=""
            />
          </Box>
          <Box py={1}>
            <Controller
              as={<TextField />}
              name="content"
              label="Description "
              fullWidth
              multiline
              value="haz"
              rows={4}
              variant="outlined"
              color="secondary"
              defaultValue=""
              style={{ background: "white" }}
              control={control}
              helperText={errors.content?.message}
              error={errors && errors.content && true}
            />
          </Box>

          <Box pt={2}>
            <Button variant="contained" type="submit" color="primary">
              Add
            </Button>
          </Box>
        </form>
      </Grid>
    </div>
  );
};

export default AddEntries;
