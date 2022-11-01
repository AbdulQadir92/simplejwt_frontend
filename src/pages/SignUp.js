import { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';


const SignUp = () => {
    const { user, signUp } = useContext(AuthContext);
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData(prevValue => ({ ...prevValue, [e.target.id]: e.target.value }))
    }

    return (
        <div className="accounts">
            <h1>SignUp</h1>
            <form className="accounts-form" onSubmit={(e) => signUp(e, setFormData, formData)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username || ''} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password1">Password</label>
                    <input type="password" id="password1" name="password1" value={formData.password1 || ''} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" id="password2" name="password2" value={formData.password2 || ''} onChange={handleChange} required />
                </div>
                <div>
                    <input type="submit" value="Sign Up" />
                </div>
            </form>
        </div>
    )
}

export default SignUp