import React from 'react';
import {Link} from "wouter";
import styled, {css} from "styled-components";
import {ActivatableLink} from "features/ui/ActivatableLink";
import {routes} from "config/routes";

const NavigationSideBar = styled.nav`
  width: 250px;
  background-color: ${({theme}) => theme.colors.main};
  color: ${({theme}) => theme.colors.contrast};
`

const NavigationLogo = styled(Link)`
  display: block;
  padding: 24px;
  font-size: 24px;
  font-weight: bold;
  color: inherit;
  text-decoration: inherit;
`

const activeNavigationLink = css`
  background: ${(p) => p.theme.colors.mainAccent};

  &:hover {
    background: ${(p) => p.theme.colors.mainAccent};
  }
`

const NavigationLink = styled(ActivatableLink)<{ $active?: boolean }>`
  cursor: pointer;
  display: block;
  color: inherit;
  text-decoration: inherit;
  padding: 14px 24px;
  transition: background-color 0.25s ease-out;

  &:hover {
    background: ${(p) => p.theme.colors.mainAccentLight};
  }

  &.active {
    ${activeNavigationLink}
  }
`

export const NavigationSideMenu = () => (
    <NavigationSideBar>
        <NavigationLogo href={routes.HOME}>
            PlanetsApp
        </NavigationLogo>

        <NavigationLink href={routes.PLANETS}>Planets</NavigationLink>
        <NavigationLink href={routes.FAVORITES}>Favorites</NavigationLink>
    </NavigationSideBar>
);
