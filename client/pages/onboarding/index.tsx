import React, { useState } from "react";
import { useAuth } from "@/context/authcontext";
import { OnboardingFormData } from "@/validation/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/validation/schema";
import Input from "@/components/input/input";
import s from './onboarding.module.scss';
import Button from "@/components/button/button";

import { db } from "@/firebase/config";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import InfoForm from "@/forms/info/info";
import InterestsForm from "@/forms/interests/interests";

export default function Onboarding() {
    const { user, logout } = useAuth();

    const [stage, setStage] = useState<"info" | "interests" | "preferences" | "complete">("info");


    if (!user) return <div>loading...</div>;
    
    return (
        <section className={s.onboarding}>
            <div className={s.hey}>Hey Terrier, looking good 😉</div>
            <div className={s.info}>we need some information about you to get started!</div>


            {stage === "info" && <InfoForm callback={
                () => setStage("interests")
            }/>}

            {stage === "interests" && <InterestsForm />}
        </section>
    );
}