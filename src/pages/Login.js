import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";


const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }))
    }

    return (
        <div className="accounts">
            <h1>Login</h1>
            <form className="accounts-form" onSubmit={(e) => login(e, setFormData, formData)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username || ''} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password || ''} onChange={handleChange} required />
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}

export default Login