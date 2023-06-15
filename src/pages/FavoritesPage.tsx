import React from 'react';
import {makeVar, useQuery} from "@apollo/client";

import {Planet} from "api-schema/generated";

import {GET_PLANETS} from "queries/planets";
import {FavoritePlanetsGrid, useFavorites} from "features/favorite-planets";
import {ConfirmationModal, useConfirmationModal} from "features/confirmation-modal";
import {LoaderSpinner, PageLayout} from "features/ui";

export const unfavoritedPlanet = makeVar('');

export const FavoritesPage = () => {
    const [favorites, toggleFavorites] = useFavorites()
    const {state, createConfirmationModal, closeModal} = useConfirmationModal();
    const {loading, error, data} = useQuery(GET_PLANETS, {
        skip: !favorites.length,
    })

    const planets: Planet[] = data?.allPlanets?.planets || []

    const openModal = (id: string) => {
        unfavoritedPlanet(id)
        createConfirmationModal({
            title: 'Remove favorite',
            text: 'Planet will be removed from favorites',
        });
    };

    const onRemoveFavorite = () => {
        toggleFavorites(unfavoritedPlanet())
        closeModal()
    }


    return (
        <PageLayout title="Favorites">
            <ConfirmationModal
                state={state}
                onSubmit={onRemoveFavorite}
                onClose={closeModal}/>

            {loading && <LoaderSpinner/>}
            {error && ("There is some error: " + error.message)}
            {planets &&
                <FavoritePlanetsGrid
                    planets={planets.filter(({id}) => favorites.includes(id))}
                    favorites={favorites}
                    onRemove={openModal}/>}
        </PageLayout>
    );
}


