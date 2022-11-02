import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authTokens, setAuthTokens] =
        useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] =
        useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);

    // Sign Up
    const signUp = (e, setFormData, formData) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/accounts/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not Sign Up. Something went wrong.');
                }
                return res.json();
            })
            .then(data => {
                showMessage(e, data.message, setFormData, formData)
            })
            .catch(error => {
                console.log(error);
            })
    }

    // Login
    const login = (e, setFormData, formData) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/accounts/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Enter a valid username or password');
                }
                return res.json();
            })
            .then(data => {
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data))
                setFormData({});
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                showMessage(e, error.message)
            })
    }

    const showMessage = (e = null, message, setFormData = null, formData = null) => {
        alert(message)
        if (message === 'User created successfully') {
            login(e, setFormData, { username: formData.username, password: formData.password1 });
        }
    }

    // Logout
    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }

    const updateToken = () => {
        console.log('Token updated');
        fetch('http://127.0.0.1:8000/accounts/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: authTokens?.refresh })
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not update refresh token');
                }
                return res.json();
            })
            .then(data => {
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data))
            })
            .catch(error => {
                console.log(error);
                logout();
            })

        if (loading) {
            setLoading(false);
        }
    }

    const contextData = {
        signUp: signUp,
        login: login,
        logout: logout,
        authTokens: authTokens,
        user: user
    }

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const fourMinutes = 1000 * 60 * 4;
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes)

        return () => clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}