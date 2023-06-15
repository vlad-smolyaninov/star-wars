import React, {MouseEventHandler} from 'react';
import styled, {useTheme} from "styled-components";
import {Link} from "wouter";

import {Planet} from "api-schema/generated";

import {ReactComponent as StarIcon} from 'assets/star.svg';
import {routes} from "config/routes";
import {useSort, SortingArrowButton} from "features/planets-list";


const FavoriteButton = styled(StarIcon)`
  transition: opacity 0.15s ease-out;

  &:hover {
    opacity: 0.7;
  }
`

const PlanetTable = styled.table`
  border-collapse: collapse;
  text-align: left;
  width: 100%;
  color: ${({theme}) => theme.colors.contrastDark};

  thead tr th {
    padding: 10px 24px;
    font-weight: normal;
    color: ${({theme}) => theme.colors.contrastFonts};
  }

  th, td, tr {
    padding: 24px;
    border-bottom: 1px solid ${({theme}) => theme.colors.contrast};
  }

  tbody tr {
    cursor: pointer;
    transition: background-color 0.25s ease-out;
    user-select: none;

    &:hover {
      background: ${({theme}) => theme.colors.contrastLight};
    }
  }
`

const PlanetRow: React.FC<{
    planet: Planet,
    favorites: string[],
    onToggleFavorite: (id: string) => void
}> = ({planet, favorites, onToggleFavorite}) => {
    const theme = useTheme();
    const onStarClick: MouseEventHandler = (event) => {
        event.stopPropagation()
        onToggleFavorite(planet.id)
    }

    return <Link href={routes.PLANETS + '/' + planet.id}>
        <tr>
            <td><b>{planet.name || 'unknown'}</b></td>
            <td>{planet.climates?.join(', ') || 'unknown'}</td>
            <td>{planet.diameter || 'unknown'}</td>
            <td>{planet.population || 'unknown'}</td>
            <td>
                <FavoriteButton onClick={onStarClick} height="30"
                                fill={favorites.includes(planet.id) ? theme?.colors.starColor : 'none'}/>
            </td>
        </tr>
    </Link>
}

interface PlanetsListProps {
    planets: Planet[];
    onToggleFavorite: (id: string) => void;
    favorites: string[];
}


export const PlanetsList: React.FC<PlanetsListProps> = ({planets, onToggleFavorite, favorites}) => {
    const {onSortClick, sorted, sortedField, sortedDirection} = useSort(planets)

    return (
        <PlanetTable>
            <thead>
            <tr>
                <th>Name</th>
                <th>Climate</th>
                <th>Diameter <SortingArrowButton
                    onClick={() => onSortClick('diameter')}
                    sortedField={sortedField}
                    sortedDirection={sortedDirection}
                    name="diameter"
                /></th>
                <th>Population <SortingArrowButton
                    onClick={() => onSortClick('population')}
                    sortedField={sortedField}
                    sortedDirection={sortedDirection}
                    name="population"
                /></th>
                <th>Favourite</th>
            </tr>
            </thead>
            <tbody>
            {sorted.map(p => p ?
                <PlanetRow
                    favorites={favorites}
                    onToggleFavorite={onToggleFavorite}
                    key={p.id}
                    planet={p}/> : '')}
            </tbody>
        </PlanetTable>
    )
};
