import { Link } from "react-router-dom";
import { useAuthContext } from "./auth";

const AccountDetailView = () => {
  const { user } = useAuthContext();

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