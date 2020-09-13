import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Avatar, Container, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
//redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { rootState } from "../../store/rootReducer";
import { setAuthState, clearToken } from "../../features/auth/authSlice";
import { setUser } from "../../features/auth/userSlice";
//logo
import Logo from "../../assets/images/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    textDecoration: "none",
    color: "rgb(60,60,60)",
  },
  avatar: {
    background: theme.palette.secondary.main,
  },
  username: {
    display: "inline",
    textTransform: "capitalize",
  },
}));

export default function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useSelector((state: rootState) => state);
  const { isAuthenticated } = useSelector((state: rootState) => state.auth);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(setUser(null));
    dispatch(setAuthState(false));
    dispatch(clearToken());
    navigate("/");
  };
  return (
    <div className={classes.root}>
      {isAuthenticated ? (
        <AppBar
          position="static"
          style={{
            background: "#F9F9F9",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Container>
            <Toolbar>
              <img src={Logo} width="60px" height="60px" alt="diary" />
              <Typography
                variant="h5"
                className={` textBlackSecondary ${classes.title}`}
              >
                <Link to="/" className={classes.titleLink}>
                  DiaryApp
                </Link>
              </Typography>

              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  style={{ textTransform: "capitalize" }}
                >
                  <Avatar className={classes.avatar}>
                    {user?.username.charAt(0)}
                  </Avatar>
                </IconButton>
                <Typography
                  className={`textBlackSecondary ${classes.username}`}
                >
                  {user?.username}
                </Typography>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  style={{ position: "absolute", top: "50px", left: "15px" }}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      ) : null}
    </div>
  );
}
