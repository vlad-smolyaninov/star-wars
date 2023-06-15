import {gql} from "@apollo/client";

export const GET_PLANETS = gql(`
    query allPlanets {
        allPlanets {
            planets {
                id
                name
                climates
                diameter
                gravity
                population
            }
        }
    }
`);
