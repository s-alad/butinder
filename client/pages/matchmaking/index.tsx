import { useAuth } from '@/context/authcontext';
import Link from 'next/link';
import { BsChatRightHeartFill, BsEmojiHeartEyesFill, BsPersonCircle } from "react-icons/bs";
import s from './matchmaking.module.scss';
import { useRouter } from 'next/router';
import { ImCross } from "react-icons/im";
import { db } from '@/firebase/config';
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Matchmaking() {
    const router = useRouter();
    const { user, logout } = useAuth();

    let currentpath = router.pathname;

    const [users, setUsers] = useState<any[]>([]);

    const [excluded, setExcluded] = useState<string[]>([]);
    async function exclude() {
        // get the current user's data, especially the matches and rejected arrays
        const userDoc = doc(db, "users", user!.email!);
        const userSnap = await getDoc(userDoc);
        const currentUser = userSnap.data();

        if (!currentUser) {
            return;
        }

        // set the excluded array to the current user's matches and rejected arrays
        setExcluded([...(currentUser.matches || []), ...(currentUser.rejected || [])]);
        console.log([...(currentUser.matches || []), ...(currentUser.rejected || [])]);
    }

    async function pool() {
        // get all the users from the users collection where the user's id is not the same as the current user's id
        // and where the user's id is not in the current user's matches array
        // and where the user's id is not in the current user's rejected array

        const userCollectionRef = collection(db, 'users');
        const q = query(userCollectionRef,
            where('email', 'not-in', [user!.email, ...excluded]),
            limit(10)
        )
        const userSnap = await getDocs(q);
        const users = userSnap.docs.map(doc => doc.data());
        console.log(users);
        setUsers(users);
    }

    useEffect(() => {
        async function init() {
            await exclude();    
            await pool();
        }
        init();
    }, []);


    if (!user) {
        return (
            <></>
        )
    }

    return (
        <main className={s.matchmaking}>
            <h1 className={s.tagline}>Find your True Rhett 😍</h1>
            <section className={s.matchspace}>
                <div className={s.reject}>
                    ❎
                </div>
                {
                    users.map((user) => {
                        let imagelength = user.photos.length;
                        console.log(user);
                        return <div className={s.person}>
                            <div className={s.name}>
                                {user.info.firstname}, {user.info.age}
                            </div>
                            <img src={user.photos[0]} />
                            <div className={s.arrows}>
                                
                            </div>
                            <div className={s.bio}>
                                <span>{user.details.college}</span>
                                <span>{user.details.residence}</span>
                                <span>{user.details.year}</span>
                            </div>
                        </div>
                    })
                }
                <div className={s.like}>
                    ❤️
                </div>
            </section>
            <section className={s.navigation}>
                <Link href="/matchmaking" 
                    className={currentpath === "/matchmaking" ? s.active : ""}
                >
                    <BsEmojiHeartEyesFill />
                </Link>
                <Link href="/chat" className={currentpath === "/chat" ? s.active : ""}>
                    <BsChatRightHeartFill />
                </Link>
                <Link href="/profile" className={currentpath === "/profile" ? s.active : ""}>
                    <BsPersonCircle />
                </Link>
            </section>
        </main>
        
    )
}