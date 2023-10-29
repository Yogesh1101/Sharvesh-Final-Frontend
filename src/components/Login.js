import { Button, TextField, Typography } from "@mui/material";
import { API } from "../API_LINK";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import * as yup from "yup";

const formValidationSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid Email Address")
    .required("Why not? Fill the Email!"),
  password: yup
    .string()
    .min(4, "Atleast 4 characters required")
    .max(10, "Too many characters")
    .required("Why not? Fill the Password!"),
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const loginStyle = {
    backgroundColor: "#FB8122",
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      loginUser(values);
    },
  });

  const loginUser = async (user) => {
    const res = await fetch(`${API}/user/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.token) {
      setLoading(false);
      setErr("");
      localStorage.setItem("token", data.token);
      alert(data.message);
      navigate("/");
    } else {
      setLoading(false);
      setErr(data.error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={formik.handleSubmit} className="container form-div">
        <h1 className="login-welcome">WELCOME BACK</h1>
        <h3 className="login-create">Login to Start</h3>
        <div>
          <TextField
            type="email"
            id="email"
            name="email"
            fullWidth
            variant="outlined"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="err-p">{formik.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <TextField
            type="password"
            id="password"
            name="password"
            fullWidth
            variant="outlined"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="err-p">{formik.errors.password}</p>
          ) : (
            ""
          )}
        </div>
        <div className="login-create-div flex flex-row justify-content-end">
          Don't have an Account!{" "}
          <span onClick={() => navigate("/signup")} className="createLink">
            Create
          </span>
        </div>
        <div>
          {loading ? (
            <ClipLoader size={50} color={"green"} loading={loading} />
          ) : (
            <Typography className="mt-3" color={"error"}>
              {err}
            </Typography>
          )}
        </div>
        <div>
          <Button type="submit" style={loginStyle} variant="contained">
            LOGIN
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
