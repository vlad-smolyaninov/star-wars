import React from 'react';
import styled from "styled-components";

import {Planet} from "api-schema/generated";

import {ReactComponent as CloseIcon} from 'assets/close.svg';

const PlanetGrid = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns:repeat(3, 1fr);
  padding: 24px;
  gap: 24px
`

const PlanetCard = styled.div`
  border: 1px solid ${({theme}) => theme.colors.contrastAccentDark};
  border-radius: 8px;
  padding-bottom: 20px;
  box-shadow: 1px 1px 2px 0 ${({theme}) => theme.colors.contrastAccentDark};

  h3 {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;

    svg {
      height: 20px;
      cursor: pointer;
    }
  }

  img {
    max-width: 100%;
    margin-bottom: 12px;
  }

  div {
    padding: 4px 20px;
  }
`


const NoFavoritesPlaceholder = styled.div`
  padding-top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 20px;
`


export const FavoritePlanetsGrid: React.FC<{
    planets: Planet[],
    onRemove: (id: string) => void
    favorites: string[]
}> = ({planets, onRemove}) => {

    if (planets.length === 0) return <NoFavoritesPlaceholder>No favorites</NoFavoritesPlaceholder>

    return (
        <PlanetGrid>
            {planets.map((planet) => <PlanetCard key={planet.id}>
                <h3>{planet.name} <CloseIcon onClick={() => onRemove(planet.id)}/></h3>
                <img src="https://picsum.photos/seed/picsum/536/354" alt="planet landscape"/>
                <div>Climate: {planet.climates?.join(', ')}</div>
                <div>Gravity: {planet.gravity}</div>
            </PlanetCard>)}
        </PlanetGrid>
    )
};
