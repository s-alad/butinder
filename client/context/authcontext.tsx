import { useContext, createContext, useState, useEffect } from "react";
import {
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
} from "firebase/auth";

import { User } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/router";

interface IAuthContext {
	status: "nonbu" | "bu" | "loading" | null;
	user: User | null;
	googlesignin: () => void;
	logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
	status: null,
	user: null,
	googlesignin: () => { },
	logout: () => { },
});

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    console.log("auth provider");
	let router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [status, setStatus] = useState<"nonbu" | "bu" | "loading" | null>(null);

	function googlesignin() {
        console.log("signing in with google!");
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider).then((result) => {
			if (result && result?.user?.email?.split("@")[1] !== "bu.edu") {
				setStatus("nonbu");
				setTimeout(() => { setStatus(null); }, 4000);
			} else {
				console.log("pushing", auth); router.push("/matchmaking");
			}
		}).catch((error) => {
			console.log(error);
		});
	};
	function logout() { signOut(auth); router.push("/"); };

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser?.email?.split("@")[1] == "bu.edu" || currentUser == null) {
				setUser(currentUser);	
			} else {
				router.push("/"); 
			}
		});
		return () => unsubscribe();
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, status, googlesignin, logout }}>
			{children}
		</AuthContext.Provider>
	);
};