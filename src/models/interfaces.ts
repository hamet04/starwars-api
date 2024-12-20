export interface StarWarsPerson {
    name: string;
    height: string;
    mass: string;
}

export interface SwapiResponse {
    results: StarWarsPerson[];
}