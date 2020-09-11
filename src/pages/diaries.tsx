import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootState } from "../store/rootReducer";
import http from "../services/api";
import { Diary } from "../interfaces/diary.interface";
import { addDiary } from "../features/diary/diariesSlice";
import Swal from "sweetalert2";
import { setUser } from "../features/auth/userSlice";
import DiaryTile from "./diaryTile";
import { User } from "../interfaces/user.interface";
import { Route, Routes } from "react-router-dom";

import { showAlert } from "../util";
import { updateDiary } from "../features/diary/diariesSlice";
import { useAppDispatch } from "../store";
import dayjs from "dayjs";
import { setAuthState } from "../features/auth/authSlice";
//components
import DiariesList from "../components/diaries/diariesList";
import DiaryEdit from "../components/diaries/diaryEdit";

//mui
import {
  Container,
  Box,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
//yup and react form for validation
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

const useStyle = makeStyles((theme) => ({
  root: {
    background: "#fff",
    width: "100%",
    // padding: "20px",
  },
  addDiary: {
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

const Diaries: FC = () => {
  const classes = useStyle();
  const dispatch = useAppDispatch();

  //state for editing diary
  const [DiaryId, setDiaryId] = useState<string | undefined>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const diaries = useSelector((state: rootState) => state.diaries);
  const user = useSelector((state: rootState) => state.user);

  //only diary which need to edit or delete

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        http.get<null, Diary[]>(`diaries/${user.id}`).then((data) => {
          if (data && data.length > 0) {
            const sortedByUpdatedAt = data.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(addDiary(sortedByUpdatedAt));
          }
        });
      }
    };
    fetchDiaries();
  }, [dispatch, user, setDiaryId]);

  const Singlediary: Diary | undefined = diaries.find(
    (diary) => diary.id === DiaryId
  );

  const createDiary = async () => {
    const result: any = await Swal.mixin({
      input: "text",
      confirmButtonText: "Next →",
      showCancelButton: true,
      progressSteps: ["1", "2"],
    }).queue([
      {
        titleText: "Diary title",
        input: "text",
      },
      {
        titleText: "Private or public diary?",
        input: "radio",
        inputOptions: {
          private: "Private",
          public: "Public",
        },
        inputValue: "private",
      },
    ]);
    if (result.value) {
      const { value } = result;
      const { diary, user: _user } = await http.post<
        Partial<Diary>,
        { diary: Diary; user: User }
      >("/diaries/", {
        title: value[0],
        type: value[1],
        userId: user?.id,
      });
      if (diary && user) {
        dispatch(addDiary([diary] as Diary[]));
        dispatch(addDiary([diary] as Diary[]));
        dispatch(setUser(_user));
        return Swal.fire({
          titleText: "All done!",
          confirmButtonText: "OK!",
        });
      }
    }
    Swal.fire({
      titleText: "Cancelled",
    });
  };

  const logout = () => {
    if (user !== null) {
      dispatch(setAuthState(false));
    }
  };

  const { handleSubmit, errors, control, reset } = useForm<Diary>({
    resolver: yupResolver(schema),
  });

  //form submit funtion
  const formSubmit = async (data: Partial<Diary>) => {
    if (!isEditing) {
      const { diary, user: _user } = await http.post<
        Partial<Diary>,
        { diary: Diary; user: User }
      >("/diaries/", {
        title: data.title,
        type: data.type,
        description: data.description,
        userId: user?.id,
      });
      if (diary && user) {
        dispatch(addDiary([diary] as Diary[]));
        dispatch(setUser(_user));
      }
    } else if (isEditing) {
      const path = `/diaries/${DiaryId}`;
      http
        .put<Diary, Diary>(path, data)
        .then((diary) => {
          if (diary) {
            dispatch(updateDiary(diary));
            showAlert("Saved!", "success");
          }
        })
        .finally(() => {
          setIsEditing(false);
        });
      setIsEditing(false);
      setDiaryId("");
    }
    reset({ title: "", type: data.type });
  };

  return (
    <div>
      <div className="sectionPadding">
        <Container>
          <div className={classes.root}>
            <Grid container>
              <Grid item sm={8} style={{ width: "100%" }}>
                <Grid item className={classes.addDiary}>
                  {DiaryId === "" ? (
                    <form onSubmit={handleSubmit(formSubmit)}>
                      <Box py={1}>
                        <Controller
                          as={<TextField value="hamzah" />}
                          name="title"
                          fullWidth
                          label="Diary Title"
                          size="small"
                          color="secondary"
                          variant="outlined"
                          control={control}
                          style={{ background: "white" }}
                          helperText={errors.title?.message}
                          error={errors && errors.title && true}
                          defaultValue=""
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
                          defaultValue=""
                        />
                      </Box>
                      <Box py={1}>
                        <Controller
                          as={
                            <RadioGroup
                              row
                              aria-label="gender"
                              name="shareWith"

                              // value={value}
                              // onChange={handleChange}
                            >
                              <span>
                                <FormControlLabel
                                  value="public"
                                  control={<Radio />}
                                  label="Public"
                                />
                              </span>
                              <span>
                                <FormControlLabel
                                  value="private"
                                  control={<Radio />}
                                  label="Private"
                                />
                              </span>
                              <FormControlLabel
                                value="followers"
                                control={<Radio />}
                                label="Followers"
                              />
                            </RadioGroup>
                          }
                          name="type"
                          size="small"
                          variant="outlined"
                          color="secondary"
                          control={control}
                          defaultValue=""
                        />
                        <FormHelperText error>
                          {errors.type?.message}
                        </FormHelperText>
                      </Box>
                      <Box pt={2}>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                        >
                          Add
                        </Button>
                      </Box>
                    </form>
                  ) : (
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <DiaryEdit
                            DiaryId={DiaryId}
                            EditDiary={Singlediary}
                            setIsEditing={setIsEditing}
                            setDiaryId={setDiaryId}
                          />
                        }
                      ></Route>
                    </Routes>
                  )}
                </Grid>
                <div style={{ width: "100%" }}>
                  <DiariesList
                    diaries={diaries}
                    setDiaryId={setDiaryId}
                    setIsEditing={setIsEditing}
                    IsEditing={isEditing}
                  />
                </div>
              </Grid>
              <Grid item sm={4} container></Grid>
            </Grid>
          </div>
        </Container>
      </div>

      {/* <Routes> */}
      {/* <Route path="/diary/:id">
          <DiaryEntriesList />
        </Route> */}

      {/* {/* {diaries.map((diaries) => (
            <h1>{diaries.title}</h1>
        ))} */}
      {/* <Button onClick={createDiary}>Create New</Button>
      {diaries.map((diary, idx) => (
        <DiaryTile key={idx} diary={diary} />
      ))} */}
      {/* <Route path="/">
      </Route> */}
      {/* </Routes> */}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Diaries;
