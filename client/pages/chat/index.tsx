import React from "react";
import s from './chat.module.scss';
import { useAuth } from "@/context/authcontext";
import Button from "@/components/button/button";


export default function Profile() {
	
	const { user, logout } = useAuth();
	
	return (
		<section className={s.chat}>
			<div className={s.content}>
				<h1>Your Matches</h1>
			</div>
		</section>
	);
}