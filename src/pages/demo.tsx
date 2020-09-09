import React from "react";
//mui
import { makeStyles } from "@material-ui/core";
//mui
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
import { Diary } from "../interfaces/diary.interface";

const useStyle = makeStyles((theme) => ({
  root: {
    background: "#fff",
    width: "100%",
    padding: "20px",
  },
  addDiary: {
    width: "100%",
    background: "#F9F9F9",
    borderRadius: "7px",
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
  description: Yup.string().max(
    255,
    "description length should be less than 255"
  ),
  shareWith: Yup.string().required("Kindly select any of the following"),
});

const Demo = () => {
  const classes = useStyle();

  const { handleSubmit, errors, control } = useForm<Diary>({
    resolver: yupResolver(schema),
  });

  //form submit funtion
  const formSubmit = (data: Partial<Diary>) => {
    console.log(data);
  };
  return (
    <div className="sectionPadding">
      <Container>
        <div className={classes.root}>
          <Grid container>
            <Grid item md={8} container>
              <Box py={5} px={4} className={classes.addDiary}>
                <form onSubmit={handleSubmit(formSubmit)}>
                  <Box py={1}>
                    <Controller
                      as={<TextField />}
                      name="title"
                      fullWidth
                      label="Title"
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
                    {/* <Controller
                      as={
                        <Select native >
                          <option aria-label="None" value="Share With" />
                          <option value={10}>Ten</option>
                          <option value={20}>Twenty</option>
                          <option value={30}>Thirty</option>
                        </Select>
                      }
                      name="shareWith"
                      size="small"
                      variant="outlined"
                      color="secondary"
                      style={{ background: "white", width: "50%" }}
                      control={control}
                      defaultValue=""
                    /> */}
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
                      name="shareWith"
                      size="small"
                      variant="outlined"
                      color="secondary"
                      control={control}
                      defaultValue=""
                    />
                  </Box>
                  <Box pt={2}>
                    <Button variant="contained" type="submit" color="primary">
                      Add
                    </Button>
                  </Box>
                </form>
              </Box>
            </Grid>
            <Grid item md={4} container></Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Demo;
