import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from "../contexts/AuthContext";


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav id="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {user ? (
                    <li className="logout-btn" onClick={logout}>
                        <span>Log Out, </span>
                        <span>{user.username}</span>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar