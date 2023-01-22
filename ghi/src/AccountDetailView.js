import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./auth";

const AccountDetailView = () => {
  const { userdata } = useAuthContext();


  const navigate = useNavigate();

  useEffect(() => {
    console.log(userdata)

  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="accountwrapper">
      {userdata && 
      <>       <h2>First Name: {userdata.first_name}</h2>
      <h2>Last Name: {userdata.last_name}</h2>
      <h2>Email: {userdata.email}</h2>
      <h2>Username: {userdata.username}</h2>
      <div className="buttons-wrapper">
        <Link to={"/AccountEditForm"}>Edit Profile</Link>
        <Link to={"/editpassword"}>Edit Password</Link>
      </div>
      </>

      }
     
    </div>
    // <form onSubmit={handleSubmit}>
    //   <div className="mb-3">
    //     <label htmlFor="firstname" className="form-label">
    //       First name
    //     </label>
    //     <input
    //       // disabled
    //       value={userdata.first_name}
    //       type="text"
    //       className="form-control"
    //       id="firstname"
    //       onChange={(e) => setFirstName(e.target.value)}
    //     />
    //   </div>
    //   <div className="mb-3">
    //     <label htmlFor="lastName" className="form-label">
    //       Last name
    //     </label>
    //     <input
    //       // disabled
    //       value={userdata.last_name}
    //       type="text"
    //       className="form-control"
    //       id="lastName"
    //       onChange={(e) => setLastName(e.target.value)}
    //     />
    //   </div>
    //   <div className="mb-3">
    //     <label htmlFor="username" className="form-label">
    //       User Name
    //     </label>
    //     <input
    //       // disabled
    //       value={userdata.username}
    //       type="text"
    //       className="form-control"
    //       id="username"
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //   </div>
    //   <div className="mb-3">
    //     <label htmlFor="email" className="form-label">
    //       Email address
    //     </label>
    //     <input
    //       // disabled
    //       value={userdata.email}
    //       type="email"
    //       className="form-control"
    //       id="email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </div>
    //   <button type="submit">Submit</button>
    // </form>
  );
};

export default AccountDetailView;