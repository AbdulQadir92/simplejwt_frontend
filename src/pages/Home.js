import { useState, useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const Home = () => {
    const { authTokens, logout } = useContext(AuthContext);
    const [notes, setNotes] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/notes/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + String(authTokens?.access)
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch data');
                }
                return res.json();
            })
            .then(data => {
                setNotes(data);
            })
            .catch(error => {
                console.log(error);
                logout();
            })
    }, [])

    return (
        <div id="home">
            <h1>Notes</h1>
            <ul>
                {notes && notes.map(note => (
                    <li key={note.id}>
                        {note.body}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home