import React from 'react';
import styled from "styled-components";
import {Planet} from "api-schema/generated";

const SideDetails = styled.div`
  background: ${({theme}) => theme.colors.main};
  width: 100%;
  max-width: 292px;
  padding: 30px 0;

  h3 {
    text-align: center;
    color: ${({theme}) => theme.colors.contrastAccent};
  }
`

const DetailsCard = styled.div`
  background: ${({theme}) => theme.colors.contrastAccent};
  margin: 40px 24px 0;
  border: 1px solid ${({theme}) => theme.colors.contrastAccentLight};
  border-radius: 8px;
  padding: 36px 0;
  text-align: center;
  font-size: 14px;

  h4 {
    margin: 0 0 12px;
    font-size: 18px;
    font-weight: normal;

  }
`

export const PlanetDetails: React.FC<{ planet?: Planet }> = ({planet}) => {
    if(!planet) return null;
    return (
        <SideDetails>
            <div>
                <h3>{planet.name}</h3>
                <DetailsCard>
                    <h4>
                        Climate: {planet.climates?.join(', ') || 'unknown'}
                    </h4>
                    <div>
                        Gravity: {planet.gravity || 'unknown'}
                    </div>
                </DetailsCard>
            </div>
        </SideDetails>
    )
};
