import React, { FC } from "react";
//Yup
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
//api
import http from "../../services/api";
//mui
import {
  makeStyles,
  Box,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  Typography,
} from "@material-ui/core";
//redux
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { rootState } from "../../store/rootReducer";
import { updateEntry } from "../../features/entry/entriesSlice";
import { setcurrentlyEditting } from "../../features/entry/editorSlice";

// reack-hook-form
import { useForm, Controller } from "react-hook-form";
import { updateDiary } from "../../features/diary/diariesSlice";
// interfaces
import { Diary } from "../../interfaces/diary.interface";
//sweetAlert
import { showAlert } from "../../util";
import { Entry } from "../../interfaces/entry.interface";

const useStyle = makeStyles((theme) => ({
  EditEntry: {
    width: "100%",
    background: "#F9F9F9",
    borderRadius: "7px",
    padding: "30px 30px",
  },
}));
//validation schema
const schema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title length should be less than 50"),
  description: Yup.string().max(
    100,
    "description length should be less than 100"
  ),
});

// interface;
interface props {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EntryEdit: FC<props> = ({ setIsEditing }) => {
  const classes = useStyle();
  const dispatch = useAppDispatch();

  //ENTRY WHICH NEED TO BE EDIT
  const { currentlyEditting: entry, canEdit } = useSelector(
    (state: rootState) => state.editor
  );

  const { handleSubmit, errors, control, reset } = useForm<Entry>({
    resolver: yupResolver(schema),
  });

  //form submit funtion
  // const {id} = currentlyEditting
  const formSubmit = async (data: Partial<Entry>) => {
    const id = entry?.id;
    const path = `diaries/entry/${id}`;

    http
      .put<Entry, Entry>(path, data)
      .then((_entry) => {
        if (_entry != null) {
          dispatch(setcurrentlyEditting(_entry));
          dispatch(updateEntry(_entry));
          showAlert("Entry updated successfully", "success");
        }
      })
      .finally(() => {
        setIsEditing(false);
        reset();
      });
  };

  return (
    <div>
      <Grid item className={classes.EditEntry}>
        <Box pb={2}>
          <Typography
            variant="h5"
            className="textBlackSecondary"
            style={{ fontWeight: 600 }}
          >
            Edit Entry
          </Typography>
        </Box>
        <button onClick={() => setIsEditing(false)}>Edit</button>
        <form onSubmit={handleSubmit(formSubmit)} id="editForm">
          <Box py={1}>
            <Controller
              as={<TextField value="hamzah" />}
              name="title"
              fullWidth
              label="Diary "
              size="small"
              color="secondary"
              variant="outlined"
              control={control}
              style={{ background: "white" }}
              helperText={errors.title?.message}
              error={errors && errors.title && true}
              defaultValue={!!entry && entry.title}
            />{" "}
          </Box>

          <Box py={1}>
            <Controller
              as={<TextField />}
              name="content"
              label="Description (Optional)"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              color="secondary"
              style={{ background: "white" }}
              control={control}
              helperText={errors.content?.message}
              error={errors && errors.content && true}
              defaultValue={!!entry && entry.content}
            />
          </Box>

          <Box pt={2}>
            <Button variant="contained" type="submit" color="primary">
              Update
            </Button>
          </Box>
        </form>
      </Grid>
    </div>
  );
};

export default EntryEdit;
