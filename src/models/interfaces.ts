/**
 * Represents a person from the Star Wars universe.
 */
export interface StarWarsPerson {
    name: string;
    height: string;
    mass: string;
}

/**
 * Represents the response structure from SWAPI.
 */
export interface SwapiResponse {
    results: StarWarsPerson[];
}
