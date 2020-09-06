import React from "react";
import { Link } from "react-router-dom";
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
    borderRadius: "0.375rem",
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
    minHeight: "350px",
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
const Login = () => {
  const classes = useStyle();

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
                    <Link className="AnchorTagStyle" to="/signup">
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                      >
                        Signup
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
              <Box className={classes.form}>
                <Box py={5}>
                  <Typography
                    variant="h4"
                    className="textBlack"
                    style={{ fontWeight: 600 }}
                  >
                    Login
                  </Typography>
                </Box>
                <Box>
                  <form noValidate autoComplete="off">
                    <Box py={1}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Email"
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </Box>
                    <Box py={1}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Password"
                        color="secondary"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </form>
                </Box>
                <Box py={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                  >
                    Sign in
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Login;
