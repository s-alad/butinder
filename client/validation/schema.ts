import { z, ZodEnum, ZodType } from "zod"; // Add new import
import { InterestFormData, OnboardingFormData } from "./form";
import { Interests, Genders,  Gender } from "./models";

export const onboardingSchema: ZodType<OnboardingFormData> = z
    .object({
        firstname: z.string().nonempty("Please enter a valid first name").min(2, "First name must be at least 2 characters"),
        age: z.number().int().positive("Please enter a valid age").min(18, "You must be at least 18 years old"),
        gender: z.enum(Genders, {
            errorMap: (issue, ctx) => {
                return {message: 'Please select your gender'};
            }
        }),

    })

export const interestSchema: ZodType<InterestFormData> = z
    .object({
        interests: z.array(z.enum(Interests), {
            errorMap: (issue, ctx) => {
                return {message: 'Please select at least one interest'};
            }
        }),
    })
