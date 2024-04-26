import React, {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        // clean up subscription
        return () => unsubscribe();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>{user.displayName}</p>
            <p>{user.email}</p>
            {user.photoURL && <img src={user.photoURL} alt="User Photo" />}
            {/* Add age and other user info as needed*/}
        </div>
    );
};

export default UserProfile; 