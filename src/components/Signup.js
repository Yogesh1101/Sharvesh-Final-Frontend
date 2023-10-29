import React, { useState } from "react";
import { API } from "../API_LINK";
import { useFormik } from "formik";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";

const formValidationSchema = yup.object({
  username: yup.string().required("Why not? Fill the Full Name!"),
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

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const signupStyle = {
    backgroundColor: "#FB8122",
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      createUser(values);
    },
  });

  const createUser = async (newUser) => {
    const res = await fetch(`${API}/user/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.token) {
      setLoading(false);
      setErr("");
      localStorage.setItem("token", data.token);
      alert(data.message);
      navigate("/login");
    } else {
      setLoading(false);
      setErr(data.error);
    }
  };

  return (
    <div className="signup">
      <form onSubmit={formik.handleSubmit} className="container form-div">
        <h1 className="signin-welcome">WELCOME</h1>
        <h3 className="signin-create">Create an Account to Start</h3>
        <div>
          <TextField
            type="text"
            id="username"
            name="username"
            fullWidth
            variant="outlined"
            label="Full Name"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="err-p">{formik.errors.username}</p>
          ) : (
            ""
          )}
        </div>
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
        <div className="signup-login-div flex justify-content-end">
          Already have an Account!{" "}
          <span onClick={() => navigate("/login")} className="loginLink">
            Login
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
          <Button type="submit" style={signupStyle} variant="contained">
            SIGNUP
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
