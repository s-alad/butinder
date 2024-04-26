import { useAuth } from '@/context/authcontext';
import Link from 'next/link';
import { BsChatRightHeartFill, BsEmojiHeartEyesFill, BsPersonCircle } from "react-icons/bs";
import s from './matchmaking.module.scss';
import { useRouter } from 'next/router';


export default function Matchmaking() {
    const router = useRouter();
    const { user, logout } = useAuth();

    let currentpath = router.pathname;

    if (!user) {
        return (
            <></>
        )
    }

    return (
        <main className={s.matchmaking}>
            <h1 className={s.tagline}>Find your True Rhett 😍</h1>
            <section className={s.matchspace}>
                
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