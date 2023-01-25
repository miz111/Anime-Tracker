import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./auth";

function LogoutButton() {
    const navigate = useNavigate();
    const { setToken, setIsLoggedIn } = useAuthContext();
    return (
        <div className="buttons">
            <button onClick={() => { setToken(null); setIsLoggedIn(false); localStorage.clear(); alert("Successfully Logged out"); navigate("/") }} className="btn btn-outline-primary mb-2">
                Log out
            </button>
        </div>
    );
}

export default LogoutButton;