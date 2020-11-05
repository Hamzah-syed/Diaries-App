import React, { FC } from "react";
//Yup
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
//api
import http from "../../services/api";
//mui
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@material-ui/core";
//redux
import { useAppDispatch } from "../../store";
// reack-hook-form
import { useForm, Controller } from "react-hook-form";
import { updateDiary } from "../../features/diary/diariesSlice";
// interfaces
import { Diary } from "../../interfaces/diary.interface";
//sweetAlert
import { showAlert } from "../../util";

//validation schema
const schema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title length should be less than 50"),
  description: Yup.string().max(
    100,
    "description length should be less than 100"
  ),
  type: Yup.string().required("Kindly select any of the following"),
});

//interface
interface props {
  DiaryId: string | undefined;
  EditDiary: Diary | undefined;
  setDiaryId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiaryEdit: FC<props> = ({
  DiaryId,
  EditDiary,
  setDiaryId,
  setIsEditing,
}) => {
  const dispatch = useAppDispatch();

  const { handleSubmit, errors, control, reset } = useForm<Diary>({
    resolver: yupResolver(schema),
  });

  //form submit funtion
  const formSubmit = async (data: Partial<Diary>) => {
    const path = `/diaries/${DiaryId}`;
    http
      .put<Diary, Diary>(path, data)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
          showAlert("Diary updated successfully!", "success");
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
    setIsEditing(false);
    setDiaryId("");
    // reset({ title: "", description: "", type: data.type });
  };

  return (
    <div>
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
            defaultValue={!!EditDiary && EditDiary.title}
          />{" "}
        </Box>

        <Box py={1}>
          <Controller
            as={<TextField />}
            name="description"
            label="Description (Optional)"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            color="secondary"
            style={{ background: "white" }}
            control={control}
            helperText={errors.description?.message}
            error={errors && errors.description && true}
            defaultValue={!!EditDiary && EditDiary.description}
          />
        </Box>
        <Box py={1}>
          <Controller
            as={
              <RadioGroup row aria-label="gender">
                <span>
                  <FormControlLabel
                    value="public"
                    control={<Radio />}
                    label="Public"
                  />
                </span>
                <span>
                  <FormControlLabel
                    spellCheck
                    value="private"
                    control={<Radio />}
                    label="Private"
                  />
                </span>
              </RadioGroup>
            }
            name="type"
            size="small"
            variant="outlined"
            color="secondary"
            control={control}
            defaultValue=""
          />
          <FormHelperText error>{errors.type?.message}</FormHelperText>
        </Box>
        <Box pt={2}>
          <Button variant="contained" type="submit" color="primary">
            Update
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default DiaryEdit;
