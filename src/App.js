import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/Signup";
import SignIn from "./components/signup/SignIn";
import Todo from "./components/todo/Todo";
import { useDispatch } from "react-redux";
import { authActions } from "./store";

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, [dispatch]); // Include dispatch in the dependency array

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Todo/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
