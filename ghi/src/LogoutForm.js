import { useToken } from "./auth";

function LogoutButton() {
    const [, , , logout] = useToken();
    return (
        <div className="buttons">
            <button onClick={() => {logout(); alert("Successfully Logged out") }} className="btn btn-outline-primary mb-2">
                Log out
            </button>
        </div>
    );
}

export default LogoutButton;