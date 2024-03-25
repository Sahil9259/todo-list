import React from "react";
import "./signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:5000/api/auth/register`, Inputs)
      .then((response) => {
        if (response.data.message === "User Already Exists") {
          alert(response.data.message);
        } else {
          alert(response.data.message);
          setInputs({
            email: "",
            name: "",
            password: "",
          });
          navigate("/signin");
        }
      });
  };
  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className="d-flex flex-column  w-100 p-3">
              <input
                className="p-2  my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={change}
                value={Inputs.email}
                required
              />
              <input
                className="p-2 my-3 input-signup"
                type="name"
                name="name"
                placeholder="Enter Your Name"
                onChange={change}
                value={Inputs.name}
                required
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={change}
                value={Inputs.password}
                required
              />

              <button className="btn-signup p-2" onClick={submit}>
                Sign Up
              </button>
            </div>
          </div>
          <div className=" col-lg-4 column col-left d-lg-flex justify-content-center align-items-center  d-none">
            <HeadingComp first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
