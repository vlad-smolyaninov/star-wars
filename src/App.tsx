import React from 'react';
import {Redirect, Route} from "wouter";
import {PlanetsPage} from "pages/PlanetsPage";
import {FavoritesPage} from "pages/FavoritesPage";
import {routes} from "config/routes";

export const App = () => (
    <>
        <Route path={routes.HOME} component={() => <Redirect to={routes.PLANETS}/>}/>

        <Route path={routes.PLANETS + '/:planetId*'} component={PlanetsPage}/>
        <Route path={routes.FAVORITES} component={FavoritesPage}/>

        <Route>404, Not Found!</Route>
    </>
);

