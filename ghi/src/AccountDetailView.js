import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./auth";

const AccountDetailView = () => {
  const { user, setUser } = useAuthContext();

  const navigate = useNavigate();
  // useEffect(async() => {
  // setUser(userdata)
  //   if (user == null) {
  //     const Url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/accounts/${userdata.id}`;
  //     const fetchConfig = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${localStorage.getItem("token")}`
  //       },
  //     };

  //     const response = await fetch(Url, fetchConfig)
  //       .then(res => res.json())
  //       .then(data => {
  //         console.log(data)
  //         setUser(data)
  //       })
  //       ;
  //   }
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  console.log(user)
  return (
    <div className="accountwrapper">
      {user &&
        <>
          <h2>First Name: {user.first_name}</h2>
          <h2>Last Name: {user.last_name}</h2>
          <h2>Email: {user.email}</h2>
          <h2>Username: {user.username}</h2>
          <div className="buttons-wrapper">
            <Link to={"/AccountEditForm"}>Edit Profile</Link>
          </div>
        </>

      }

    </div>
  );
};

export default AccountDetailView;