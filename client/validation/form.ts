import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Gender, Interest } from "./models";


export type DefaultFormField = {
    type: string;
    error: FieldError | undefined;
    
    index?: number;
    placeholder?: string;
    disabled?: boolean;
    defaultvalue?: string | undefined;
    label?: string;
    inputstyle?: string;
};

export type OnboardingFormData = {
    firstname: string;
    age: number;
    gender: Gender;
};

export type InterestFormData = {
    interests: Interest[];
};

export interface GenericFormField<T extends FieldValues> extends DefaultFormField{
    register: UseFormRegister<T>;
    name: Path<T>;
    customregistername?: Path<string>;
    options?: string[] | number[];
}

