import React, { FC, lazy, Suspense } from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
//theme
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
//reducer type
import { rootState } from "./store/rootReducer";
//pages
const Login = lazy(() => import("./pages/index"));
const SignUp = lazy(() => import("./pages/signUp"));
const Home = lazy(() => import("./pages/home"));

const App: FC = () => {
  const isLoggedIn = useSelector(
    (state: rootState) => state.auth.isAuthenticated
  );
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<p>loading</p>}>
            <Routes>
              {isLoggedIn ? (
                <Route path="/" element={<Home />}></Route>
              ) : (
                <Route path="/" element={<Login />}></Route>
              )}
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="*" element={<Login />}></Route>
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
