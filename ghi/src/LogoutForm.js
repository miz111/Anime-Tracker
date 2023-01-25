import { useNavigate } from "react-router-dom";
import { useToken, useAuthContext } from "./auth";

function LogoutButton() {
    const [, , logout] = useToken();
    const navigate = useNavigate();
    const { token, setToken, setIsLoggedIn } = useAuthContext();
    return (
        <div className="buttons">
            <button onClick={() => { setToken(null); setIsLoggedIn(false); localStorage.clear(); alert("Successfully Logged out"); navigate("/") }} className="btn btn-outline-primary mb-2">
                Log out
            </button>
        </div>
    );
}

export default LogoutButton;