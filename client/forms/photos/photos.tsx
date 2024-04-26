import Button from "@/components/button/button";
import Check from "@/components/check/check";
import Input from "@/components/input/input";
import Select from "@/components/select/select";

import { useAuth } from "@/context/authcontext";
import { db } from "@/firebase/config";
import { PhotosFormData, GenericFormField } from "@/validation/form";
import { PGenders } from "@/validation/models";
import { photosSchema, preferencesSchema } from "@/validation/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { register } from "module";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import s from './photos.module.scss';

interface Props {
    callback?: () => void;
}

export default function PhotosForm({ callback }: Props) {

    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");


    async function onSubmit(data: PhotosFormData) {
        setLoading(true);
        console.log(data);

        let images = Object.values(data);
        let inames = images.map((image) => image.name);
        let unique = new Set(inames);
        if (unique.size !== inames.length) {
            console.log("images are not unique");
            setError("images are not unique");
            setLoading(false);
            return;
        }

        setLoading(false);
        /* callback && callback(); */
    }

    const { register, handleSubmit, control, formState: { errors } } =
        useForm<PhotosFormData>({
            resolver: zodResolver(photosSchema),
            defaultValues: {

            }
        });

    const [previewImaages, setPreviewImages] = useState<{ [idx: number]: string }>({});
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <div className={s.photos}>
                {
                    Array.from({ length: 6 }, (_, i) => i).map((index) => {
                        const name = `p${index + 1}` as "p1" | "p2" | "p3" | "p4" | "p5" | "p6";
                        return (
                            <Controller
                                name={name}
                                control={control}
                                render={({ field: { ref, name, onBlur, onChange } }) => (
                                    <div className={s.photo}>
                                        <label htmlFor={name} className={s.upload}>
                                            <span>+</span>
                                        </label>
                                        <input
                                            id={name}
                                            type="file"
                                            accept="image/*"
                                            ref={ref}
                                            name={name}
                                            onBlur={onBlur}
                                            onChange={(e) => {
                                                const file = e.target.files![0];
                                                const reader = new FileReader();
                                                reader.onload = (e) => {
                                                    setPreviewImages({ ...previewImaages, [index]: e.target!.result as string });
                                                }
                                                reader.readAsDataURL(file);
                                                onChange(e.target.files?.[0])
                                            }}
                                        />
                                        {
                                            previewImaages[index] && <img src={previewImaages[index]} alt="preview" />
                                        }
                                        <span className={s.error}>
                                            {errors[name]?.message}
                                        </span>
                                    </div>
                                )}
                            />
                        )
                    })
                }
            </div>


            <div className={s.invalid}>{error && error}</div>


            <Button text="Submit" type="submit"
                loading={loading}

                onClick={
                    () => {
                        console.log("submitting photos");
                        console.log(errors)
                    }
                }
            />
        </form>
    )
}