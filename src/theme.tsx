//mui
import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#15C5AD",
      contrastText: "#fff",
    },
    secondary: {
      main: "#158FC5",
    },
  },
  typography: {
    h1: {
      fontSize: "50px",
      fontWeight: 600,
      textTransform: "capitalize",
    },
    h2: {
      fontSize: "40px",
      fontWeight: 600,
    },
    h3: {
      fontSize: "40px",
      fontWeight: 500,
    },
    h4: {
      fontSize: "30px",
      fontWeight: 500,
    },
    h5: {
      fontSize: "20px",
      fontWeight: 500,
    },
    h6: {
      fontSize: "15px",
      fontWeight: 500,
    },
  },
});
