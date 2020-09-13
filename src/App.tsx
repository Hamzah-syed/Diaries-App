import React, { FC, lazy, Suspense } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
//theme
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
//reducer type
import { rootState } from "./store/rootReducer";
//nav
import Header from "./components/layout/header";
//footer
import Footer from "./components/layout/footer";
//loader
import Simpleloader from "./components/loading/simpleloader";
//pages
const Login = lazy(() => import("./pages/index"));
const SignUp = lazy(() => import("./pages/signUp"));
const Home = lazy(() => import("./pages/home"));

const Entries = lazy(() => import("./pages/entries"));
const Page404 = lazy(() => import("./pages/Page404"));

const App: FC = () => {
  const isLoggedIn = useSelector(
    (state: rootState) => state.auth.isAuthenticated
  );
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<Simpleloader />}>
            <Header />
            <Routes>
              {isLoggedIn ? (
                <>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/diary/:id/*" element={<Entries />}></Route>
                </>
              ) : (
                <>
                  <Route path="/" element={<Login />}></Route>
                  <Route path="/signup" element={<SignUp />}></Route>
                </>
              )}
              <Route path="*" element={<Page404 />}></Route>
            </Routes>
            <Footer />
          </Suspense>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
