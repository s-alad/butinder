import { useAuth } from '@/context/authcontext';
import Link from 'next/link';


export default function Matchmaking() {

    const { user, logout } = useAuth();

    if (!user) {
        return (
            <></>
        )
    }

    return (
        <div>
            <h1>Matchmaking</h1>
            <p>Welcome, {user?.displayName}</p>
            <button onClick={logout}>Logout</button>    
        </div>
        
    )
}