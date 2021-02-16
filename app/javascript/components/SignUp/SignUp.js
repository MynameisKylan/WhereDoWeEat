import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import lodash from 'lodash';

import Header from "../Header";
import Error from "../Error";

const SignUp = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ATTEMPTING TO CREATE USER:");
    axios
      .post("/users", {
        user: user,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.token) {
          const token = resp.data.token;
          props.setAccessToken(token);
          localStorage.setItem("token", token);

          // Redirects to home after retrieving token
          history.push("/");
        } else {
          setErrors(resp.data.errors);
          setUser({...user, password: '', password_confirmation: ''})
        }
      });
  };

  let errorComponents = null
  if (errors) {
    const keys = Object.keys(errors)
    errorComponents = keys.map((key) => {
      const message = `${key.replace('_', ' ').split(' ').map((s) => _.capitalize(s)).join(' ')} ${errors[key]}`
      return (
        <Error key={key} message={message} />
      )
    })
  }

  return (
    <div>
      <Header hasAccessToken={props.accessToken ? true : false} />
      Sign Up Page
      {errorComponents}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type='email'
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email Address"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="password_confirmation"
          value={user.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
