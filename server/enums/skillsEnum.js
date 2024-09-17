/** This enum represents a finite amount of skills where courses can be created and categorized.
 * The choice of a enum instead of a MongoDB collection is due to the fact that skills will not scale and will not be modified. */
export const skillsEnum = ["Music", "Languages", "Cooking", "Programming"];
