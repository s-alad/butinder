export const Interests = [
    "Art",
    "Books",
    "Cooking",
    "Dancing",
    "Gaming",
    "Hiking",
    "Movies",
    "Music",
    "Photography",
    "Sports",
    "Traveling",
    "Writing",
] as const;
export type Interest = typeof Interests[number];

export const Genders = [ "male", "female", "nonbinary", "other"] as const;
export type Gender = typeof Genders[number];