import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Action/userAction";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import NewBlog from "./Components/NewBlog/NewBlog";
import Register from "./Components/Register/Register";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import NotFound from "./Components/NotFound/NotFound";
import MyBlogs from "./Components/MyBlogs/MyBlogs";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {isAuthenticated ? <Header /> : null}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/myblogs"
          element={isAuthenticated ? <MyBlogs /> : <Login />}
        />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Account /> : <Register />}
        />
        <Route
          path="/newblog"
          element={isAuthenticated ? <NewBlog /> : <Login />}
        />
        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
