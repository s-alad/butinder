import Link from 'next/link';


export default function Matchmaking() {
    return (
        <div>
            <h1>Matchmaking</h1>
            <Link href="/profile">
            <button type="button">Edit Profile</button>
            </Link>
        </div>
        
    )
}