import React from 'react';
import {RouteComponentProps} from "wouter";
import styled from "styled-components";
import {useQuery} from '@apollo/client';

import {GET_PLANETS} from "queries/planets";
import {useFavorites} from "features/favorite-planets";
import {LoaderSpinner, PageLayout} from "features/ui";
import {PlanetsList} from "features/planets-list";
import {PlanetDetails} from "features/planet-details";
import {Planet} from "api-schema/generated";

const PageWrapper = styled.div`
  height: 100%;
  display: flex;
`

export const PlanetsPage: React.FC<RouteComponentProps<{ planetId: string }>> = ({params: {planetId}}) => {
    const [favorites, toggleFavorites] = useFavorites()

    const {loading, error, data} = useQuery(GET_PLANETS);
    const planets: Planet[] = data?.allPlanets?.planets || []

    return (
        <PageWrapper>
            <PageLayout title="Planets">
                {loading && <LoaderSpinner/>}
                {error && ("There is some error: " + error.message)}
                {data && <PlanetsList planets={planets} favorites={favorites} onToggleFavorite={toggleFavorites}/>}
            </PageLayout>
            {planetId && planets && <PlanetDetails planet={planets.find((p) => p.id === planetId)}/>}
        </PageWrapper>
    )
};
