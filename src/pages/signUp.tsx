import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//react form
import { useForm, Controller } from "react-hook-form";
//Yup which will be used for validation
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
//api
import http from "../services/api";
//redux slice
import { setAuthState, saveToken } from "../features/auth/authSlice";
import { setUser } from "../features/auth/userSlice";
//interface
import { User } from "../interfaces/user.interface";
import { AuthResponse } from "../services/mirage/routes/user";
//dispatch
import { useAppDispatch } from "../store/index";
//mui core
import { makeStyles } from "@material-ui/core";
//mui components
import {
  Grid,
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Hidden,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "100vh",
    minHeight: "600px",
    display: "flex",
    alignItems: "center",

    background: "#158FC5",
    [theme.breakpoints.down("sm")]: {},
  },

  mainleft: {
    minHeight: "500px",
    borderTopLeftRadius: " 0.375rem",
    borderBottomLeftRadius: " 0.375rem",
  },
  mainright: {
    borderRadius: "0.375rem",
    minHeight: "400px",
    maxWidth: "500px",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    background: "white",
  },
  form: {
    width: "100%",

    maxWidth: "500px",
    margin: "0 auto",
  },
}));

//validation schema of form
const schema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .max(16, "Username cannot be longer than 16 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password length should be greater than 8"),
  email: Yup.string()
    .email("Please provide a valid email address (abc@xy.z)")
    .required("Email is required"),
});

const SignUp: FC = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  //dispatch of redux which is custom created in store
  const dispatch = useAppDispatch();

  //for loading state
  const [loading, setLoading] = useState<boolean>(false);

  //react form hook for validation
  const { handleSubmit, errors, control } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: User) => {
    const path = "/auth/signup";
    http
      .post<User, AuthResponse>(path, data)
      .then((res) => {
        if (res) {
          const { token, user } = res;
          // dispatch(saveToken(token));
          dispatch(setUser(user));
          // dispatch(setAuthState(true));

          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Grid className={``} container alignItems="center" justify="center">
            <Hidden smDown>
              <Grid
                item
                md={6}
                className={`${classes.mainleft} `}
                container
                alignItems="center"
              >
                <Box px={3}>
                  <Box py={2}>
                    <Typography variant="h2" className="textWhite">
                      Diary App
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" className="textWhiteSecondary">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Unde animi vel expedita laborum asperiores sapiente dolore
                      sunt atque commodi, fuga quod ipsum alias eum rerum cum
                      distinctio eligendi aliquam consectetur?
                    </Typography>
                  </Box>
                  <Box py={2}>
                    <Link className="AnchorTagStyle" to="/">
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                      >
                        Sign in
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Grid>
            </Hidden>
            <Grid
              item
              md={6}
              className={`${classes.mainright}`}
              container
              alignItems="center"
              justify="center"
            >
              <Box px={5} className={classes.form}>
                <Box py={3}>
                  <Typography
                    variant="h4"
                    className="textBlack"
                    style={{ fontWeight: 600 }}
                  >
                    Signup
                  </Typography>
                </Box>
                <Box>
                  <form
                    onSubmit={handleSubmit(submitForm)}
                    noValidate
                    autoComplete="off"
                  >
                    <Box py={1}>
                      <Controller
                        as={<TextField />}
                        name="username"
                        fullWidth
                        label="Username"
                        size="small"
                        color="secondary"
                        variant="outlined"
                        helperText={errors.username?.message}
                        error={errors && errors.username && true}
                        control={control}
                        defaultValue=""
                      />
                    </Box>
                    <Box py={1}>
                      <Controller
                        as={<TextField />}
                        name="email"
                        fullWidth
                        label="Email"
                        size="small"
                        color="secondary"
                        variant="outlined"
                        helperText={errors.email?.message}
                        error={errors && errors.email && true}
                        control={control}
                        defaultValue=""
                      />
                    </Box>
                    <Box py={1}>
                      <Controller
                        as={<TextField />}
                        name="password"
                        fullWidth
                        label="Password"
                        size="small"
                        color="secondary"
                        variant="outlined"
                        type="password"
                        helperText={errors.password?.message}
                        error={errors && errors.password && true}
                        control={control}
                        defaultValue=""
                      />
                    </Box>
                    <Box py={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disableElevation
                        disabled={loading}
                      >
                        Signup
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default SignUp;
