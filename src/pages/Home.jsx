import React from 'react';
import { Container } from '@mantine/core';

import { HeroImageRight } from './../HeroImageRight';
import { ArticlesCardsGrid } from './../ArticlesCardsGrid';
import { GetInTouch } from './../GetInTouch';

function Home() {
    return ( 
        <>
        <HeroImageRight></HeroImageRight>
        <ArticlesCardsGrid></ArticlesCardsGrid>
        <Container py="lg">
            <GetInTouch>

            </GetInTouch>
        </Container>
        </>
     );
}

export default Home