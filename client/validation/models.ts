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