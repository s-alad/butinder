import Button from "@/components/button/button";
import Check from "@/components/check/check";
import Input from "@/components/input/input";
import Select from "@/components/select/select";
import { useAuth } from "@/context/authcontext";
import { db } from "@/firebase/config";
import { InterestFormData } from "@/validation/form";
import { Interests } from "@/validation/models";
import { interestSchema } from "@/validation/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { register } from "module";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
    callback?: () => void;
}

export default function InterestsForm({ callback }: Props) {

    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    async function onSubmit(data: InterestFormData) {
        setLoading(true);
        console.log(data);

        /* const payload = {
            interests: {
                ...data
            }
        }
        // get the user document, then the info col
        const userDoc = doc(db, "users", user!.email!);
        await setDoc(userDoc, payload, { merge: true });
        setLoading(false);
        callback && callback(); */
    }

    const { register, handleSubmit, control, formState: { errors } } =
        useForm<InterestFormData>({
            resolver: zodResolver(interestSchema),
            defaultValues: {}
        });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
                <Select<InterestFormData>
                    type="text"
                    inputstyle="input"
                    label="your interests"
                    placeholder="your interests"
                    name="interests"
                    register={register}
                    error={errors.interests as any}
                    options={Object.values(Interests)}
                />
                <Button text="Submit" type="submit"
                    loading={loading}
                />
            </form>
    )
}