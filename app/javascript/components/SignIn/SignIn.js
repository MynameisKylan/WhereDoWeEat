import React, { useState } from "react";
import axios from "axios";
import Header from '../Header'

const SignIn = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/users/sign_in", {
        user: user,
      })
      .then((resp) => {
        console.log(resp);
        console.log(props)
        props.setAccessToken(resp.data.token)
      });
  };

  return (
    <div>
      <Header hasAccessToken={ props.accessToken ? true : false }/>
      Sign In Page
      <form onSubmit={handleSubmit}>
        <input
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
